import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import SingleProductCard from "../components/SingleProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/product/productSlice";

function OurStore() {
  const [grid, setGrid] = useState(4);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const productState = useSelector((state) => state?.product?.product);
  console.log(productState);

  return (
    <>
      <Meta title="Our Store" />
      <BreadCrumb title="Our Store" />

      <div className="py-16 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex flex-wrap -mx-4">
            <aside className="lg:w-1/4 w-full px-4">
              <div className=" p-6 border-[2.5px] border-gray-300 rounded-lg  space-y-8">
                <div>
                  <h4 className="font-semibold text-gray-700 text-xl border-b-[2.5px] border-gray-300 pb-3 mt-8 mb-4">
                    Top Categories
                  </h4>
                  <ul className="space-y-2">
                    {[
                      "All (65)",
                      "Computer (12)",
                      "Covid-19 (22)",
                      "Electronics (19)",
                      "Frame Sunglasses (17)",
                      "Furniture (7)",
                      "Genuine Leather (9)",
                    ].map((item, index) => (
                      <li key={index}>
                        <a
                          href="#"
                          className="flex justify-between text-lg font-thin text-gray-500 hover:text-blue-500"
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold  text-gray-700 text-xl border-b-[2.5px] border-gray-300 pb-3 mt-8 mb-4">
                    Price Filter
                  </h4>
                  <div className="text-lg">$23 - $65</div>
                  <input
                    type="range"
                    className="w-full text-gray-300 border-none px-4 py-2 rounded"
                    placeholder="Add Your Price"
                  />
                </div>

                <div>
                  <h4 className="font-semibold  text-gray-700 text-xl border-b-[2.5px] border-gray-300 pb-3 mt-8 mb-4">
                    Color
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {Array.from({ length: 8 }, (_, i) => (
                      <span
                        key={i}
                        className="w-6 h-6 inline-block rounded-full bg-gray-400"
                      ></span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold  text-gray-700 text-xl border-b-[2.5px] border-gray-300 pb-3 mt-8 mb-4">
                    Sizes
                  </h4>
                  <ul className="space-y-2">
                    {["All", "S", "M", "L", "XL"].map((size, index) => (
                      <li key={index}>
                        <a
                          href="#"
                          className="flex justify-between text-gray-700 hover:text-blue-500"
                        >
                          {size}{" "}
                          <span>({Math.floor(Math.random() * 25) + 5})</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>

            <main className="lg:w-3/4 w-full px-4">
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-500 text-lg border-[2.5px] border-gray-300 py-[13px] px-4 rounded-lg">
                  Showing <span className="text-blue-600">12</span> of{" "}
                  <span className="text-blue-600">30</span> Products
                </p>

                <div className="flex items-center space-x-4 border-[2.5px] py-[10px] px-3 rounded-lg border-gray-300">
                  <p className="text-gray-500 text-lg">Sort By:</p>
                  <select className="  py-2">
                    <option value="default" className="text-gray-500 text-xl">
                      Default
                    </option>
                    <option value="name-asc">Name, A to Z</option>
                    <option value="name-desc">Name, Z to A</option>
                    <option value="price-asc">Price, Low to High</option>
                    <option value="price-desc">Price, High to Low</option>
                  </select>
                </div>
              </div>

              <div
                className={`grid gap-6 ${
                  grid === 4 ? "grid-cols-4" : "grid-cols-3"
                } sm:grid-cols-3`}
              >
                {productState &&
                  productState?.map((product) => (
                    <SingleProductCard key={product.id} product={product} />
                  ))}
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default OurStore;
