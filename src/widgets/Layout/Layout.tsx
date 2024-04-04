import { Footer } from "./Footer";
import { Header } from "./Header";
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
