import ProfilimIcon from "./ProfilimIcon";
export default function ProfilimCompactTile({
  icon,
  eyebrow,
  title,
  onOpen,
  className,
}: {
  icon?: string;
  eyebrow: string;
  title: string;
  onOpen: () => void;
  className?: string;
}) {
  const classNames = ["profilimTile", className].filter(Boolean).join(" ");

  return (
    <button type="button" className={classNames} onClick={onOpen}>
      <ProfilimIcon name={icon || eyebrow} />
      <span className="profilimTileEyebrow">{eyebrow}</span>
      <strong className="profilimTileTitle">{title}</strong>
      <span className="profilimTileChevron" aria-hidden="true">
        ›
      </span>
    </button>
  );
}
