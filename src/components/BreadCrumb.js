import React from "react";
import { Link } from "react-router-dom";

function BreadCrumb({ title }) {
  return (
    <div className="">
      <div className="container-xxl">
        <div>
          <div
            style={{
              backgroundImage: `url(${require("../images/about/breadcrunb-bg.webp")})`,

              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <p className=" flex text-center justify-center text-xl p-40">
              <Link className=" hover:text-[#266BF9]" to="/">
                Home &nbsp;
              </Link>
              <div className=" text-[#266BF9]">/ {title}</div>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BreadCrumb;
