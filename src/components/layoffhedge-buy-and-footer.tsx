import Link from "next/link";

const LHO = "https://layoffhedge.com";

const footerLinks: { href: string; label: string }[] = [
  { href: "https://x.com/LayoffAI", label: "@LayoffAI" },
  { href: `${LHO}/company/`, label: "Companies" },
  { href: `${LHO}/industry/tech-layoffs-2026`, label: "Industries" },
  { href: `${LHO}/trends/q1-2026-layoff-report`, label: "Trends" },
  { href: `${LHO}/data/`, label: "Data" },
  { href: `${LHO}/press`, label: "Press" },
  { href: `${LHO}/pitchdeck`, label: "Investor Overview" },
  {
    href: "https://dexscreener.com/solana/hdtxiwhqptffrigdndoafaapngserxsfudirxj1m8n42",
    label: "DEX",
  },
];

export function LayoffHedgeBuyAndFooter() {
  return (
    <div className="mt-auto w-full">
      <section className="border-t border-border bg-card py-6">
        <div className="mx-auto flex max-w-[980px] flex-col items-center px-7 text-center sm:px-7">
          <p className="font-heading mb-4 text-lg italic text-foreground">
            Invest in the only severance package that appreciates.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://www.coinbase.com/price/official-layoff-coin-solana-9voqqttdfbqfxwc9rzadjeexxjuwjhnb4wkshmt8pump-token"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md bg-[#0052FF] px-6 py-2.5 text-xs font-bold text-white no-underline transition-opacity hover:opacity-85"
            >
              Coinbase
              <span className="text-[9px] font-semibold opacity-70">
                (US Only)
              </span>
            </a>
            <a
              href="https://jup.ag/tokens/9voQQTTdfbqfXwc9rZAdJEeXXjUWjHnB4wkShMT8pump"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md bg-gradient-to-br from-[#00D18C] to-[#24AE8F] px-6 py-2.5 text-xs font-bold text-white no-underline transition-opacity hover:opacity-85"
            >
              Buy on Jupiter
            </a>
          </div>
        </div>
      </section>

      <footer className="px-7 py-5 text-center text-[11px] text-[#bbb]">
        <div className="mx-auto max-w-[980px]">
          {footerLinks.map((item, i) => (
            <span key={item.href}>
              {i > 0 ? (
                <span className="text-muted-foreground/70" aria-hidden>
                  {" "}
                  ·{" "}
                </span>
              ) : null}
              <Link
                href={item.href}
                className="text-muted-foreground no-underline hover:text-foreground"
                target={item.href.startsWith(LHO) ? undefined : "_blank"}
                rel={
                  item.href.startsWith(LHO) ? undefined : "noopener noreferrer"
                }
              >
                {item.label}
              </Link>
            </span>
          ))}
        </div>
      </footer>
    </div>
  );
}
