import Image from "next/image";

// Coordinates are percentages of the desktop design's width.
const layout = [
  [1, 11, 17, 17.1], [3, 53.4, 13.8, 16.4], [2, 37.4, 33.8, 10.2],
  [4, 83.7, 30.5, 8.1], [5, 14.6, 43.8, 9.4], [6, 55.9, 42.4, 11.2],
  [8, 33, 56.5, 13], [7, 78.1, 56.5, 9.7], [10, 8.5, 68.8, 14],
  [9, 54.6, 72.2, 9.4], [11, 36.7, 80.5, 10.8], [12, 74.4, 84.1, 17],
  [13, 19.4, 99.5, 12], [15, 60, 95.8, 8.9], [14, 40.3, 108.1, 11.6],
  [19, 78, 106.8, 13.4], [16, 8.5, 123.1, 15.6], [17, 63.2, 121, 9.4],
  [20, 40.8, 136.8, 15.1], [21, 78, 134.1, 10.7],
  [23, 12, 157.5, 24], [22, 46, 166.5, 17], [24, 71.3, 159.5, 18],
  [26, 12.2, 181.5, 14.5], [27, 39.8, 189, 15], [25, 73.5, 186, 13.5],
];

export default function DailyGrid() {
  return <div className="daily-canvas" aria-label="Daily visual journal">
    {layout.map(([number, x, y, w]) => <figure key={number} className="daily-photo" style={{ "--x": x, "--y": y, "--w": w }}>
      <Image src={`/img/daily/${number}.jpg`} alt="" width={1000} height={1000}
        sizes="(max-width: 767px) 45vw, 24vw" />
    </figure>)}
  </div>;
}
