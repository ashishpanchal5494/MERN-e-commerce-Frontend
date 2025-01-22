import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserWishlist,
  getUserProductWishlist,
} from "../features/user/userSlice";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";

const Wishlist = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserProductWishlist());
  }, [dispatch]);

  const wishlistState = useSelector((state) => state?.auth?.wishlist?.wishlist);

  const removeFromWishlist = (id) => {
    dispatch(deleteUserWishlist(id));

    setTimeout(() => {
      dispatch(getUserProductWishlist());
    }, 300);
  };
  return (
    <>
      <Meta title={"Wishlist"} />
      <BreadCrumb title="Wishlist" />
      {/* <Container class1="wishlist-wrapper home-wrapper-2 py-5">
        <div className="row">
          {wishlistState && wishlistState.length === 0 && (
            <div className="text-center fs-3">No Data</div>
          )}
          {wishlistState &&
            wishlistState?.map((item, index) => {
              return (
                <div className="col-3" key={index}>
                  <div className="wishlist-card position-relative">
                    <img
                      onClick={() => {
                        removeFromWishlist(item?._id);
                      }}
                      src="images/cross.svg"
                      alt="cross"
                      className="position-absolute cross img-fluid"
                    />
                    <div className="wishlist-card-image bg-white">
                      <img
                        src={
                          item?.images[0].url
                            ? item?.images[0].url
                            : "images/watch.jpg"
                        }
                        className="img-fluid  d-block mx-auto"
                        alt="watch"
                        width={160}
                      />
                    </div>
                    <div className="py-3 px-3">
                      <h5 className="title">{item?.title}</h5>
                      <h6 className="price">$ {item?.price}</h6>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </Container> */}
      <div className="cart-main-area py-40">
        <div className="container">
          <h3 className="cart-page-title">Your cart items</h3>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <form action="#">
                <div className="table-content table-responsive cart-table-content">
                  <table>
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Product Name</th>
                        <th>Until Price</th>
                        <th>Qty</th>
                        <th>Subtotal</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {wishlistState && wishlistState.length === 0 && (
                        <div className="text-center flex justify-center fs-3">
                          No Data
                        </div>
                      )}
                      {wishlistState &&
                        wishlistState.map((item, index) => (
                          <tr key={index}>
                            <td className="product-thumbnail">
                              <Link>
                                <img
                                  className="img-responsive ml-15px"
                                  alt="wishlist"
                                  src={
                                    item?.images[0].url
                                      ? item?.images[0].url
                                      : "images/watch.jpg"
                                  }
                                />
                              </Link>
                            </td>
                            <td className="product-name">
                              <a href="#">{item?.title}</a>
                            </td>
                            <td className="product-price-cart">
                              <span className="amount">₹ {item?.price}</span>
                            </td>
                            <td className="product-quantity">
                              <div className="cart-plus-minus">
                                <input
                                  className="cart-plus-minus-box"
                                  type="text"
                                  name="qtybutton"
                                  value={item.quantity}
                                  readOnly
                                />
                              </div>
                            </td>
                            <td className="product-subtotal">
                              ₹ {item?.price}
                            </td>
                            <td>
                              <Link>
                                <MdDelete
                                  size={25}
                                  onClick={() => {
                                    removeFromWishlist(item._id);
                                  }}
                                />
                              </Link>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
