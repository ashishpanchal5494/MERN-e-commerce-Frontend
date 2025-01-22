import React from "react";
import completeLogo from "../../src/images/icons/cmpted_logo.png";
import { Link } from "react-router-dom";

function Thankyou() {
  return (
    <div>
      <div className="thank-you-area">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-8">
              <div className="inner_complated">
                <div className="img_cmpted flex text-center justify-center">
                  <img src={completeLogo} alt="complete" />
                </div>
                <p className="dsc_cmpted text-xl">
                  Thank you for ordering in our store. You will receive a
                  confirmation email shortly.
                </p>
                <div className="btn_cmpted">
                  <Link to="/store" className="shop-btn" title="Go To Shop">
                    Continue Shopping
                  </Link>
                </div>
              </div>
              <div className="main_quickorder text-align-center">
                <h3 className="title">Call Us for Quick Order</h3>
                <div className="cntct typewriter-effect">
                  <span className="call_desk">
                    <Link to="tel:+01234567890" id="typewriter_num">
                      01 234 567 890
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Thankyou;
