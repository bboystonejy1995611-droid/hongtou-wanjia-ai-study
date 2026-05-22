import type { LucideIcon } from "lucide-react";

interface ModeCardProps {
  title: string;
  copy: string;
  points: string[];
  icon: LucideIcon;
  tone: "blue" | "violet" | "cyan";
}

const toneClassNames = {
  blue: "bg-blue-100 text-blue-700",
  cyan: "bg-cyan-100 text-cyan-700",
  violet: "bg-violet-100 text-violet-700",
};

export function ModeCard({
  copy,
  icon: Icon,
  points,
  title,
  tone,
}: ModeCardProps) {
  return (
    <article className="surface home-mode-card flex h-full flex-col p-5">
      <span
        className={`flex h-11 w-11 items-center justify-center rounded-lg ${toneClassNames[tone]}`}
      >
        <Icon aria-hidden="true" className="h-5 w-5" />
      </span>
      <h3 className="mt-5 text-xl font-black text-slate-950">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-slate-600">{copy}</p>
      <ul className="mt-4 grid gap-2 text-sm text-slate-700">
        {points.map((point) => (
          <li className="flex items-start gap-2" key={point}>
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
