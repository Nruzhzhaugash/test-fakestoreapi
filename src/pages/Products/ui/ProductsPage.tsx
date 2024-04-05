"use client";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/lib/reduxHooks";
import { getProducts } from "@/shared/model/products/products";
import { ProductList } from "@/widgets/ProductList";
import { Button, Flex, Switch, Tabs } from "antd";
import type { ConfigProviderProps } from "antd";
import Loader from "@/shared/ui/Loader/Loader";
import { CreateProductList } from "@/widgets/createProductList";
import { useRouter } from "next/navigation";
import { ProductsTable } from "@/widgets/ProductTable";

const { TabPane } = Tabs;
type SizeType = ConfigProviderProps["componentSize"];

const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    products: { list },
  } = useAppSelector((state) => state);
  const [size] = useState<SizeType>("large");
  const [loading, setLoading] = useState<boolean>(true);
  const [displayedProducts, setDisplayedProducts] = useState<number>(8);
  const [activeTab, setActiveTab] = useState<string>("apiProducts");
  const [showPublishedOnly, setShowPublishedOnly] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getProducts());
      setLoading(false);
    };

    const timeout = setTimeout(fetchData, 1000);

    return () => clearTimeout(timeout);
  }, [dispatch, displayedProducts]);

  useEffect(() => {
    const savedShowPublishedOnly = localStorage.getItem("showPublishedOnly");
    if (savedShowPublishedOnly) {
      setShowPublishedOnly(savedShowPublishedOnly === "true");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("showPublishedOnly", String(showPublishedOnly));
  }, [showPublishedOnly]);

  useEffect(() => {
    const hash = window.location.hash.substr(1);
    setActiveTab(hash || "apiProducts");
  }, []);

  useEffect(() => {
    window.location.hash = `#${activeTab}`;
  }, [activeTab]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    router.push(`/products#${tab}`);
  };

  return (
    <section className="">
      <h1 className="text-xl">Products</h1>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-10">
          <Tabs
            defaultActiveKey="1"
            activeKey={activeTab}
            onChange={handleTabClick}
          >
            <TabPane tab="API Products" key="apiProducts">
              {activeTab === "apiProducts" && (
                <>
                  <h2 className="text-xl mb-10 whitespace-nowrap">
                    API Products
                  </h2>
                  <div className="grid mb-[30px] grid-cols-4 gap-10">
                    <ProductList amount={displayedProducts} products={list} />
                  </div>
                </>
              )}
            </TabPane>
            <TabPane tab="Created Products" key="createdProducts">
              <h2 className="text-xl mb-10 whitespace-nowrap">
                Created Products
              </h2>
              <div className="grid grid-cols-4 gap-10">
                {activeTab === "createdProducts" && (
                  <CreateProductList amount={displayedProducts} />
                )}
              </div>
            </TabPane>
            <TabPane tab="Products Table" key="tableProducts">
              <h1 className="text-xl mb-10 whitespace-nowrap">
                Products Table
              </h1>
              {activeTab === "tableProducts" && <ProductsTable />}
            </TabPane>
          </Tabs>
          <div>
            Show published only :
            <Switch
              checked={showPublishedOnly}
              onChange={(checked) => setShowPublishedOnly(checked)}
            />
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
