const links = {
  Product: ["Browse items", "List your items", "Moving out", "Moving in"],
  Company: ["About", "Blog", "Press", "Contact"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white px-4 sm:px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔄</span>
              <span className="font-bold text-xl tracking-tight">PassOn</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              In-unit handoff for renters: list what you leave behind, shop what the last tenant
              left—timed to turnover, not pickup runs.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
                {category}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2026 PassOn. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <span className="text-rose-400">♥</span> for renters everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
