interface Props {
  fillColor: string;
  bgColor?: string;
  flip?: boolean;
  className?: string;
}

export default function WaveDivider({ fillColor, bgColor, flip = false, className = "" }: Props) {
  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none ${className}`}
      style={{ ...(bgColor ? { backgroundColor: bgColor } : {}), ...(flip ? { transform: "rotate(180deg)" } : {}) }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 72"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="block w-full h-16 lg:h-[72px]"
      >
        <path
          d="M0,36 C180,72 360,0 540,36 C720,72 900,0 1080,36 C1260,72 1380,18 1440,36 L1440,72 L0,72 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
}
