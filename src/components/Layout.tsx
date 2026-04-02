import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import FloatingEnquiry from "./FloatingEnquiry";
import Seo, { type SeoProps } from "@/seo/Seo";
import ScrollToTopOnRoute from "./ScrollToTopOnRoute";

type LayoutProps = {
  children: ReactNode;
  seo?: SeoProps;
};

const Layout = ({ children, seo }: LayoutProps) => (
  <div className="min-h-screen flex flex-col">
    {seo && <Seo {...seo} />}
    <ScrollToTopOnRoute />
    <Header />
    <main className="flex-1">{children}</main>
    <Footer />
    <ScrollToTop />
    <FloatingEnquiry />
  </div>
);

export default Layout;
