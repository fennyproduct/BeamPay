"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";
import svgPaths from "./svg-i4398jmrgk";

function Frame({ children }: React.PropsWithChildren) {
  return (
    <div className="relative shrink-0 size-[22px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        {children}
      </svg>
    </div>
  );
}

export function BottomNav() {
  const pathname = usePathname();

  const isHomeActive =
    pathname === ROUTES.DASHBOARD || pathname.startsWith(ROUTES.DASHBOARD + "/");
  const isActivitiesActive =
    pathname === ROUTES.TRANSACTIONS ||
    pathname.startsWith(ROUTES.TRANSACTIONS + "/");

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
      <div className="relative mx-auto max-w-[400px]">
        <div className="relative pb-[env(safe-area-inset-bottom)] pointer-events-auto">
          <div
            className="content-stretch flex flex-col items-center justify-end px-4 py-9 relative"
            style={{ background: "linear-gradient(to top, var(--color-background) 0%, transparent 50%)" }}
          >
            <div className="bg-white dark:bg-zinc-900 content-stretch flex gap-[120px] items-center p-1 relative rounded-[32px] shadow-[0px_8px_40px_0px_rgba(0,0,0,0.12)] shrink-0">
              {/* Home tab */}
              <Link
                href={ROUTES.DASHBOARD}
                className={cn(
                  "flex w-[92px] h-[54px] flex-col items-center justify-center gap-[2px] rounded-[100px] transition-colors",
                  isHomeActive ? "text-zinc-900 dark:text-zinc-50" : "text-zinc-400"
                )}
              >
                <Frame>
                  <g>
                    <path d={svgPaths.p9bbea0} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83333" />
                    <path d={svgPaths.p120f3500} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83333" />
                  </g>
                </Frame>
                <span className="font-medium text-[12px] text-center leading-normal whitespace-nowrap">
                  Home
                </span>
              </Link>

              {/* Activities tab */}
              <Link
                href={ROUTES.TRANSACTIONS}
                className={cn(
                  "flex w-[92px] h-[54px] flex-col items-center justify-center gap-[2px] rounded-[100px] transition-colors",
                  isActivitiesActive ? "text-zinc-900 dark:text-zinc-50" : "text-zinc-400"
                )}
              >
                <Frame>
                  <g clipPath="url(#clip0_bottom_nav)">
                    <path d={svgPaths.p34f9e600} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83333" />
                    <path d="M11 5.5V11L14.6667 12.8333" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83333" />
                  </g>
                  <defs>
                    <clipPath id="clip0_bottom_nav">
                      <rect fill="white" height="22" width="22" />
                    </clipPath>
                  </defs>
                </Frame>
                <span className="font-medium text-[12px] text-center leading-normal whitespace-nowrap">
                  Activities
                </span>
              </Link>

              {/* Center Pay Button */}
              <Link
                href={ROUTES.QR}
                className="absolute left-[calc(50%-1px)] top-[calc(50%-5px)] -translate-x-1/2 -translate-y-1/2 w-[120px]"
              >
                <div
                  className="overflow-clip p-[6px] rounded-[32px]"
                  style={{
                    background: "linear-gradient(to bottom, #f9fafb, #e5e7eb)",
                    boxShadow: `0px 2px 8px 0px color-mix(in srgb, var(--color-brand-900) 20%, transparent)`,
                  }}
                >
                  <div
                    className="h-[80px] relative rounded-[26px]"
                    style={{ background: `linear-gradient(to bottom, var(--color-brand-300), var(--color-brand-600))` }}
                  >
                    <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
                      <div className="content-stretch flex flex-col items-center justify-center p-[5px] relative size-full">
                        <div
                          className="flex-1 min-h-px min-w-px relative rounded-[21px] w-full"
                          style={{ background: `linear-gradient(to top, var(--color-brand-300), var(--color-brand-500))` }}
                        >
                          <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
                            <div className="content-stretch flex flex-col items-center justify-center p-[10px] relative size-full">
                              <div className="flex flex-col items-center justify-center gap-[2px]">
                                <div className="relative shrink-0 size-[32px]">
                                  <div className="absolute inset-[0_0_-3.12%_0]">
                                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32.9999">
                                      <g>
                                        <g filter="url(#filter0_di_bottom_nav)">
                                          <path d={svgPaths.p948ce00} shapeRendering="crispEdges" stroke="var(--color-brand-900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
                                        </g>
                                      </g>
                                      <defs>
                                        <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="31.9999" id="filter0_di_bottom_nav" width="32" x="0" y="1">
                                          <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                          <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                          <feOffset dy="1" />
                                          <feGaussianBlur stdDeviation="1" />
                                          <feComposite in2="hardAlpha" operator="out" />
                                          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0" />
                                          <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow" />
                                          <feBlend in="SourceGraphic" in2="effect1_dropShadow" mode="normal" result="shape" />
                                          <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                          <feOffset dy="1" />
                                          <feGaussianBlur stdDeviation="1.5" />
                                          <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
                                          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.7 0" />
                                          <feBlend in2="shape" mode="normal" result="effect2_innerShadow" />
                                        </filter>
                                      </defs>
                                    </svg>
                                  </div>
                                </div>
                                <span
                                  className="font-medium text-[12px] text-center leading-normal whitespace-nowrap"
                                  style={{ color: "var(--color-brand-900)", textShadow: "0px 1px 2px rgba(255,255,255,0.4)" }}
                                >
                                  Pay
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      aria-hidden="true"
                      className="absolute border border-solid inset-0 pointer-events-none rounded-[26px] shadow-[0px_0px_0px_2px_#e5e7eb] dark:shadow-[0px_0px_0px_2px_rgba(255,255,255,0.1)]"
                      style={{ borderColor: "var(--color-brand-600)" }}
                    />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
