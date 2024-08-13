import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";

function ProductCard({ grid }) {
  const location = useLocation();
  return (
    <>
      <div
        className={`${location.pathname == "/store" ? `gr-${grid}` : `col-3`}`}
      >
        <Link to="/product/:id" className="product-card position-relative">
          <div className="wishlist-icon position-absolute">
            <Link>
              <img src="images/wish.svg" alt="wishlist" />
            </Link>
          </div>
          <div className="product-image">
            <img
              className="img-fluidS"
              src="images/watch.jpg"
              alt="product image"
            />
            <img
              className="img-fluidS"
              src="images/watch.jpg"
              alt="product image"
            />
          </div>
          <div className="product-details">
            <h6 className="brand">Hevels</h6>
            <h5 className="product-title">
              kids headphones bulk 10 pack multi colored for students
            </h5>
            <ReactStars
              count={5}
              size={24}
              value={3}
              edit={false}
              activeColor="#ffd700"
            />
            <p className={`description ${grid === 12 ? `d-block` : `d-none`}`}>
              lor
            </p>
            <p className="price">$100.00</p>
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
      <div
        className={`${location.pathname == "/store" ? `gr-${grid}` : `col-3`}`}
      >
        <Link className="product-card position-relative">
          <div className="wishlist-icon position-absolute">
            <Link>
              <img src="images/wish.svg" alt="wishlist" />
            </Link>
          </div>
          <div className="product-image">
            <img
              className="img-fluidS"
              src="images/watch.jpg"
              alt="product image"
            />
            <img
              className="img-fluidS"
              src="images/watch.jpg"
              alt="product image"
            />
          </div>
          <div className="product-details">
            <h6 className="brand">Hevels</h6>
            <h5 className="product-title">
              kids headphones bulk 10 pack multi colored for students
            </h5>
            <ReactStars
              count={5}
              size={24}
              value={3}
              edit={false}
              activeColor="#ffd700"
            />
            <p className="price">$100.00</p>
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
      <div
        className={`${location.pathname == "/store" ? `gr-${grid}` : `col-3`}`}
      >
        <Link className="product-card position-relative">
          <div className="wishlist-icon position-absolute">
            <Link>
              <img src="images/wish.svg" alt="wishlist" />
            </Link>
          </div>
          <div className="product-image">
            <img
              className="img-fluidS"
              src="images/watch.jpg"
              alt="product image"
            />
            <img
              className="img-fluidS"
              src="images/watch.jpg"
              alt="product image"
            />
          </div>
          <div className="product-details">
            <h6 className="brand">Hevels</h6>
            <h5 className="product-title">
              kids headphones bulk 10 pack multi colored for students
            </h5>
            <ReactStars
              count={5}
              size={24}
              value={3}
              edit={false}
              activeColor="#ffd700"
            />
            <p className="price">$100.00</p>
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
      <div
        className={`${location.pathname == "/store" ? `gr-${grid}` : `col-3`}`}
      >
        <Link className="product-card position-relative">
          <div className="wishlist-icon position-absolute">
            <Link>
              <img src="images/wish.svg" alt="wishlist" />
            </Link>
          </div>
          <div className="product-image">
            <img
              className="img-fluidS"
              src="images/watch.jpg"
              alt="product image"
            />
            <img
              className="img-fluidS"
              src="images/watch.jpg"
              alt="product image"
            />
          </div>
          <div className="product-details">
            <h6 className="brand">Hevels</h6>
            <h5 className="product-title">
              kids headphones bulk 10 pack multi colored for students
            </h5>
            <ReactStars
              count={5}
              size={24}
              value={3}
              edit={false}
              activeColor="#ffd700"
            />
            <p className="price">$100.00</p>
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
