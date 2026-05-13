import type { Metadata } from "next";
import LeadChatbot from "./components/LeadChatbot";
import "./globals.css";

export const metadata: Metadata = {
  title: "FaithTourTravel",
  description:
    "Custom travel packages, curated destinations, and reliable tour planning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        {children}
        <LeadChatbot />
      </body>
    </html>
  );
}
