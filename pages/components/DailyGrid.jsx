import Image from "next/image";

const layouts = [
  { span: 3, start: 1, y: 20 },      // 1

  { span: 2, start: 5, y: 220 },     // 2 pequeña, un poco abajo
  { span: 3, start: 7, y: 20 },     // 3 menos grande y más arriba

  { span: 2, start: 11, y: 120 },   // 4 derecha

  { span: 2, start: 2, y: 60 },     // 5
  { span: 3, start: 6, y: 180 },    // 6
  { span: 2, start: 10, y: 100 },   // 7
];  

const DailyGrid = ({ images }) => {
  return (
    <div className="grid grid-cols-12 px-4 gap-y-16 pt-8 pb-32">
      {images?.map((img, i) => {
        const layout = layouts[i % layouts.length];

        return (
          <div
            key={i}
            className="col-span-12"
            style={{
              gridColumn: `${layout.start} / span ${layout.span}`,
              transform: `translateY(${layout.y}px)`,
            }}
          >
            <Image
              src={img}
              alt=""
              width={1000}
              height={1000}
              className="w-full h-auto"
            />
          </div>
        );
      })}
    </div>
  );
};

export default DailyGrid;