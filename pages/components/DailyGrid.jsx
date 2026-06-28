import Image from "next/image";

const layouts = [
  // ROW 1
  { span: 3, start: 1, y: 20 },    
  { span: 2, start: 5, y: 260 },   
  { span: 3, start: 7, y: 40 },    
  { span: 2, start: 11, y: 140 },  

  // ROW 2
  { span: 2, start: 2, y: 100 },   
  { span: 4, start: 6, y: 260 },   // HERO
  { span: 2, start: 10, y: 160 },  

  // ROW 3
  { span: 3, start: 1, y: 140 },   
  { span: 2, start: 5, y: 280 },   
  { span: 3, start: 8, y: 180 },   
  { span: 2, start: 11, y: 100 },  

  // ROW 4
  { span: 2, start: 2, y: 180 },   
  { span: 4, start: 5, y: 340 },   // HERO
  { span: 3, start: 9, y: 200 },   

  // ROW 5
  { span: 3, start: 1, y: 160 },   
  { span: 2, start: 5, y: 300 },   
  { span: 3, start: 7, y: 220 },   
  { span: 2, start: 11, y: 120 },  

  // LAST
  { span: 3, start: 3, y: 220 },   
  { span: 4, start: 7, y: 380 },   
];

const DailyGrid = ({ images }) => {
  return (
    <div className="grid grid-cols-12 px-4 gap-y-28 pt-8 pb-32">
      {images?.map((img, i) => {
        const layout = layouts[i];

        if (!layout) return null;

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