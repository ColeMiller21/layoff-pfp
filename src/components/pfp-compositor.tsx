"use client";

import { useCallback, useId, useRef, useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const STAMP_SRC = "/terminated-transparent.png";
/** Larger side of stamp vs shorter side of photo — diagonal stamp; 2× prior default. */
const STAMP_PERCENT_OF_MIN_SIDE = 104;

function loadImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not load your photo"));
    };
    img.src = url;
  });
}

function loadStamp(): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () =>
      reject(new Error("Could not load the terminated stamp"));
    img.src = STAMP_SRC;
  });
}

export function PfpCompositor() {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [compositeUrl, setCompositeUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isWorking, setIsWorking] = useState(false);

  const handleGetLaidOff = useCallback(async () => {
    if (!photoFile) return;
    setError(null);
    setIsWorking(true);
    try {
      const [baseImg, stampImg] = await Promise.all([
        loadImageFromFile(photoFile),
        loadStamp(),
      ]);
      const w = baseImg.naturalWidth;
      const h = baseImg.naturalHeight;
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas is not available");

      ctx.drawImage(baseImg, 0, 0, w, h);

      const minSide = Math.min(w, h);
      const targetMax = (minSide * STAMP_PERCENT_OF_MIN_SIDE) / 100;
      const sw = stampImg.naturalWidth;
      const sh = stampImg.naturalHeight;
      const ratio = targetMax / Math.max(sw, sh);
      const dw = sw * ratio;
      const dh = sh * ratio;
      ctx.drawImage(stampImg, (w - dw) / 2, (h - dh) / 2, dw, dh);

      setCompositeUrl(canvas.toDataURL("image/png"));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setError(message);
      setCompositeUrl(null);
    } finally {
      setIsWorking(false);
    }
  }, [photoFile]);

  const handleDownload = () => {
    if (!compositeUrl || !photoFile) return;
    const a = document.createElement("a");
    a.href = compositeUrl;
    const stem = photoFile.name.replace(/\.[^.]+$/, "") || "pfp";
    a.download = `${stem}-terminated.png`;
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:flex-wrap">
        <div className="min-w-0 flex-1 space-y-2">
          <Label
            htmlFor={inputId}
            className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground"
          >
            Your photo
          </Label>
          <input
            id={inputId}
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0] ?? null;
              setPhotoFile(f);
              setCompositeUrl(null);
              setError(null);
            }}
          />
          <Button
            type="button"
            variant="outline"
            className="h-auto min-h-10 w-full justify-start border-border bg-card px-3 py-2 text-left font-normal text-foreground hover:bg-muted sm:max-w-md"
            onClick={() => inputRef.current?.click()}
          >
            {photoFile ? photoFile.name : "Choose an image…"}
          </Button>
        </div>
        <Button
          type="button"
          className="shrink-0 font-semibold sm:min-w-[160px]"
          disabled={!photoFile || isWorking}
          onClick={() => void handleGetLaidOff()}
        >
          {isWorking ? "Working…" : "Get Laid Off"}
        </Button>
      </div>

      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}

      <div className="rounded-xl border border-border bg-muted/30 p-4">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Result
        </p>
        {compositeUrl ? (
          <div className="space-y-4">
            {/* eslint-disable-next-line @next/next/no-img-element -- blob data URL from canvas */}
            <img
              src={compositeUrl}
              alt="Profile photo with TERMINATED stamp"
              className="mx-auto max-h-[min(480px,60vh)] w-full max-w-md rounded-lg border border-border bg-card object-contain"
            />
            <Button
              type="button"
              size="lg"
              className="h-12 w-full gap-2 text-base font-semibold shadow-md"
              onClick={handleDownload}
            >
              <Download className="size-5 shrink-0" aria-hidden />
              Download image to share
            </Button>
          </div>
        ) : (
          <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-dashed border-border bg-card/60 px-4 text-center text-sm text-muted-foreground">
            Choose a photo and tap <span className="px-1 font-semibold text-foreground">Get Laid Off</span>{" "}
            to see your shareable image.
          </div>
        )}
      </div>
    </div>
  );
}
