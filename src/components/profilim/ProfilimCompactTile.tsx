export default function ProfilimCompactTile({
  eyebrow,
  title,
  onOpen,
}: {
  eyebrow: string;
  title: string;
  onOpen: () => void;
}) {
  return (
    <button type="button" className="profilimTile" onClick={onOpen}>
      <span className="profilimTileEyebrow">{eyebrow}</span>
      <strong className="profilimTileTitle">{title}</strong>
      <span className="profilimTileChevron" aria-hidden="true">
        ›
      </span>
    </button>
  );
}
