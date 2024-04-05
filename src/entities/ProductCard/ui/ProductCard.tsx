const ProductCard = ({ image, price, title, category }: ProductCardI) => {
  return (
    <>
      <div className="p-5 border-b-[2px] border-black border-solid ">
        <div
          className="image"
          style={{ backgroundImage: `url(${image})` }}
        />
      </div>
      <div className="wrapper">
        <h3 className="text-[15px]">{title}</h3>
        <div className="text-[12px] mt-[5px] mb-7">{category}</div>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-[5px]">
            <span className="text-dark">{price}$</span>
            <span className="line-through text-gray-600">
              {Math.floor(price * 0.8)}$
            </span>
          </div>

          <div className="leading-3 font-medium text-[10px] text-gray-600">
            {Math.floor(Math.random() * 20 + 1)} purchased
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
