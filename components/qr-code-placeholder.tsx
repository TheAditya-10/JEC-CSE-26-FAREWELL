export function QrCodePlaceholder() {
  const cells = Array.from({ length: 81 });

  return (
    <div className="rounded-[2rem] border border-gold/20 bg-white p-4 shadow-glow">
      <div className="grid grid-cols-9 gap-1">
        {cells.map((_, index) => {
          const shouldFill =
            [0, 1, 2, 9, 11, 18, 19, 20, 60, 61, 62, 69, 71, 78, 79, 80].includes(index) ||
            index % 3 === 0 ||
            index % 7 === 0;

          return (
            <span
              key={index}
              className={`aspect-square rounded-[2px] ${shouldFill ? "bg-black" : "bg-transparent"}`}
            />
          );
        })}
      </div>
    </div>
  );
}
