import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "BeamPay",
  description: "Your travel wallet for Southeast Asia",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="https://mcp.figma.com/mcp/html-to-design/capture.js" async></script>
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            var params = 'figmacapture=6dfd6522-0a1f-427a-a42e-037942bfc6c7&figmaendpoint=' + encodeURIComponent('https://mcp.figma.com/mcp/capture/6dfd6522-0a1f-427a-a42e-037942bfc6c7/submit') + '&figmaselector=*';
            if (!location.hash.includes('figmacapture')) {
              location.hash = params;
            }
          })();
        `}} />
      </head>
      <body
        className={`${dmSans.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
