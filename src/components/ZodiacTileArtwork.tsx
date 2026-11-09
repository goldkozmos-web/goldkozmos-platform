const starPaths: Record<string, number[][]> = {
  koc: [[20,66],[42,40],[72,34],[92,50]],
  boga: [[20,29],[39,49],[62,58],[83,32],[99,20]],
  ikizler: [[27,22],[36,45],[29,75],[55,66],[81,83],[88,51],[79,23]],
  yengec: [[23,26],[54,47],[91,29],[66,74],[41,89]],
  aslan: [[18,71],[37,57],[64,66],[85,45],[79,25],[60,20],[52,35]],
  basak: [[18,31],[44,43],[60,29],[77,45],[61,66],[91,80]],
  terazi: [[20,44],[49,24],[88,43],[72,75],[36,75],[20,44]],
  akrep: [[18,27],[38,38],[50,57],[69,69],[95,61],[100,40]],
  yay: [[19,56],[42,44],[66,27],[79,53],[61,73],[90,85]],
  oglak: [[18,32],[52,48],[92,30],[81,72],[47,82],[18,32]],
  kova: [[17,52],[36,36],[53,49],[70,31],[94,45],[81,74]],
  balik: [[16,35],[31,21],[43,36],[31,50],[16,35],[62,70],[88,62],[101,77]]
};

export default function ZodiacTileArtwork({ slug }: { slug: string }) {
  const stars = starPaths[slug];
  return <svg className="zodiacTileArtwork" viewBox="0 0 120 110" fill="none" aria-hidden="true">
    <circle cx="60" cy="56" r="49" className="zodiacTileOrbit" />
    <circle cx="60" cy="56" r="43" className="zodiacTileOrbit zodiacTileOrbitInner" />
    <polyline points={stars.map(point => point.join(",")).join(" ")} />
    {stars.map(([x, y], index) => <g key={index}><circle cx={x} cy={y} r={index % 3 === 0 ? 2 : 1.4} /><circle cx={x} cy={y} r="4.5" className="zodiacTileStarGlow" /></g>)}
    <path className="zodiacTileCross" d="M103 14v8m-4-4h8M15 91v6m-3-3h6" />
  </svg>;
}
