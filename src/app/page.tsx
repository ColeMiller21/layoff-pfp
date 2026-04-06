import Link from "next/link";
import { LayoffHedgeBuyAndFooter } from "@/components/layoffhedge-buy-and-footer";
import { PfpCompositor } from "@/components/pfp-compositor";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-1 flex-col">
      <nav className="sticky top-0 z-50 border-b border-border bg-[rgba(250,248,244,0.97)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-[980px] items-center justify-between px-7 py-3.5">
          <Link href="/" className="font-heading text-xl tracking-tight">
            <span className="text-primary">layoff</span>
            <span className="text-foreground">hedge</span>
            <span className="ml-2 font-sans text-sm font-medium text-muted-foreground">
              · PFP
            </span>
          </Link>
          <div className="flex items-center gap-6 text-[13px] font-medium">
            <Link
              href="https://layoffhedge.com/"
              className="text-primary font-bold hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Main site
            </Link>
          </div>
        </div>
      </nav>

      <header className="border-b border-border px-7 py-10 sm:px-7">
        <div className="mx-auto max-w-lg">
          <h1 className="font-heading text-3xl leading-tight tracking-tight text-foreground md:text-4xl">
            <span className="text-primary">Terminated</span> PFP
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
            Add your photo, stamp it, download it. All in your browser — nothing
            gets uploaded.
          </p>
        </div>
      </header>

      <main className="flex-1 px-7 py-10 sm:px-7">
        <div className="mx-auto max-w-lg">
          <PfpCompositor />
        </div>
      </main>

      <LayoffHedgeBuyAndFooter />
    </div>
  );
}
