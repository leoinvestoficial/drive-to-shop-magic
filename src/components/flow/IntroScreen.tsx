import logo from "@/assets/brand/drive/flow-logo-1.svg";

export const IntroScreen = () => {
  const handleScroll = () => {
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section
      id="intro"
      className="relative w-full overflow-hidden flex flex-col items-center justify-center bg-flow-cream"
      style={{ height: "100vh" }}
    >
      <img
        src={logo}
        alt="flow"
        className="w-[140px] md:w-[180px] h-auto opacity-0 animate-[fade-in_0.8s_ease_0.2s_forwards]"
      />
      <button
        type="button"
        onClick={handleScroll}
        aria-label="role para descobrir"
        className="absolute left-1/2 -translate-x-1/2 bottom-8 md:bottom-10 flex flex-col items-center gap-2 min-w-[44px] min-h-[44px] justify-center"
      >
        <span
          className="font-sans uppercase"
          style={{ fontSize: 10, letterSpacing: "3px", color: "#999", fontWeight: 400 }}
        >
          role para descobrir
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#999"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-intro-arrow"
          aria-hidden
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </button>
    </section>
  );
};