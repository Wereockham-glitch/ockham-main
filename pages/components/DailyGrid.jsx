import Image from "next/image";

const layouts = [
  // YOUR ORIGINAL BASE (untouched)
  { span: 3, start: 1, y: 60 },     
  { span: 2, start: 5, y: 370 },    
  { span: 3, start: 7, y: 50 },     
  { span: 2, start: 11, y: 120 },   
  { span: 2, start: 2, y: 60 },     
  { span: 3, start: 6, y: 180 },    
  { span: 2, start: 10, y: 100 },

  // NEW BLOCK (8–14)
  { span: 3, start: 2, y: 40 },
  { span: 2, start: 3, y: 420 },
  { span: 3, start: 7, y: 180 },
  { span: 2, start: 11, y: 240 },
  { span: 3, start: 2, y: 220 },
  { span: 3, start: 6, y: 280 },
  { span: 2, start: 10, y: 260 },

  // NEW BLOCK (15–21) — adjusted
  { span: 3, start: 1, y: 280 },
  { span: 2, start: 6, y: 280 }, // antes 520
  { span: 3, start: 10, y: 260 },
  { span: 2, start: 8, y: 340 },
  { span: 2, start: 2, y: 320 },
  { span: 3, start: 6, y: 260 }, // antes 420
  { span: 2, start: 10, y: 220 }, // antes 360
];

const DailyGrid = ({ images }) => {
  return (
    <div className="grid grid-cols-12 px-4 gap-y-8 pt-8 pb-32">
      {images?.map((img, i) => {
        const layout = layouts[i];

        if (!layout) return null;

        return (
          <div
            key={i}
            className="relative"
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