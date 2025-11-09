import LogoIcon from "../assets/logoIcon.svg"

export default function Logo() {
  return (
    <a
      className="flex items-center gap-3 rounded-lg hover:bg-[var(--hover-bg)]"
      href="/"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent)]">
        <img src={LogoIcon} alt="Logo" className="w-6 h-6" />
      </div>
      <div className="flex flex-col justify-between">
        <span className="font-semibold text-[var(--text)]">NewsAggregator</span>
        <span className="text-xs text-[var(--muted-2)]">News feed</span>
      </div>
    </a>
  )
}
