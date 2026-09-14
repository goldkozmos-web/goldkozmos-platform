export default function ProfilimCompactTile({
  eyebrow,
  title,
  onOpen,
  className,
}: {
  eyebrow: string;
  title: string;
  onOpen: () => void;
  className?: string;
}) {
  const classNames = ["profilimTile", className].filter(Boolean).join(" ");

  return (
    <button type="button" className={classNames} onClick={onOpen}>
      <span className="profilimTileEyebrow">{eyebrow}</span>
      <strong className="profilimTileTitle">{title}</strong>
      <span className="profilimTileChevron" aria-hidden="true">
        ›
      </span>
    </button>
  );
}
