import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import SingleProductCard from "../components/SingleProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/product/productSlice";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

function OurStore() {
  const [grid, setGrid] = useState(4);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 150000]);
  const [currentPage, setCurrentPage] = useState(1);
  const productPerPage = 9;

  const dispatch = useDispatch();
  const productState = useSelector((state) => state?.product?.product || []);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (productState) {
      setFilteredProducts(productState);
    }
  }, [productState]);

  // Search and Filter Logic
  useEffect(() => {
    const filtered = productState?.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        !selectedCategory || product.category === selectedCategory;

      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesPrice;
    });
    setFilteredProducts(filtered || []);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, productState, priceRange]);

  // Pagination Logic
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productPerPage);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category === "All" ? "" : category);
  };

  const handlePriceChange = (min, max) => {
    setPriceRange([min, max]);
  };

  return (
    <>
      <Meta title="Our Store" />
      <BreadCrumb title="Our Store" />

      <div className="py-16 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex flex-wrap -mx-4">
            {/* Sidebar */}
            <aside className="lg:w-1/4 w-full px-4">
              <div className="p-6 border-[2.5px] border-gray-300 rounded-lg space-y-8">
                {/* Categories */}
                <div>
                  <h4 className="font-semibold text-gray-700 text-xl border-b-[2.5px] border-gray-300 pb-3 mt-8 mb-4">
                    Top Categories
                  </h4>
                  <ul className="space-y-2">
                    {[
                      "All",
                      "Laptop",
                      "Speaker",
                      "Electronics",
                      "IPhone",
                      "Computer Accessories",
                    ].map((category, index) => (
                      <li key={index}>
                        <button
                          onClick={() => handleCategoryChange(category)}
                          className={`flex justify-between text-lg font-thin text-gray-500 hover:text-blue-500 ${
                            selectedCategory === category ? "text-blue-500" : ""
                          }`}
                        >
                          {category}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price Filter */}
                <div>
                  <h4 className="text-lg font-semibold mb-3">
                    Filter by Price
                  </h4>
                  <div className="flex items-center space-x-3">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange[0]}
                      onChange={(e) =>
                        handlePriceChange(Number(e.target.value), priceRange[1])
                      }
                      className="border rounded p-2 w-16"
                    />
                    <span>-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange[1]}
                      onChange={(e) =>
                        handlePriceChange(priceRange[0], Number(e.target.value))
                      }
                      className="border rounded p-2 w-16"
                    />
                  </div>
                </div>

                {/* Colors */}
                <div>
                  <h4 className="font-semibold text-gray-700 text-xl border-b-[2.5px] border-gray-300 pb-3 mt-8 mb-4">
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

                {/* Sizes */}
              </div>
            </aside>

            {/* Main Content */}
            <main className="lg:w-3/4 w-full px-4">
              {/* Sort and Products */}
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-500 text-lg border-[2.5px] border-gray-300 py-[13px] px-4 rounded-lg">
                  Showing{" "}
                  <span className="text-blue-600">
                    {Math.min(currentProducts.length, productPerPage)}
                  </span>{" "}
                  of{" "}
                  <span className="text-blue-600">
                    {filteredProducts.length}
                  </span>{" "}
                  Products
                </p>

                <div className="flex items-center space-x-4 border-[2.5px] py-[10px] px-3 rounded-lg border-gray-300">
                  <p className="text-gray-500 text-lg">Sort By:</p>
                  <select className="py-2">
                    <option value="default">Default</option>
                    <option value="name-asc">Name, A to Z</option>
                    <option value="name-desc">Name, Z to A</option>
                    <option value="price-asc">Price, Low to High</option>
                    <option value="price-desc">Price, High to Low</option>
                  </select>
                </div>
              </div>

              {/* Products Grid */}
              <div
                className={`grid gap-6 ${
                  grid === 4 ? "grid-cols-4" : "grid-cols-3"
                } sm:grid-cols-3`}
              >
                {currentProducts.map((product) => (
                  <SingleProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              <div className="pro-pagination-style text-center mt-8">
                <div className="pages">
                  <ul className="flex justify-center space-x-4">
                    <a
                      href="#"
                      className={`border-[2.5px] border-gray-300 p-3 rounded-xl ${
                        currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      onClick={() =>
                        currentPage > 1 && setCurrentPage(currentPage - 1)
                      }
                    >
                      <FaAngleLeft size={20} />
                    </a>
                    {Array.from({ length: totalPages }, (_, index) => (
                      <a
                        href="#"
                        key={index}
                        className={`border-[2.5px] border-gray-300 py-3 px-4 rounded-xl ${
                          currentPage === index + 1
                            ? "bg-gray-300"
                            : "cursor-pointer"
                        }`}
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        {index + 1}
                      </a>
                    ))}
                    <a
                      href="#"
                      className={`border-[2.5px] border-gray-300 p-3 rounded-xl ${
                        currentPage === totalPages
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      onClick={() =>
                        currentPage < totalPages &&
                        setCurrentPage(currentPage + 1)
                      }
                    >
                      <FaAngleRight size={20} />
                    </a>
                  </ul>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default OurStore;
