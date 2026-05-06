type BrandLogoProps = {
  inverted?: boolean;
};

export default function BrandLogo({ inverted = false }: BrandLogoProps) {
  return (
    <span className="inline-flex items-center gap-3">
      <span
        aria-hidden="true"
        className={`relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-lg ${
          inverted ? "bg-white text-[#0d5b57]" : "bg-[#0d5b57] text-white"
        }`}
      >
        <span className="absolute left-2 top-2 h-6 w-6 rounded-full border-2 border-current/25" />
        <span className="absolute left-1.5 top-[19px] h-0.5 w-8 -rotate-[22deg] rounded-full bg-current" />
        <span className="absolute left-[15px] top-[11px] h-4 w-2.5 -rotate-[22deg] rounded-[2px] border-l-2 border-t-2 border-current" />
        <span className="absolute right-[9px] top-[21px] h-2.5 w-2.5 -rotate-[22deg] border-r-2 border-t-2 border-current" />
        <span
          className={`absolute bottom-2 right-2 h-1.5 w-1.5 rounded-full ${
            inverted ? "bg-[#e25d3f]" : "bg-[#f4c35d]"
          }`}
        />
      </span>
      <span className="leading-none">
        <span
          className={`block whitespace-nowrap text-xl font-black tracking-tight sm:text-2xl ${
            inverted ? "text-white" : "text-[#17211f]"
          }`}
        >
          FaithTourTravel
        </span>
      </span>
    </span>
  );
}
