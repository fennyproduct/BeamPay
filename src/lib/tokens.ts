

export const tokens = {

  light: {

    bg:              "bg-white",

    surface:         "bg-zinc-100",

    border:          "border-zinc-200",

    textPrimary:     "text-zinc-900",

    textSecondary:   "text-zinc-500",

    brandCta:        "bg-brand-500",       // #A6E500 — compensated for light

    brandAccent:     "bg-brand-400",       // #C6FE1E

    brandSubtle:     "bg-brand-200",       // #EBFF91

    textOnBrand:     "text-zinc-900",

  },

  dark: {

    bg:              "bg-[#0D1500]",

    surface:         "bg-white/[0.04]",    // rgba(255,255,255,0.04)

    border:          "border-white/[0.08]",

    textPrimary:     "text-zinc-50",

    textSecondary:   "text-zinc-400",

    brandCta:        "bg-brand-400",       // #C6FE1E — base brand

    brandAccent:     "bg-brand-300",       // #D9FF51

    brandSubtle:     "bg-brand-900",       // #415C0B

    textOnBrand:     "text-zinc-900",

  },

} as const;

// Utility: returns both light and dark class together (dark: prefix)

export const t = {

  bg:            "bg-white dark:bg-[#0D1500]",

  surface:       "bg-zinc-100 dark:bg-white/[0.04]",

  border:        "border-zinc-200 dark:border-white/[0.08]",

  textPrimary:   "text-zinc-900 dark:text-zinc-50",

  textSecondary: "text-zinc-500 dark:text-zinc-400",

  brandCta:      "bg-brand-500 dark:bg-brand-400",

  brandAccent:   "bg-brand-400 dark:bg-brand-300",

  brandSubtle:   "bg-brand-200 dark:bg-brand-900",

  textOnBrand:   "text-zinc-900",

};
