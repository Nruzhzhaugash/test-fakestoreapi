import { ProductProps } from "./props";

export default function Product(item: ProductProps) {
  const { image, title, description, price, category } = item;

  return (
    <div className="flex gap-20">
      <div className="border-[1px] border-solid border-black p-10 w-full">
        <div
          className="image-solo"
          style={{ backgroundImage: `url(${image})` }}
        />
      </div>
      <div className="right__solo flex-col">
        <h1 className="text-xl mb-5">{title}</h1>
        <div className="flex gap-2.5 mb-4">
          <span className="text-md">{price}$</span>
          <span className="text-[18px] line-through text-gray-600">
            {Math.floor(price * 0.8)}$
          </span>
        </div>
        <h3 className="text-md mb-5">{category}</h3>
        <p className="text-lg">{description}</p>
      </div>
    </div>
  );
};
