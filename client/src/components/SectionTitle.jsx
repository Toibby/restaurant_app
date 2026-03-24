export default function SectionTitle({ eyebrow, title, text }) {
  return (
    <div className="mb-8">
      {eyebrow ? (
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-orange-400">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
        {title}
      </h2>
      {text ? <p className="mt-3 max-w-2xl text-slate-300">{text}</p> : null}
    </div>
  );
}