import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import GoogleAnalytics from "../analytics/GoogleAnalytics";
import FloatingWhatsappButton from "../whatsapp/FloatingWhatsappButton";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col relative bg-background text-foreground">
      <GoogleAnalytics />
      <Header />
      <main className={`flex-1 w-full ${isHome ? "pt-0" : "pt-[64px] lg:pt-[80px]"}`}>
        {children}
      </main>
      <Footer />
      <FloatingWhatsappButton />
    </div>
  );
}
