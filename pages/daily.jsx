import DailyGrid from "./components/DailyGrid";

export default function Daily() {
  const mockImages = [
  "/img/daily/1.jpg",
  "/img/daily/2.jpg",
  "/img/daily/3.jpg",
  "/img/daily/4.jpg",
  "/img/daily/5.jpg",
  "/img/daily/6.jpg",
  "/img/daily/7.jpg",
  "/img/daily/8.jpg",
  "/img/daily/9.jpg",
  "/img/daily/10.jpg",
  "/img/daily/11.jpg",
  "/img/daily/12.jpg",
  "/img/daily/13.jpg",
  "/img/daily/14.jpg",
  "/img/daily/15.jpg",
  "/img/daily/16.jpg",
  "/img/daily/17.jpg",
  "/img/daily/18.jpg",
  "/img/daily/19.jpg",
  "/img/daily/20.jpg",
  "/img/daily/21.jpg",
];

  return (
    <div className="bg-white min-h-screen">
      <DailyGrid images={mockImages} />
    </div>
  );
}