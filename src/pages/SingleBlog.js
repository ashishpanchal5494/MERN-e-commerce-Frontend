import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";

function SingleBlog() {
  return (
    <div>
      <Meta title={"Dynamic blog name"} />
      <BreadCrumb title="Dynamic blog name" />
      <div className="blog-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="single-blog-card">
                <Link to="/blogs" className="d-flex align-items-center gap-10">
                  <IoArrowBackSharp className="fs-4" /> Go Back to blogs
                </Link>
                <h3 className="title">A beautiful Sunday morning india</h3>
                <img
                  src="/images/blog-1.jpg"
                  className="img-fluid w-100 my-4"
                  alt="blog"
                />
                <p>
                  Troper, broke the news of her demise with a Facebook post. “It
                  is with profound sadness that I share the news of Susan
                  Wojcicki passing. My beloved wife of 26 years and mother to
                  our five children left us today after 2 years of living with
                  non-small cell lung cancer. Susan was not just my best friend
                  and partner in life, but a brilliant mind, a loving mother,
                  and a dear friend to many. Her impact on our family and the
                  world was immeasurable. We are heartbroken, but grateful for
                  the time we had with her. Please keep our family in your
                  thoughts as we navigate this difficult time,” he wrote, as
                  quoted by Hindustan Times report.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleBlog;
