import Image from "next/image";

const layouts = [
  // YOUR ORIGINAL BASE (untouched)
  { span: 3, start: 1, y: 20 },     
  { span: 2, start: 5, y: 340 },    
  { span: 3, start: 7, y: 20 },     
  { span: 2, start: 11, y: 120 },   
  { span: 2, start: 2, y: 60 },     
  { span: 3, start: 6, y: 180 },    
  { span: 2, start: 10, y: 100 },

  // NEW BLOCK (8–14)
  { span: 3, start: 1, y: 90 },
  { span: 2, start: 4, y: 420 },
  { span: 3, start: 7, y: 180 },
  { span: 2, start: 11, y: 240 },
  { span: 3, start: 1, y: 280 },
  { span: 3, start: 6, y: 340 },
  { span: 2, start: 10, y: 260 },

  // NEW BLOCK (15–21)
  { span: 3, start: 2, y: 240 },
  { span: 2, start: 6, y: 520 },
  { span: 3, start: 10, y: 260 },
  { span: 2, start: 2, y: 320 },
  { span: 3, start: 6, y: 420 },
  { span: 2, start: 10, y: 360 },
];

const mobileLayouts = [
  { span: 3, start: 1, row: 1 },
  { span: 2, start: 5, row: 1 },
  { span: 4, start: 3, row: 2 },
  { span: 2, start: 1, row: 3 },
  { span: 3, start: 4, row: 3 },
  { span: 3, start: 2, row: 4 },
  { span: 2, start: 5, row: 4 },
  { span: 4, start: 1, row: 5 },
  { span: 2, start: 5, row: 5 },
  { span: 3, start: 1, row: 6 },
  { span: 3, start: 4, row: 6 },
  { span: 2, start: 2, row: 7 },
  { span: 4, start: 3, row: 8 },
  { span: 2, start: 1, row: 9 },
  { span: 3, start: 4, row: 9 },
  { span: 4, start: 1, row: 10 },
  { span: 2, start: 5, row: 10 },
  { span: 3, start: 2, row: 11 },
  { span: 2, start: 5, row: 11 },
  { span: 4, start: 2, row: 12 },
];

const DailyGrid = ({ images }) => {
  return (
    <>
      <div className="grid md:hidden grid-cols-6 gap-x-3 gap-y-20 px-6 pt-24 pb-32">
        {images?.map((img, i) => {
          const layout = mobileLayouts[i];

          if (!layout) return null;

          return (
            <div
              key={i}
              className="relative self-start w-[86%] justify-self-center"
              style={{
                gridColumn: `${layout.start} / span ${layout.span}`,
                gridRow: layout.row,
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

      <div className="hidden md:grid grid-cols-12 px-4 gap-y-20 pt-8 pb-40">
        {images?.map((img, i) => {
          const layout = layouts[i];

          if (!layout) return null;

          return (
            <div
              key={i}
              className="relative w-[82%] justify-self-center"
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
    </>
  );
};

export default DailyGrid;
