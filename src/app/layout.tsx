import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Google AI Studio Learning",
  description: "Use Google AI Studio and Google Meet API/Embed to host meetings and extract summaries and to-do lists from Gemini AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}