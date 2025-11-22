function NewsList({ news }) {
  if (!news || !news.stories || news.stories.length === 0) return null;

  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-2xl shadow-sm p-5 md:p-6 text-slate-200">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold text-slate-200">
          Latest Tech News
        </h2>
        <span className="text-xs text-slate-400">Source: HackerNews API</span>
      </div>

      <div className="space-y-4">
        {news.stories.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-zinc-700 bg-zinc-800 p-3 hover:bg-zinc-700 transition"
          >
            <a
              href={
                item.url !== "No URL"
                  ? item.url
                  : `https://news.ycombinator.com/item?id=${item.id}`
              }
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-slate-200 hover:underline"
            >
              {item.title}
            </a>

            <div className="mt-1 flex flex-wrap gap-3 text-[11px] text-slate-400">
              <span>Score: {item.score}</span>
              <span>By: {item.by}</span>
              <span>Type: {item.type}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsList;
