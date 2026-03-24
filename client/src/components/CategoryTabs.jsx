"use client";

export default function CategoryTabs({ categories, activeCategory, onChange }) {
  return (
    <div className="mb-8 flex flex-wrap gap-3">
      {categories.map((category) => {
        const active = category === activeCategory;

        return (
          <button
            key={category}
            onClick={() => onChange(category)}
            className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
              active
                ? "bg-orange-500 text-slate-950"
                : "border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}