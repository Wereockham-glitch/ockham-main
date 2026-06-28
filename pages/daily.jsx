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
  ];

  return (
    <div className="bg-white min-h-screen">
      <DailyGrid images={mockImages} />
    </div>
  );
}