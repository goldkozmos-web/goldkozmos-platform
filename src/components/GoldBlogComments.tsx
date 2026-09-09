"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";

import {
  COMMENT_MAX_LENGTH,
  formatYorumCount,
} from "../lib/goldblog/commentValidation";
import "../styles/goldblog-comments.css";

type Viewer = {
  id: string;
  displayName: string;
  avatarUrl: string | null;
  isAdmin: boolean;
};

type CommentItem = {
  id: string;
  postId: string;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  displayName: string;
  avatarUrl: string | null;
  canEdit: boolean;
  canDelete: boolean;
};

type GoldBlogCommentsProps = {
  postId: string;
  onCountChange?: (postId: string, count: number) => void;
};

function initials(name: string) {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((part) => part.charAt(0).toUpperCase()).join("") || "G";
}

function formatCommentDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function loginHref(postId: string) {
  return `/giris?next=${encodeURIComponent(`/goldblog?yazi=${postId}`)}`;
}

export default function GoldBlogComments({
  postId,
  onCountChange,
}: GoldBlogCommentsProps) {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [viewer, setViewer] = useState<Viewer | null>(null);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `/api/goldblog/comments?postId=${encodeURIComponent(postId)}`,
          { cache: "no-store" },
        );
        const data = await response.json();

        if (cancelled) {
          return;
        }

        if (response.status === 503) {
          setUnavailable(true);
          setComments([]);
          setViewer(null);
          return;
        }

        if (!response.ok) {
          setError(data.error || "Yorumlar yüklenemedi.");
          return;
        }

        setUnavailable(false);
        setComments(data.comments ?? []);
        setViewer(data.viewer ?? null);
        onCountChange?.(postId, (data.comments ?? []).length);
      } catch {
        if (!cancelled) {
          setError("Yorumlar yüklenemedi.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [onCountChange, postId]);

  const remaining = COMMENT_MAX_LENGTH - draft.length;

  async function submitComment(event: FormEvent) {
    event.preventDefault();
    setSending(true);
    setError("");

    try {
      const response = await fetch("/api/goldblog/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, content: draft }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Yorum gönderilemedi.");
        return;
      }

      setComments((current) => [data.comment, ...current]);
      setDraft("");
      onCountChange?.(postId, data.count ?? comments.length + 1);
    } catch {
      setError("Yorum gönderilemedi.");
    } finally {
      setSending(false);
    }
  }

  async function saveEdit(id: string) {
    setSending(true);
    setError("");

    try {
      const response = await fetch(`/api/goldblog/comments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: editDraft }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Yorum güncellenemedi.");
        return;
      }

      setComments((current) =>
        current.map((item) => (item.id === id ? data.comment : item)),
      );
      setEditingId(null);
      setEditDraft("");
    } catch {
      setError("Yorum güncellenemedi.");
    } finally {
      setSending(false);
    }
  }

  async function removeComment(id: string) {
    setSending(true);
    setError("");

    try {
      const response = await fetch(`/api/goldblog/comments/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Yorum silinemedi.");
        return;
      }

      const next = comments.filter((item) => item.id !== id);
      setComments(next);
      setConfirmDeleteId(null);
      onCountChange?.(postId, next.length);
    } catch {
      setError("Yorum silinemedi.");
    } finally {
      setSending(false);
    }
  }

  const heading = useMemo(
    () => (loading ? "Yorumlar" : formatYorumCount(comments.length)),
    [comments.length, loading],
  );

  return (
    <section className="goldBlogComments" aria-label="Yorumlar">
      <header className="goldBlogCommentsHead">
        <p>YORUMLAR</p>
        <h3>{heading}</h3>
      </header>

      {unavailable ? (
        <p className="goldBlogCommentsHint">
          Yorumlar kalıcı veritabanına bağlanınca burada görünecek.
        </p>
      ) : null}

      {!unavailable && viewer ? (
        <form className="goldBlogCommentComposer" onSubmit={submitComment}>
          <div className="goldBlogCommentIdentity">
            {viewer.avatarUrl ? (
              <img src={viewer.avatarUrl} alt="" />
            ) : (
              <span aria-hidden="true">{initials(viewer.displayName)}</span>
            )}
            <strong>{viewer.displayName}</strong>
          </div>

          <textarea
            value={draft}
            maxLength={COMMENT_MAX_LENGTH}
            rows={4}
            placeholder="Bu yazı sende ne bıraktı?"
            onChange={(event) => setDraft(event.target.value)}
          />

          <div className="goldBlogCommentComposerBar">
            <small>{remaining}</small>
            <button type="submit" disabled={sending || !draft.trim()}>
              {sending && !editingId ? "Gönderiliyor…" : "Yorum Yap"}
            </button>
          </div>
        </form>
      ) : null}

      {!unavailable && !viewer ? (
        <div className="goldBlogCommentGate">
          <p>Yorum yapmak için hesabına giriş yap.</p>
          <Link href={loginHref(postId)}>Giriş Yap</Link>
        </div>
      ) : null}

      {error ? <p className="goldBlogCommentsError">{error}</p> : null}

      <div className="goldBlogCommentList">
        {comments.map((comment) => (
          <article className="goldBlogCommentCard" key={comment.id}>
            <div className="goldBlogCommentCardTop">
              {comment.avatarUrl ? (
                <img src={comment.avatarUrl} alt="" />
              ) : (
                <span aria-hidden="true">
                  {initials(comment.displayName)}
                </span>
              )}

              <div>
                <strong>{comment.displayName}</strong>
                <time dateTime={comment.createdAt}>
                  {formatCommentDate(comment.createdAt)}
                  {comment.updatedAt !== comment.createdAt ? " · düzenlendi" : ""}
                </time>
              </div>
            </div>

            {editingId === comment.id ? (
              <>
                <textarea
                  value={editDraft}
                  maxLength={COMMENT_MAX_LENGTH}
                  rows={4}
                  onChange={(event) => setEditDraft(event.target.value)}
                />
                <div className="goldBlogCommentActions">
                  <button
                    type="button"
                    disabled={sending}
                    onClick={() => void saveEdit(comment.id)}
                  >
                    Kaydet
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setEditDraft("");
                    }}
                  >
                    Vazgeç
                  </button>
                </div>
              </>
            ) : (
              <p>{comment.content}</p>
            )}

            {editingId !== comment.id && (comment.canEdit || comment.canDelete) ? (
              <div className="goldBlogCommentActions">
                {comment.canEdit ? (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(comment.id);
                      setEditDraft(comment.content);
                      setConfirmDeleteId(null);
                    }}
                  >
                    Düzenle
                  </button>
                ) : null}

                {comment.canDelete ? (
                  confirmDeleteId === comment.id ? (
                    <>
                      <button
                        type="button"
                        disabled={sending}
                        onClick={() => void removeComment(comment.id)}
                      >
                        Silinsin
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteId(null)}
                      >
                        Vazgeç
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmDeleteId(comment.id)}
                    >
                      Sil
                    </button>
                  )
                ) : null}
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}

export { formatYorumCount };
