"use client";

import { useRef, useCallback, useState } from "react";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { useWallet } from "@/hooks/use-wallet";
import { formatCurrency } from "@/lib/format";
import { mockExchangeRates } from "@/lib/mock-data";
import type { CurrencyCode } from "@/lib/types";

const EDGE_DEPTH = 6;
const DISPLAY_CURRENCIES: CurrencyCode[] = ["USD", "VND", "IDR"];

export function WalletBalanceCard() {
  const { getBalance } = useWallet();
  const [currencyIndex, setCurrencyIndex] = useState(0);
  const [balanceVisible, setBalanceVisible] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);
  const glassRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);
  const blurRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const usdBalance = getBalance("USD");
  const vndBalance = getBalance("VND");

  const displayCurrency = DISPLAY_CURRENCIES[currencyIndex];
  const displayBalance = displayCurrency === "USD"
    ? usdBalance
    : displayCurrency === "VND"
      ? usdBalance * mockExchangeRates.USD_VND
      : usdBalance * mockExchangeRates.USD_IDR;

  const handleBalanceTap = useCallback(() => {
    setCurrencyIndex((prev) => (prev + 1) % DISPLAY_CURRENCIES.length);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const card = cardRef.current;
    const glass = glassRef.current;
    const border = borderRef.current;
    const shimmer = shimmerRef.current;
    const blur = blurRef.current;
    if (!card || !glass || !border || !shimmer || !blur) return;

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      // 3D tilt (max ±8deg)
      const rotateY = (x - 0.5) * 16;
      const rotateX = (0.5 - y) * 16;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

      // Glass — enhanced inner glow on hover
      glass.style.boxShadow =
        "inset 0 2px 2px rgba(0,0,0,0.05), inset 0 -2px 2px rgba(255,255,255,0.5), inset 0 0 1px 2px rgba(255,255,255,0.5)";
      glass.style.backdropFilter = "blur(0.5px)";
      (glass.style as Record<string, string>)["WebkitBackdropFilter"] = "blur(0.5px)";

      // Border — rotate conic gradient to follow cursor angle
      const angle = Math.atan2(y - 0.5, x - 0.5) * (180 / Math.PI);
      border.style.setProperty("--border-angle", `${angle}deg`);
      border.style.opacity = "1";

      // Shimmer — follow cursor x position
      const shimmerPos = x * 50 + 25;
      shimmer.style.backgroundPosition = `${shimmerPos}% 0`;
      shimmer.style.opacity = "1";

      // Hide blur gradient so image is visible on hover
      blur.style.opacity = "0";

      // Expand neon-400 edges on hover
      card.style.setProperty("--edge-expand", "0.5");
    });
  }, []);

  const handlePointerLeave = useCallback(() => {
    const card = cardRef.current;
    const glass = glassRef.current;
    const border = borderRef.current;
    const shimmer = shimmerRef.current;
    const blur = blurRef.current;
    if (!card || !glass || !border || !shimmer || !blur) return;

    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    glass.style.boxShadow =
      "inset 0 2px 2px rgba(0,0,0,0.05), inset 0 -2px 2px transparent, inset 0 0 2px 4px rgba(255,255,255,0.05)";
    glass.style.backdropFilter = "blur(2px)";
    glass.style.WebkitBackdropFilter = "blur(2px)";
    border.style.opacity = "0.4";
    shimmer.style.opacity = "0";
    blur.style.opacity = "1";
    card.style.setProperty("--edge-expand", "0.2");
  }, []);

  return (
    <div className="mx-4" style={{ perspective: "800px" }}>
      <div
        ref={cardRef}
        className="relative rounded-[18px] h-[254px]"
        style={{
          boxShadow: "-2px 6px 40px rgba(0,0,0,0.15)",
          transition: "transform 0.4s cubic-bezier(0.03, 0.98, 0.52, 0.99)",
          transformStyle: "preserve-3d",
          willChange: "transform",
          "--edge-expand": "0.2",
        } as React.CSSProperties}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        {/* Card face — explicitly at Z=0 so slices behind are visible */}
        <div className="relative overflow-hidden rounded-[18px] h-full" style={{ transformStyle: "preserve-3d", transform: "translateZ(0px)" }}>
          {/* Background image */}
          <Image
            src="/images/card-bg.png"
            alt=""
            fill
            className="object-cover"
            priority
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Glass base — gradient + backdrop-filter + inset shadows */}
          <div
            ref={glassRef}
            className="absolute inset-0 rounded-[18px]"
            style={{
              backdropFilter: "blur(2px)",
              WebkitBackdropFilter: "blur(2px)",
              background: "linear-gradient(-75deg, rgba(255,255,255,0.05), rgba(255,255,255,0.15), rgba(255,255,255,0.05))",
              boxShadow:
                "inset 0 2px 2px rgba(0,0,0,0.05), inset 0 -2px 2px transparent, inset 0 0 2px 4px rgba(255,255,255,0.05)",
              transition: "box-shadow 0.4s cubic-bezier(0.25, 1, 0.5, 1), backdrop-filter 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
            }}
          />

          {/* Glass border — conic gradient with mask-composite */}
          <div
            ref={borderRef}
            className="absolute pointer-events-none"
            style={{
              inset: "-1.5px",
              padding: "1.5px",
              borderRadius: "19.5px",
              opacity: 0.4,
              transition: "opacity 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
              background:
                "conic-gradient(from var(--border-angle, -75deg) at 50% 50%, #fff, transparent 5% 40%, #fff 50%, transparent 60% 95%, #fff), linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.05))",
              boxShadow: "inset 0 0 0 0.75px rgba(255,255,255,0.15)",
              maskImage: "linear-gradient(#000 0 0), linear-gradient(#000 0 0)",
              maskClip: "content-box, border-box",
              maskOrigin: "content-box, border-box",
              maskComposite: "exclude",
              WebkitMaskImage: "linear-gradient(#000 0 0), linear-gradient(#000 0 0)",
              WebkitMaskClip: "content-box, border-box",
              WebkitMaskOrigin: "content-box, border-box",
              WebkitMaskComposite: "xor",
            }}
          />

          {/* Shimmer — screen-blended gradient that follows cursor */}
          <div
            ref={shimmerRef}
            className="absolute inset-0 rounded-[18px] pointer-events-none"
            style={{
              opacity: 0,
              transition: "opacity 0.5s cubic-bezier(0.25, 1, 0.5, 1), background-position 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
              background: "linear-gradient(-45deg, transparent 10%, rgba(255,255,255,0.25) 40% 45%, rgba(255,255,255,0.07) 60%)",
              backgroundSize: "200% 200%",
              backgroundPosition: "0 0",
              backgroundRepeat: "no-repeat",
              mixBlendMode: "screen",
            }}
          />

          {/* Blur gradient — diagonal bottom-left to top-right, 40% opacity, half coverage */}
          <div
            ref={blurRef}
            className="absolute inset-0 pointer-events-none"
            style={{
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              maskImage: "linear-gradient(to top right, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.4) 10%, transparent 50%)",
              WebkitMaskImage: "linear-gradient(to top right, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.4) 10%, transparent 50%)",
              transition: "opacity 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
            }}
          />

          {/* Content */}
          <div className="relative flex h-full flex-col justify-between p-5">
            <div className="flex justify-end">
              <span className="text-sm font-semibold text-neon-500">
                BeamPay
              </span>
            </div>

            <div>
              <p className="text-base font-medium text-neon-500">
                {balanceVisible ? formatCurrency(vndBalance, "VND") : "••••••"}
              </p>
              <div className="flex items-center gap-3">
                <p
                  onClick={handleBalanceTap}
                  className="text-[48px] font-semibold leading-tight text-white tabular-nums tracking-tight cursor-pointer select-none"
                >
                  {balanceVisible ? formatCurrency(displayBalance, displayCurrency) : "••••••"}
                </p>
                <button
                  onClick={() => setBalanceVisible((v) => !v)}
                  className="flex items-center justify-center text-white/60 hover:text-white transition-colors"
                >
                  {balanceVisible ? (
                    <Eye className="h-5 w-5" />
                  ) : (
                    <EyeOff className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3D neon-400 edges — stacked slices that follow border radius */}
        {Array.from({ length: EDGE_DEPTH }, (_, i) => {
          const depth = i + 1;
          return (
            <div
              key={i}
              className="absolute pointer-events-none"
              style={{
                inset: `calc(-1px * ${depth} * var(--edge-expand))`,
                borderRadius: `calc(18px + 1px * ${depth} * var(--edge-expand))`,
                transform: `translateZ(${-depth}px)`,
                background: `color-mix(in srgb, var(--color-neon-400) ${100 - (i / EDGE_DEPTH) * 40}%, black)`,
                transition: "inset 0.4s cubic-bezier(0.25, 1, 0.5, 1), border-radius 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
