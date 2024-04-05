import Footer from "./Footer/ui/Footer";
import Header from "./Header/ui/Header";
import { LayoutProps } from "./props";

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
        {children}
      <Footer />
    </>
  );
}
