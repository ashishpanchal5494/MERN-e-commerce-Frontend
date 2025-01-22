import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getABlog } from "../features/blog/blogSlice";
import Container from "../components/Container";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { SlCalender } from "react-icons/sl";
import { FaUser } from "react-icons/fa";
import moment from "moment";

function SingleBlog() {
  const blogState = useSelector((state) => state?.blog?.singleBlog);
  const location = useLocation();
  const getBlogId = location.pathname.split("/")[2];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getABlog(getBlogId));
  }, [dispatch, getBlogId]);

  return (
    <>
      <Meta title="Single Blog" />
      <BreadCrumb title="Single Blog" />
      <Container class1="blog-wrapper px-48 py-20">
        <div className="row">
          <div className="col-12">
            <div className="single-blog-card">
              <Link to="/blogs" className="d-flex align-items-center gap-10">
                <HiOutlineArrowLeft className="fs-4" /> Go back to Blogs
              </Link>

              <div className="">
                <img
                  src={blogState?.images[0].url}
                  className="img-fluid w-100 my-4 rounded-2xl"
                  alt="blog"
                />
              </div>
              <div className="flex items-center  gap-8 text-gray-500 text-sm my-8 mx-4">
                <span className="flex gap-2 text-black  text-xl">
                  <SlCalender color="#266BF9" size={25} />
                  {moment(blogState?.createdAt).format("MMMM Do YYYY, h:mm a")}
                </span>
                <span className="flex gap-2 text-black  text-xl">
                  <FaUser color="#266BF9" size={25} />
                  {blogState?.author}
                </span>
              </div>
              <h3 className="title text-4xl my-8">{blogState?.title}</h3>
              <p
                className="text-black "
                dangerouslySetInnerHTML={{
                  __html: blogState?.description,
                }}
              ></p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default SingleBlog;
