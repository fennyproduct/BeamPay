"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Image as ImageIcon } from "lucide-react";
import { ROUTES } from "@/lib/constants";

export function QrScanner() {
  const router = useRouter();
  const scannerRef = useRef<HTMLDivElement>(null);
  const html5QrCodeRef = useRef<import("html5-qrcode").Html5Qrcode | null>(null);
  const [hasCamera, setHasCamera] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function startScanner() {
      const { Html5Qrcode } = await import("html5-qrcode");

      if (!mounted || !scannerRef.current) return;

      const scanner = new Html5Qrcode("qr-reader");
      html5QrCodeRef.current = scanner;

      try {
        await scanner.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            disableFlip: false,
          },
          () => {
            scanner.stop().catch(() => {});
            router.push(ROUTES.TRANSFER_SUCCESS);
          },
          () => {}
        );
      } catch {
        if (mounted) setHasCamera(false);
      }
    }

    startScanner();

    return () => {
      mounted = false;
      html5QrCodeRef.current?.stop().catch(() => {});
      html5QrCodeRef.current = null;
    };
  }, [router]);

  function handleGallery() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const { Html5Qrcode } = await import("html5-qrcode");
      const scanner = new Html5Qrcode("qr-gallery-reader");
      try {
        const result = await scanner.scanFile(file, true);
        if (result) {
          router.push(ROUTES.TRANSFER_SUCCESS);
        }
      } catch {
        alert("No QR code found in image");
      }
    };
    input.click();
  }

  return (
    <div className="fixed inset-0 z-40 bg-black">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="absolute left-5 top-14 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-black/60"
      >
        <ChevronLeft className="h-5 w-5 text-white" />
      </button>

      {/* Full-screen camera feed */}
      <div
        id="qr-reader"
        ref={scannerRef}
        className="absolute inset-0 h-full w-full [&>video]:!object-cover [&>video]:!w-full [&>video]:!h-full [&>video]:!max-w-none [&>video]:!max-h-none [&_img]:!hidden [&>div]:!hidden"
      />

      {!hasCamera && (
        <div className="absolute inset-0 flex items-center justify-center text-sm text-zinc-400">
          Camera not available
        </div>
      )}

      {/* Corner brackets — centered on screen */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[280px] w-[280px] pointer-events-none">
        <span className="absolute left-0 top-0 h-[50px] w-[50px] border-l-[5px] border-t-[5px] border-white rounded-tl-sm" />
        <span className="absolute right-0 top-0 h-[50px] w-[50px] border-r-[5px] border-t-[5px] border-white rounded-tr-sm" />
        <span className="absolute bottom-0 left-0 h-[50px] w-[50px] border-b-[5px] border-l-[5px] border-white rounded-bl-sm" />
        <span className="absolute bottom-0 right-0 h-[50px] w-[50px] border-b-[5px] border-r-[5px] border-white rounded-br-sm" />
      </div>

      {/* Hidden element for gallery scanning */}
      <div id="qr-gallery-reader" className="hidden" />

      {/* Choose from gallery pill — above bottom nav */}
      <div className="absolute bottom-36 left-1/2 -translate-x-1/2 z-50">
        <button
          className="flex items-center gap-2 rounded-full bg-black/60 px-4 py-2"
          onClick={handleGallery}
        >
          <ImageIcon className="h-5 w-5 text-zinc-50" />
          <span className="text-sm text-zinc-50">Choose from gallery</span>
        </button>
      </div>
    </div>
  );
}
