"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";

import {
  COMMENT_MAX_LENGTH,
  formatLikeCount,
  formatRelativeTime,
  formatReplyToggle,
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
  parentCommentId: string | null;
  content: string;
  createdAt: string;
  updatedAt: string;
  displayName: string;
  avatarUrl: string | null;
  likeCount: number;
  likedByMe: boolean;
  canEdit: boolean;
  canDelete: boolean;
  replies: CommentItem[];
};

type GoldBlogCommentsProps = {
  postId: string;
  onCountChange?: (postId: string, count: number) => void;
};

function initials(name: string) {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((part) => part.charAt(0).toUpperCase()).join("") || "G";
}

function loginHref(postId: string) {
  return `/giris?next=${encodeURIComponent(`/goldblog?yazi=${postId}`)}`;
}

function totalCount(comments: CommentItem[]) {
  return comments.reduce(
    (sum, comment) => sum + 1 + comment.replies.length,
    0,
  );
}

function Avatar({
  url,
  name,
}: {
  url: string | null;
  name: string;
}) {
  if (url) {
    return <img className="goldBlogCommentAvatar" src={url} alt="" />;
  }

  return (
    <span className="goldBlogCommentAvatar" aria-hidden="true">
      {initials(name)}
    </span>
  );
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
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyDraft, setReplyDraft] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState("");
  const [openReplies, setOpenReplies] = useState<Record<string, boolean>>({});
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

        const next = (data.comments ?? []) as CommentItem[];
        setUnavailable(false);
        setComments(next);
        setViewer(data.viewer ?? null);
        onCountChange?.(postId, totalCount(next));
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

  function patchComment(
    commentId: string,
    updater: (comment: CommentItem) => CommentItem,
  ) {
    setComments((current) =>
      current.map((comment) => {
        if (comment.id === commentId) {
          return updater(comment);
        }

        return {
          ...comment,
          replies: comment.replies.map((reply) =>
            reply.id === commentId ? updater(reply) : reply,
          ),
        };
      }),
    );
  }

  async function submitComment(
    content: string,
    parentCommentId?: string,
  ) {
    setSending(true);
    setError("");

    try {
      const response = await fetch("/api/goldblog/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId,
          content,
          parentCommentId,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Yorum gönderilemedi.");
        return false;
      }

      const created = data.comment as CommentItem;
      created.replies = created.replies ?? [];

      if (parentCommentId) {
        setComments((current) =>
          current.map((comment) =>
            comment.id === parentCommentId
              ? { ...comment, replies: [...comment.replies, created] }
              : comment,
          ),
        );
        setOpenReplies((current) => ({ ...current, [parentCommentId]: true }));
        onCountChange?.(postId, totalCount(comments) + 1);
      } else {
        const next = [created, ...comments];
        setComments(next);
        onCountChange?.(postId, totalCount(next));
      }

      return true;
    } catch {
      setError("Yorum gönderilemedi.");
      return false;
    } finally {
      setSending(false);
    }
  }

  async function handleRootSubmit(event?: FormEvent) {
    event?.preventDefault();
    const ok = await submitComment(draft);
    if (ok) {
      setDraft("");
    }
  }

  async function handleReplySubmit(event: FormEvent | KeyboardEvent, parentId: string) {
    event.preventDefault();
    const ok = await submitComment(replyDraft, parentId);
    if (ok) {
      setReplyDraft("");
      setReplyingTo(null);
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

      patchComment(id, (comment) => ({
        ...comment,
        ...data.comment,
        replies: comment.replies,
      }));
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

      const next = comments
        .filter((comment) => comment.id !== id)
        .map((comment) => ({
          ...comment,
          replies: comment.replies.filter((reply) => reply.id !== id),
        }));
      setComments(next);
      onCountChange?.(postId, totalCount(next));
    } catch {
      setError("Yorum silinemedi.");
    } finally {
      setSending(false);
    }
  }

  async function toggleLike(id: string) {
    if (!viewer) {
      setError("Beğenmek için hesabına giriş yap.");
      return;
    }

    try {
      const response = await fetch(`/api/goldblog/comments/${id}/like`, {
        method: "POST",
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Beğeni kaydedilemedi.");
        return;
      }

      patchComment(id, (comment) => ({
        ...comment,
        likedByMe: data.likedByMe,
        likeCount: data.likeCount,
      }));
    } catch {
      setError("Beğeni kaydedilemedi.");
    }
  }

  function onComposerKeyDown(
    event: KeyboardEvent<HTMLTextAreaElement>,
    onSubmit: () => void,
  ) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSubmit();
    }
  }

  function renderEntry(comment: CommentItem, isReply = false) {
    const editing = editingId === comment.id;

    return (
      <article
        className={`goldBlogCommentRow ${isReply ? "isReply" : ""}`}
        key={comment.id}
      >
        <Avatar url={comment.avatarUrl} name={comment.displayName} />

        <div className="goldBlogCommentBody">
          {editing ? (
            <form
              className="goldBlogCommentInlineForm"
              onSubmit={(event) => {
                event.preventDefault();
                void saveEdit(comment.id);
              }}
            >
              <textarea
                value={editDraft}
                maxLength={COMMENT_MAX_LENGTH}
                rows={2}
                onChange={(event) => setEditDraft(event.target.value)}
              />
              <div className="goldBlogCommentMeta">
                <button type="submit" disabled={sending || !editDraft.trim()}>
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
            </form>
          ) : (
            <p>
              <strong>{comment.displayName}</strong> {comment.content}
            </p>
          )}

          {!editing ? (
            <div className="goldBlogCommentMeta">
              <time dateTime={comment.createdAt}>
                {formatRelativeTime(comment.createdAt)}
                {comment.updatedAt !== comment.createdAt ? " · düzenlendi" : ""}
              </time>

              <button
                type="button"
                className={comment.likedByMe ? "isOn" : undefined}
                onClick={() => void toggleLike(comment.id)}
              >
                Beğen
              </button>

              {!isReply ? (
                <button
                  type="button"
                  onClick={() => {
                    if (!viewer) {
                      setError("Yorum yapmak için giriş yap.");
                      return;
                    }

                    setReplyingTo(
                      replyingTo === comment.id ? null : comment.id,
                    );
                    setReplyDraft("");
                  }}
                >
                  Yanıtla
                </button>
              ) : null}

              {comment.canEdit ? (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(comment.id);
                    setEditDraft(comment.content);
                  }}
                >
                  Düzenle
                </button>
              ) : null}

              {comment.canDelete ? (
                <button
                  type="button"
                  onClick={() => void removeComment(comment.id)}
                >
                  Sil
                </button>
              ) : null}
            </div>
          ) : null}

          {comment.likeCount > 0 ? (
            <p className="goldBlogCommentLikes">
              {formatLikeCount(comment.likeCount)}
            </p>
          ) : null}

          {!isReply && comment.replies.length > 0 && !openReplies[comment.id] ? (
            <button
              type="button"
              className="goldBlogCommentThreadToggle"
              onClick={() =>
                setOpenReplies((current) => ({
                  ...current,
                  [comment.id]: true,
                }))
              }
            >
              {formatReplyToggle(comment.replies.length)}
            </button>
          ) : null}

          {!isReply && openReplies[comment.id] ? (
            <div className="goldBlogCommentReplies">
              {comment.replies.map((reply) => renderEntry(reply, true))}
              <button
                type="button"
                className="goldBlogCommentThreadToggle"
                onClick={() =>
                  setOpenReplies((current) => ({
                    ...current,
                    [comment.id]: false,
                  }))
                }
              >
                Yanıtları gizle
              </button>
            </div>
          ) : null}

          {!isReply && replyingTo === comment.id && viewer ? (
            <form
              className="goldBlogCommentComposer isInline"
              onSubmit={(event) => void handleReplySubmit(event, comment.id)}
            >
              <Avatar url={viewer.avatarUrl} name={viewer.displayName} />
              <textarea
                value={replyDraft}
                maxLength={COMMENT_MAX_LENGTH}
                rows={1}
                placeholder={`@${comment.displayName} yanıtla…`}
                onChange={(event) => setReplyDraft(event.target.value)}
                onKeyDown={(event) =>
                  onComposerKeyDown(event, () => {
                    void handleReplySubmit(event, comment.id);
                  })
                }
              />
              <button type="submit" disabled={sending || !replyDraft.trim()}>
                Paylaş
              </button>
            </form>
          ) : null}
        </div>
      </article>
    );
  }

  return (
    <section className="goldBlogComments" aria-label="Yorumlar">
      {!loading && comments.length > 0 ? (
        <p className="goldBlogCommentsCount">
          {formatYorumCount(totalCount(comments))}
        </p>
      ) : null}

      {viewer && !unavailable ? (
        <form className="goldBlogCommentComposer" onSubmit={handleRootSubmit}>
          <Avatar url={viewer.avatarUrl} name={viewer.displayName} />
          <textarea
            value={draft}
            maxLength={COMMENT_MAX_LENGTH}
            rows={1}
            placeholder="Yorum ekle…"
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) =>
              onComposerKeyDown(event, () => {
                void handleRootSubmit(event);
              })
            }
          />
          <button type="submit" disabled={sending || !draft.trim()}>
            {sending && !replyingTo && !editingId ? "…" : "Paylaş"}
          </button>
        </form>
      ) : (
        <div className="goldBlogCommentComposer">
          <span className="goldBlogCommentAvatar" aria-hidden="true">
            G
          </span>
          <Link
            className="goldBlogCommentComposerField"
            href={loginHref(postId)}
          >
            Yorum ekle…
          </Link>
          <Link
            className="goldBlogCommentComposerAction"
            href={loginHref(postId)}
          >
            Paylaş
          </Link>
        </div>
      )}

      {!viewer ? (
        <p className="goldBlogCommentGate">
          Yorum yapmak için giriş yap.{" "}
          <Link href={loginHref(postId)}>Giriş yap</Link>
        </p>
      ) : null}

      {error ? <p className="goldBlogCommentsError">{error}</p> : null}

      {comments.length === 0 && !error && !loading ? (
        <p className="goldBlogCommentsEmpty">Henüz yorum yok.</p>
      ) : null}

      <div className="goldBlogCommentList">
        {comments.map((comment) => renderEntry(comment))}
      </div>
    </section>
  );
}

export { formatYorumCount };
