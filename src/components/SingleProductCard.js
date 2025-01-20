import React from "react";
import { BsCart2 } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { IoIosGitCompare } from "react-icons/io";
import { LuScanEye } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const SingleProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { _id, isNew, images, hoverImage, category, title, price } = product;

  return (
    <div>
      <div
        onClick={() => navigate(`/product/${_id}`)}
        className="product h-[450px] bg-white rounded-2xl border-3 border-[#E1E1E1] overflow-hidden group relative cursor-pointer"
      >
        {isNew && (
          <div className="badges absolute top-3 left-3">
            <span className="bg-red-500 text-black text-xs font-bold px-2 py-1 rounded">
              New
            </span>
          </div>
        )}

        <div className="thumb relative">
          <div className="block">
            <img
              src={images[0]?.url}
              alt={title}
              className="ml-4 w-400 p-2 h-64 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <img
              src={hoverImage}
              alt={title}
              className="absolute top-0 left-0 w-full h-64 object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        </div>

        <div className="content p-4">
          <span className="category text-gray-500 flex justify-center text-sm">
            <div className="hover:text-blue-500">{category}</div>
          </span>
          <h5 className="title text-lg font-semibold flex justify-center mt-2">
            <div className="hover:text-blue-500">
              {title.split(" ").slice(0, 10).join(" ")}...
            </div>
          </h5>
          <span className="price text-lg font-bold flex justify-center text-gray-500">
            ₹{price}
          </span>
        </div>

        <div className="actions flex justify-around p-4 border-gray-200 absolute bottom-0 left-0 right-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button
            title="Add To Cart"
            className="action text-gray-500 hover:text-blue-500"
          >
            <BsCart2 size={20} />
          </button>
          <button
            title="Wishlist"
            className="action text-gray-500 hover:text-red-500"
          >
            <CiHeart size={20} />
          </button>
          <button
            title="Quick view"
            className="action text-gray-500 hover:text-green-500"
          >
            <LuScanEye size={20} />
          </button>
          <button
            title="Compare"
            className="action text-gray-500 hover:text-yellow-500"
          >
            <IoIosGitCompare size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProductCard;
