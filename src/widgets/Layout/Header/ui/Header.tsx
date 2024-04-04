import { Navbar } from "@/entities/Navbar";

const Header = () => {
  return (
    <header className="py-6 container flex justify-between items-center">
      <div className="logo">
        <h1 className="text-md">Logo</h1>
      </div>
      <Navbar />
      <div className="flex gap-5">
        <h3 className="text-md">Войти</h3>
        <h4 className="text-md">Корзина</h4>
      </div>
    </header>
  );
};

export default Header;
