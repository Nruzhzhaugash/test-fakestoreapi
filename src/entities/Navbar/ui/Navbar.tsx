import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex gap-[30px] justify-center items-center">
      <Link href={"/"} className="text-md hover:underline">
        Home
      </Link>
      <Link href={"/products"} className="text-md hover:underline">
        Products
      </Link>
      <Link href={"/createproduct"} className="text-md hover:underline">
        Create products
      </Link>
      <Link href={""} className="text-md hover:underline">
        All products
      </Link>
    </nav>
  );
};

export default Navbar;
