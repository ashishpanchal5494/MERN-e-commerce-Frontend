import React from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";

function ShippingPolicy() {
  return (
    <div>
      {" "}
      <Meta title={"Shipping Policy"} />
      <BreadCrumb title="Shipping Policy" />
      <div className="main-product-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6"></div>
            <div className="col-6"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShippingPolicy;
