import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToWishlist } from "../features/product/productSlice";

function ProductCard({ grid, data }) {
  const dispatch = useDispatch();

  const AddToProductWishlist = (id) => {
    console.log(id);
    dispatch(addToWishlist(id));
  };
  const location = useLocation();
  return (
    <>
      <div
        className={`${location.pathname === "/store" ? `gr-${grid}` : `col-3`}`}
      >
        <Link className="product-card position-relative">
          <div className="wishlist-icon position-absolute">
            <button
              className="border-0 bg-transparent"
              onClick={() => AddToProductWishlist(data?._id)}
            >
              <img src="images/wish.svg" alt="wishlist" />
            </button>
          </div>
          <div className="product-image">
            <img
              className="img-fluid"
              src={data?.images[0]?.url}
              alt="product"
            />
            <img
              className="img-fluid"
              src={data?.images[0]?.url}
              alt="product "
            />
          </div>
          <div className="product-details">
            <h6 className="brand">{data?.brand}</h6>
            <h5 className="product-title">{data?.title}</h5>
            <ReactStars
              count={5}
              size={24}
              value={data?.totalrating.toString()}
              edit={false}
              activeColor="#ffd700"
            />
            <p
              className={`description ${grid === 12 ? `d-block` : `d-none`}`}
              dangerouslySetInnerHTML={{ __html: data?.description }}
            ></p>
            <p className="price">₹{data?.price}</p>
          </div>
          <div className="action-bar position-absolute">
            <div className="d-flex flex-column gap-15">
              <Link>
                <img src="images/add-cart.svg" alt="cart" />
              </Link>
              <Link>
                <img src="images/view.svg" alt="cart" />
              </Link>
              <Link>
                <img src="images/prodcompare.svg" alt="cart" />
              </Link>
              {/* <Link>
              <img src="images/.svg" alt="cart" />
            </Link> */}
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

export default ProductCard;
