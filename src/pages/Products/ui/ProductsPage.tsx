"use client";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/lib/reduxHooks";
import { getProducts } from "@/shared/model/products/products";
import { ProductList } from "@/widgets/ProductList";
import { Button, Flex } from "antd";
import type { ConfigProviderProps } from "antd";
import Loader from "@/shared/ui/Loader/Loader";
import { CreateProductList } from "@/widgets/createProductList";

type SizeType = ConfigProviderProps["componentSize"];

const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const {
    products: { list },
  } = useAppSelector((state) => state);
  const [size] = useState<SizeType>("large");
  const [loading, setLoading] = useState<boolean>(true);
  const [displayedProducts, setDisplayedProducts] = useState<number>(8);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getProducts());
      setLoading(false);
    };

    const timeout = setTimeout(fetchData, 1000);

    return () => clearTimeout(timeout);
  }, [dispatch, displayedProducts]);

  return (
    <section className="">
      <h1 className="text-xl">Products</h1>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-10">
          <div className="flex gap-25">
            <div className="grid pt-10 mb-[30px] grid-cols-4 gap-10">
              <ProductList amount={displayedProducts} products={list} />
            </div>
            <CreateProductList />
          </div>
          <Flex gap="15px" wrap="wrap" className="items-center justify-center">
            <Button
              value={size}
              type="primary"
              onClick={() => setDisplayedProducts(8)}
            >
              8 products
            </Button>
            <Button
              value={size}
              type="primary"
              onClick={() => setDisplayedProducts(16)}
            >
              16 products
            </Button>
            <Button
              value={size}
              type="primary"
              onClick={() => setDisplayedProducts(20)}
            >
              20 products
            </Button>
          </Flex>
        </div>
      )}
    </section>
  );
};

export default ProductsPage;
