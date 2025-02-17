import "./globals.css";
import Providers from "@/app/providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-screen">
      <body className="h-full w-full">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
