import { Google_Sans_Flex } from "next/font/google";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Navbar } from "@/components/shared/Navbar";
import "../globals.css";

const googleSansFlex = Google_Sans_Flex({
  subsets: ["latin"],
  variable: "--font-google",
  display: 'swap',
});

export const metadata = {
  title: "Gabriel Gama",
  description: "Explorer and Software Engineer",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${googleSansFlex.variable} antialiased bg-background text-foreground min-h-screen`}
      >
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}