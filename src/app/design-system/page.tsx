"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose,
} from "@/components/ui/dialog";
import {
  Drawer, DrawerTrigger, DrawerClose, DrawerContent,
} from "@/components/ui/drawer";
import { Copy, Check, Search, ChevronRight, Send, Download, Plus, QrCode, Users, Eye, EyeOff, ArrowLeftRight } from "lucide-react";
import { useState } from "react";

/* ─── helpers ─── */

function Section({ id, title, description, children }: { id: string; title: string; description?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-8 border-b border-border px-8 py-12">
      <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
      {description && <p className="mt-1 text-sm text-muted-foreground max-w-2xl">{description}</p>}
      <div className="mt-8">{children}</div>
    </section>
  );
}

function Swatch({ name, hex, variable, style }: { name: string; hex: string; variable?: string; style?: React.CSSProperties }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      className="group flex flex-col gap-1.5 text-left"
      onClick={() => { navigator.clipboard.writeText(hex); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
      title={`Copy ${hex}`}
    >
      <div
        className="h-16 w-full rounded-lg border border-border shadow-sm transition-transform group-hover:scale-105 relative"
        style={style ?? { backgroundColor: hex }}
      >
        {copied && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg">
            <Check className="h-4 w-4 text-white" />
          </div>
        )}
      </div>
      <span className="text-xs font-medium text-foreground">{name}</span>
      <span className="text-[10px] text-muted-foreground font-mono">{hex}</span>
      {variable && <span className="text-[10px] text-muted-foreground font-mono">{variable}</span>}
    </button>
  );
}

function Preview({ title, children, className }: { title?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-dashed border-border bg-muted/30 p-6 ${className ?? ""}`}>
      {title && <p className="text-xs font-medium text-muted-foreground mb-4 uppercase tracking-wider">{title}</p>}
      {children}
    </div>
  );
}

/* ─── data ─── */

const brandColors = [
  { name: "brand-50", hex: "#FBFFE4" },
  { name: "brand-100", hex: "#F6FFC4" },
  { name: "brand-200", hex: "#FFF9A3" },
  { name: "brand-300", hex: "#FFF861" },
  { name: "brand-400", hex: "#FFF233" },
  { name: "brand-500", hex: "#E6D800" },
  { name: "brand-600", hex: "#B3A800" },
  { name: "brand-700", hex: "#807800" },
  { name: "brand-800", hex: "#665F07" },
  { name: "brand-900", hex: "#554F0B" },
  { name: "brand-950", hex: "#332F00" },
];

const grayColors = [
  { name: "gray-50", hex: "#F7F8FA" },
  { name: "gray-100", hex: "#F1F3F5" },
  { name: "gray-200", hex: "#E4E7EB" },
  { name: "gray-400", hex: "#9BA1AB" },
  { name: "gray-950", hex: "#18181B" },
];

const semanticColors = [
  { name: "background", variable: "var(--background)", lightHex: "#FFFFFF", darkHex: "#0A0A0A" },
  { name: "foreground", variable: "var(--foreground)", lightHex: "#18181B", darkHex: "#FAFAFA" },
  { name: "primary", variable: "var(--primary)", lightHex: "hsl(57,100%,58%)", darkHex: "hsl(57,100%,69%)" },
  { name: "secondary", variable: "var(--secondary)", lightHex: "#27272A", darkHex: "#FFFFFF" },
  { name: "accent", variable: "var(--accent)", lightHex: "hsl(57,100%,69%)", darkHex: "hsl(57,100%,69%)" },
  { name: "destructive", variable: "var(--destructive)", lightHex: "#EF4444", darkHex: "#EF4444" },
  { name: "muted", variable: "var(--muted)", lightHex: "#F7F8FA", darkHex: "#262626" },
  { name: "border", variable: "var(--border)", lightHex: "#E4E7EB", darkHex: "#2E2E2E" },
  { name: "ring", variable: "var(--ring)", lightHex: "hsl(57,100%,69%)", darkHex: "hsl(57,100%,69%)" },
];

const typeSizes = [
  { name: "text-xs", size: "12px", sample: "The quick brown fox jumps over the lazy dog" },
  { name: "text-sm", size: "14px", sample: "The quick brown fox jumps over the lazy dog" },
  { name: "text-base", size: "16px", sample: "The quick brown fox jumps over the lazy dog" },
  { name: "text-lg", size: "18px", sample: "The quick brown fox jumps over the lazy dog" },
  { name: "text-xl", size: "20px", sample: "The quick brown fox jumps" },
  { name: "text-2xl", size: "24px", sample: "The quick brown fox" },
  { name: "text-3xl", size: "30px", sample: "The quick brown fox" },
  { name: "text-4xl", size: "36px", sample: "Quick brown fox" },
  { name: "text-5xl", size: "48px", sample: "BeamPay" },
];

const radiusTokens = [
  { name: "sm", value: "8px", class: "rounded-sm" },
  { name: "md", value: "10px", class: "rounded-md" },
  { name: "lg", value: "12px", class: "rounded-lg" },
  { name: "xl", value: "16px", class: "rounded-xl" },
  { name: "full", value: "9999px", class: "rounded-full" },
];

const spacingValues = [4, 8, 12, 16, 20, 24, 32, 48, 64];

const buttonVariants = ["default", "secondary", "destructive", "outline", "ghost", "link"] as const;
const buttonSizes = ["default", "lg", "xl", "icon"] as const;

const icons = [
  { name: "Copy", Icon: Copy },
  { name: "Check", Icon: Check },
  { name: "Search", Icon: Search },
  { name: "ChevronRight", Icon: ChevronRight },
  { name: "Send", Icon: Send },
  { name: "Download", Icon: Download },
  { name: "Plus", Icon: Plus },
  { name: "QrCode", Icon: QrCode },
  { name: "Users", Icon: Users },
  { name: "Eye", Icon: Eye },
  { name: "EyeOff", Icon: EyeOff },
  { name: "ArrowLeftRight", Icon: ArrowLeftRight },
];

/* ─── page ─── */

export default function DesignSystemPage() {
  return (
    <div>
      {/* ── Overview ── */}
      <Section id="overview" title="BeamPay Design System" description="A comprehensive reference for BeamPay's design tokens, UI components, and visual language. Built with Tailwind CSS v4, Radix UI, and DM Sans.">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Font Family</p>
            <p className="text-lg font-semibold">DM Sans</p>
            <p className="text-sm text-muted-foreground">Weights: 400, 500, 600</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Primary Color</p>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary border border-border" />
              <div>
                <p className="text-lg font-semibold">#FFF861</p>
                <p className="text-sm text-muted-foreground">Neon Yellow</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Mobile-First</p>
            <p className="text-lg font-semibold">430px</p>
            <p className="text-sm text-muted-foreground">Max container width</p>
          </div>
        </div>
      </Section>

      {/* ── Colors ── */}
      <Section id="colors" title="Color Palette" description="BeamPay's color system includes brand, neon, gray, and semantic token palettes.">
        {/* Brand */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold mb-1">Brand Palette</h3>
          <p className="text-sm text-muted-foreground mb-4">Primary brand colors from 50 (lightest) to 950 (darkest). Click to copy hex.</p>
          <div className="grid grid-cols-5 sm:grid-cols-11 gap-3">
            {brandColors.map((c) => (
              <Swatch key={c.name} name={c.name} hex={c.hex} variable={`--color-${c.name}`} />
            ))}
          </div>
        </div>

        {/* Gray */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold mb-1">Gray Palette</h3>
          <p className="text-sm text-muted-foreground mb-4">Neutral tones for text, backgrounds, and borders.</p>
          <div className="grid grid-cols-5 gap-3">
            {grayColors.map((c) => (
              <Swatch key={c.name} name={c.name} hex={c.hex} />
            ))}
          </div>
        </div>

        {/* Semantic */}
        <div>
          <h3 className="text-lg font-semibold mb-1">Semantic Tokens</h3>
          <p className="text-sm text-muted-foreground mb-4">Context-aware color tokens that adapt between light and dark themes.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="py-3 pr-4 font-medium text-muted-foreground">Token</th>
                  <th className="py-3 pr-4 font-medium text-muted-foreground">CSS Variable</th>
                  <th className="py-3 pr-4 font-medium text-muted-foreground">Preview</th>
                  <th className="py-3 pr-4 font-medium text-muted-foreground">Light</th>
                  <th className="py-3 font-medium text-muted-foreground">Dark</th>
                </tr>
              </thead>
              <tbody>
                {semanticColors.map((c) => (
                  <tr key={c.name} className="border-b border-border/50">
                    <td className="py-3 pr-4 font-mono text-xs">{c.name}</td>
                    <td className="py-3 pr-4 font-mono text-xs text-muted-foreground">{c.variable}</td>
                    <td className="py-3 pr-4">
                      <div className="h-8 w-8 rounded-md border border-border" style={{ backgroundColor: c.variable }} />
                    </td>
                    <td className="py-3 pr-4 font-mono text-xs text-muted-foreground">{c.lightHex}</td>
                    <td className="py-3 font-mono text-xs text-muted-foreground">{c.darkHex}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* ── Typography ── */}
      <Section id="typography" title="Typography" description="BeamPay uses DM Sans across all text elements with three weight levels.">
        {/* Weights */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold mb-4">Font Weights</h3>
          <div className="space-y-4">
            <div className="flex items-baseline gap-4">
              <span className="w-28 text-xs font-mono text-muted-foreground shrink-0">400 Regular</span>
              <p className="text-xl font-normal">The quick brown fox jumps over the lazy dog</p>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="w-28 text-xs font-mono text-muted-foreground shrink-0">500 Medium</span>
              <p className="text-xl font-medium">The quick brown fox jumps over the lazy dog</p>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="w-28 text-xs font-mono text-muted-foreground shrink-0">600 Semibold</span>
              <p className="text-xl font-semibold">The quick brown fox jumps over the lazy dog</p>
            </div>
          </div>
        </div>

        {/* Type scale */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Type Scale</h3>
          <div className="space-y-5">
            {typeSizes.map((t) => (
              <div key={t.name} className="flex items-baseline gap-4 border-b border-border/50 pb-4">
                <div className="w-28 shrink-0">
                  <span className="text-xs font-mono text-muted-foreground">{t.name}</span>
                  <span className="block text-[10px] font-mono text-muted-foreground/70">{t.size}</span>
                </div>
                <p className={`${t.name} font-medium text-foreground truncate`}>{t.sample}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Spacing & Radius ── */}
      <Section id="spacing-radius" title="Spacing & Border Radius" description="Consistent spacing and radius tokens for visual harmony.">
        {/* Radius */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold mb-4">Border Radius</h3>
          <div className="flex flex-wrap gap-6">
            {radiusTokens.map((r) => (
              <div key={r.name} className="flex flex-col items-center gap-2">
                <div className={`h-16 w-16 bg-primary/20 border-2 border-primary ${r.class}`} />
                <span className="text-xs font-medium">{r.name}</span>
                <span className="text-[10px] font-mono text-muted-foreground">{r.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Spacing */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Spacing Scale</h3>
          <div className="space-y-3">
            {spacingValues.map((s) => (
              <div key={s} className="flex items-center gap-4">
                <span className="w-16 text-xs font-mono text-muted-foreground text-right shrink-0">{s}px</span>
                <div className="h-5 bg-primary/30 rounded-sm" style={{ width: s * 2 }} />
                <span className="text-xs font-mono text-muted-foreground">p-{s / 4}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Shadows ── */}
      <Section id="shadows" title="Shadows" description="Elevation levels used across components for depth perception.">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { name: "shadow-sm", class: "shadow-sm" },
            { name: "shadow", class: "shadow" },
            { name: "shadow-md", class: "shadow-md" },
            { name: "shadow-lg", class: "shadow-lg" },
          ].map((s) => (
            <div key={s.name} className="flex flex-col items-center gap-3">
              <div className={`h-24 w-full rounded-xl bg-card border border-border ${s.class}`} />
              <span className="text-xs font-mono text-muted-foreground">{s.name}</span>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h3 className="text-sm font-semibold mb-3">Custom Shadows</h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col items-center gap-3">
              <div className="h-24 w-full rounded-xl bg-card shadow-[0px_8px_40px_0px_rgba(0,0,0,0.12)]" />
              <span className="text-[10px] font-mono text-muted-foreground text-center">0px 8px 40px rgba(0,0,0,0.12)</span>
              <span className="text-xs text-muted-foreground">Bottom nav / floating elements</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div
                className="h-24 w-full rounded-xl bg-card"
                style={{ boxShadow: "0px 2px 8px 0px color-mix(in srgb, var(--color-brand-900) 20%, transparent)" }}
              />
              <span className="text-[10px] font-mono text-muted-foreground text-center">brand-900 @ 20% opacity</span>
              <span className="text-xs text-muted-foreground">Pay button / brand-tinted shadow</span>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Buttons ── */}
      <Section id="buttons" title="Buttons" description="Button component with 6 variants and 4 size options. Built with class-variance-authority (CVA).">
        {/* Variant showcase */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider text-muted-foreground">Variants</h3>
          <div className="flex flex-wrap gap-3">
            {buttonVariants.map((v) => (
              <Button key={v} variant={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</Button>
            ))}
            <Button disabled>Disabled</Button>
          </div>
        </div>

        {/* Size showcase */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider text-muted-foreground">Sizes</h3>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="default">Default (h-9)</Button>
            <Button size="lg">Large (h-12)</Button>
            <Button size="xl">XL (h-14)</Button>
            <Button size="icon"><Plus /></Button>
          </div>
        </div>

        {/* Variant × Size matrix */}
        <div>
          <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider text-muted-foreground">Full Matrix</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-3 pr-4 text-left text-xs font-medium text-muted-foreground">Variant / Size</th>
                  {buttonSizes.map((s) => (
                    <th key={s} className="py-3 px-2 text-left text-xs font-medium text-muted-foreground">{s}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {buttonVariants.map((v) => (
                  <tr key={v} className="border-b border-border/50">
                    <td className="py-4 pr-4 text-xs font-mono">{v}</td>
                    {buttonSizes.map((s) => (
                      <td key={s} className="py-4 px-2">
                        <Button variant={v} size={s}>
                          {s === "icon" ? <Plus /> : v.charAt(0).toUpperCase() + v.slice(1)}
                        </Button>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* ── Cards ── */}
      <Section id="cards" title="Cards" description="Container component with header, content, and footer subcomponents.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Preview title="Basic Card">
            <Card>
              <CardHeader>
                <CardTitle>Wallet Balance</CardTitle>
                <CardDescription>Your current account balance and recent activity.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-semibold">$248.96</p>
                <p className="text-sm text-muted-foreground mt-1">+$200.00 today</p>
              </CardContent>
              <CardFooter className="gap-3">
                <Button size="default" variant="outline">Details</Button>
                <Button size="default">Transfer</Button>
              </CardFooter>
            </Card>
          </Preview>

          <Preview title="Minimal Card">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>AN</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Alex Nguyen</p>
                    <p className="text-sm text-muted-foreground">alex@beampay.com</p>
                  </div>
                  <Button variant="outline" size="icon" className="ml-auto">
                    <ChevronRight />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Preview>
        </div>
      </Section>

      {/* ── Badges ── */}
      <Section id="badges" title="Badges" description="Compact labels for status, categories, and counts.">
        <Preview>
          <div className="flex flex-wrap gap-3">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        </Preview>

        <div className="mt-6">
          <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">Contextual Usage</h3>
          <Preview>
            <div className="flex flex-wrap gap-3">
              <Badge variant="default">Completed</Badge>
              <Badge variant="outline">Pending</Badge>
              <Badge variant="destructive">Failed</Badge>
              <Badge variant="secondary">In Progress</Badge>
            </div>
          </Preview>
        </div>
      </Section>

      {/* ── Inputs ── */}
      <Section id="inputs" title="Inputs & Labels" description="Form input components with hover and focus interactions using neon accent.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Preview title="Default Input">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Enter your name" />
            </div>
          </Preview>

          <Preview title="With Value">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue="alex@beampay.com" />
            </div>
          </Preview>

          <Preview title="Disabled">
            <div className="space-y-2">
              <Label htmlFor="disabled">Account ID</Label>
              <Input id="disabled" value="BP-2024-001" disabled />
            </div>
          </Preview>

          <Preview title="With Icon Pattern">
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="search" placeholder="Search transactions..." className="pl-10" />
              </div>
            </div>
          </Preview>
        </div>
      </Section>

      {/* ── Avatars ── */}
      <Section id="avatars" title="Avatars" description="User identity display with image and fallback variants.">
        <Preview>
          <div className="flex items-center gap-6">
            {/* Sizes */}
            <div className="flex flex-col items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs">AN</AvatarFallback>
              </Avatar>
              <span className="text-[10px] text-muted-foreground">32px</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Avatar>
                <AvatarFallback>AN</AvatarFallback>
              </Avatar>
              <span className="text-[10px] text-muted-foreground">40px</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Avatar className="h-12 w-12">
                <AvatarFallback>AN</AvatarFallback>
              </Avatar>
              <span className="text-[10px] text-muted-foreground">48px</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="text-lg">AN</AvatarFallback>
              </Avatar>
              <span className="text-[10px] text-muted-foreground">64px</span>
            </div>

            <Separator orientation="vertical" className="h-16" />

            {/* With image */}
            <div className="flex flex-col items-center gap-2">
              <Avatar className="h-12 w-12">
                <AvatarImage src="https://api.dicebear.com/9.x/initials/svg?seed=AN" alt="AN" />
                <AvatarFallback>AN</AvatarFallback>
              </Avatar>
              <span className="text-[10px] text-muted-foreground">With image</span>
            </div>

            {/* Colored fallbacks */}
            <div className="flex flex-col items-center gap-2">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary text-primary-foreground">DS</AvatarFallback>
              </Avatar>
              <span className="text-[10px] text-muted-foreground">Branded</span>
            </div>
          </div>
        </Preview>
      </Section>

      {/* ── Selects ── */}
      <Section id="selects" title="Selects" description="Dropdown selection with Radix UI Select primitives.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Preview title="Basic Select">
            <div className="space-y-2">
              <Label>Currency</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">USD - US Dollar</SelectItem>
                  <SelectItem value="vnd">VND - Vietnamese Dong</SelectItem>
                  <SelectItem value="idr">IDR - Indonesian Rupiah</SelectItem>
                  <SelectItem value="usdt">USDT - Tether</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Preview>

          <Preview title="Country Select">
            <div className="space-y-2">
              <Label>Country</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vn">Vietnam</SelectItem>
                  <SelectItem value="id">Indonesia</SelectItem>
                  <SelectItem value="ph">Philippines</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Preview>
        </div>
      </Section>

      {/* ── Separators ── */}
      <Section id="separators" title="Separators" description="Visual dividers for content sections.">
        <Preview>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">Horizontal</p>
              <Separator />
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Vertical (in flex row)</p>
              <div className="flex items-center gap-4 h-10">
                <span className="text-sm">Home</span>
                <Separator orientation="vertical" />
                <span className="text-sm">Pay</span>
                <Separator orientation="vertical" />
                <span className="text-sm">Activities</span>
              </div>
            </div>
          </div>
        </Preview>
      </Section>

      {/* ── Dialogs ── */}
      <Section id="dialogs" title="Dialogs" description="Modal overlay for confirmations, forms, and important actions.">
        <Preview>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Transfer</DialogTitle>
                <DialogDescription>
                  Are you sure you want to send $50.00 to Alex Nguyen? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="gap-2 sm:gap-0">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button>Confirm</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Preview>
      </Section>

      {/* ── Drawers ── */}
      <Section id="drawers" title="Drawers" description="Bottom sheet for mobile-first interactions and contextual menus.">
        <Preview>
          <Drawer>
            <DrawerTrigger asChild>
              <Button>Open Drawer</Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto mb-4 h-1.5 w-[40%] rounded-full bg-muted-foreground/20" />
              <div className="px-1 pb-6">
                <h3 className="text-lg font-semibold mb-2">Transfer Options</h3>
                <p className="text-sm text-muted-foreground mb-6">Choose how you want to send money.</p>
                <div className="space-y-3">
                  {[
                    { icon: Send, label: "Bank Transfer", desc: "Send to a bank account" },
                    { icon: QrCode, label: "QR Payment", desc: "Scan or share QR code" },
                    { icon: ArrowLeftRight, label: "USDT Transfer", desc: "Send via blockchain" },
                  ].map((item) => (
                    <DrawerClose key={item.label} asChild>
                      <button className="w-full flex items-center gap-4 p-4 rounded-xl border border-border hover:bg-muted transition-colors text-left">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <item.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{item.label}</p>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                      </button>
                    </DrawerClose>
                  ))}
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </Preview>
      </Section>

      {/* ── Icons ── */}
      <section id="icons" className="scroll-mt-8 px-8 py-12">
        <h2 className="text-2xl font-semibold text-foreground">Icons</h2>
        <p className="mt-1 text-sm text-muted-foreground max-w-2xl">Lucide icons used across BeamPay. Default size: 20×20 (h-5 w-5).</p>
        <div className="mt-8 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
          {icons.map(({ name, Icon }) => (
            <div key={name} className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors">
              <Icon className="h-5 w-5 text-foreground" />
              <span className="text-[10px] text-muted-foreground text-center">{name}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
