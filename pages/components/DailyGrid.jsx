import Image from "next/image";

const layouts = [
  { span: 3, start: 1, y: 0 },      // izquierda arriba
  { span: 2, start: 5, y: 120 },    // más abajo
  { span: 4, start: 7, y: 40 },     // más grande y más separada
  { span: 2, start: 11, y: 120 },   // derecha arriba

  { span: 2, start: 2, y: 60 },
  { span: 3, start: 6, y: 220 },
  { span: 2, start: 10, y: 140 },
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