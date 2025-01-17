import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";
import compare from "../images/compare.svg";
import favorite from "../images/wishlist.svg";
import cart from "../images/cart.svg";
import { FaUser } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/product/productSlice";
import { Typeahead } from "react-bootstrap-typeahead";
import { getUserCart } from "../features/user/userSlice";

function Header() {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state?.auth?.cartProducts);
  const authState = useSelector((state) => state?.auth);
  const productState = useSelector((state) => state.product.product);
  const [searchQuery, setSearchQuery] = useState("");
  const [productOpt, setProductOpt] = useState([]);

  const navigate = useNavigate();
  const [total, setTotal] = useState(null);

  useEffect(() => {
    if (authState?.user) {
      dispatch(getUserCart());
    }
  }, [dispatch, authState?.user]);

  useEffect(() => {
    if (cartState && cartState.length) {
      let sum = 0;
      for (let index = 0; index < cartState.length; index++) {
        sum +=
          Number(cartState[index]?.quantity) * Number(cartState[index]?.price);
      }
      setTotal(sum);
    } else {
      setTotal(0);
    }
  }, [cartState]);

  useEffect(() => {
    if (productState && productState.length) {
      const data = productState.map((element, index) => ({
        id: index,
        prod: element?._id,
        name: element?.title,
      }));
      setProductOpt(data);
    }
  }, [productState]);

  const handleSearchChange = (selected) => {
    if (selected && selected.length > 0) {
      navigate(`/product/${selected[0]?.prod}`);
      dispatch(getAllProducts(selected[0]?.prod));
      setSearchQuery("");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div>
      <header className="header-top-strip py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6 ">
              <p className="text-[#CFD4DF] mb-0">
                Free Shopping Over $100 & Free Returns
              </p>
            </div>
            <div className="col-6">
              <div className="flex justify-end gap-10">
                <FaPhoneAlt size={20} color="#266BF9" />
                <a
                  className="text-[#CFD4DF]"
                  href="tel:+91 7060839220"
                  style={{
                    borderRight: "1px solid #454545",
                    paddingRight: "10px",
                  }}
                >
                  +9170 6083 9220
                </a>

                <MdOutlineEmail size={25} color="#266BF9" />
                <a
                  className="text-[#CFD4DF]"
                  href="mailto:ashishpanchal199@gmail.com"
                  style={{
                    borderRight: "1px solid #454545",
                    paddingRight: "10px",
                  }}
                >
                  ashishpanchal199@gmail.com
                </a>
                <FaUser size={20} color="#266BF9" />
                <Link
                  to={authState?.user === null ? "/login" : "/my-profile"}
                  className="text-[#CFD4DF] capitalize"
                >
                  {authState?.user === null ? (
                    <p className="mb-0">
                      Log in <br /> My Account
                    </p>
                  ) : (
                    <p className="mb-0">Welcome {authState?.user?.firstname}</p>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-upper py-3 pb-0">
        <div className="container-xxl">
          <div className="row align-item-conter">
            <div className="col-2">
              <h1>
                <Link className="text-[#266BF9] font-semibold text-3xl p-2">
                  Vishwa<span className="text-white">karma</span>
                </Link>
              </h1>
            </div>
            <div className="col-5">
              <div className="input-group ">
                <Typeahead
                  id="pagination-example"
                  onPaginate={() => console.log("Results paginated")}
                  onChange={handleSearchChange}
                  options={productOpt}
                  labelKey={"name"}
                  minLength={2}
                  style={{ width: "450px", position: "absolute" }}
                  placeholder="Search for Products here..."
                  selected={searchQuery ? [searchQuery] : []}
                  onInputChange={(input) => setSearchQuery(input)}
                />
                <span
                  className="input-group-text p-3 border-none relative right-10"
                  id="basic-addon2"
                >
                  <BsSearch color="white" className="fs-6 " />
                </span>
              </div>
            </div>
            <div className="col-5">
              <div className="header-upper-links d-flex align-item-center justify-content-end gap-12">
                <div>
                  <Link
                    to="/compare"
                    className="d-flex align-items-center gap-10  text-white"
                  >
                    <img src={compare} alt="compare" />
                    <p>
                      Compare <br />
                      Products
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to="/wishlist"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={favorite} alt="wishlist" />
                    <p>
                      Favourite <br /> wishlist
                    </p>
                  </Link>
                </div>

                <div>
                  <Link
                    to="/cart"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={cart} alt="cart" />
                    <div className="d-flex flex-column">
                      <span className="badge bg-white text-dark">
                        {cartState && cartState?.length ? cartState?.length : 0}
                      </span>
                      <p className="mb-0">$ {total ? total : 0}</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <header className="header-bottom w-[92%] mt-4 ml-14 py-2">
          <div className="container-xxl">
            <div className="row">
              <div className="col-12">
                <div className="menu-bottom d-flex align-items-center justify-center gap-30">
                  <div className="menu-links">
                    <div className="flex gap-12 p-2 ">
                      <div className="flex gap-12 mt-1">
                        <NavLink className="text-lg" to="/">
                          Home
                        </NavLink>
                        <NavLink to="/store">Our Store</NavLink>
                        <NavLink to="/blogs">Blogs</NavLink>
                        <NavLink to="/about">About</NavLink>
                        <NavLink to="contact">Contact</NavLink>
                        <NavLink to="my-orders">Orders</NavLink>
                      </div>
                      <button
                        onClick={handleLogout}
                        className=" text-white text-uppercase"
                        type="button"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </header>
    </div>
  );
}

export default Header;
