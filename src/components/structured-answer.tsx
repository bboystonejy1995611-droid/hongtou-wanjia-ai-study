interface StructuredAnswerProps {
  answer: string;
}

export function StructuredAnswer({ answer }: StructuredAnswerProps) {
  const sections = answer
    .split(/(?=【[^】]+】)/g)
    .map((section) => section.trim())
    .filter(Boolean);

  return (
    <div className="grid gap-3">
      {sections.map((section) => {
        const titleMatch = section.match(/^【([^】]+)】/);
        const title = titleMatch?.[1] ?? "本地回答";
        const copy = section.replace(/^【[^】]+】/, "").trim();

        return (
          <section className="surface-quiet p-4" key={`${title}-${copy.slice(0, 18)}`}>
            <h3 className="text-sm font-black text-blue-800">【{title}】</h3>
            <p className="answer-copy mt-2 text-sm leading-7 text-slate-700">
              {copy || section}
            </p>
          </section>
        );
      })}
    </div>
  );
}

