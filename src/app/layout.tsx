import type { Metadata } from "next";
import "./globals.css";
import CustomThemeProvider from "@/components/TheamProvider";

export const metadata: Metadata = {
  title: "Cats Pro",
  description: "Cats Pro - List of Cats",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CustomThemeProvider>
          {children}
        </CustomThemeProvider>
      </body>
    </html>
  );
}
