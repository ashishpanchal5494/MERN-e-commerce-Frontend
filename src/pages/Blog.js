import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import BlogCard from "../components/BlogCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../features/blog/blogSlice";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import moment from "moment";
import { Link } from "react-router-dom";

function Blog() {
  const dispatch = useDispatch();
  const blogState = useSelector((state) => state.blog.blogs);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState(blogState);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [archives, setArchives] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 4;

  // Fetch blogs on mount
  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch]);

  // Filter blogs based on search term
  useEffect(() => {
    setFilteredBlogs(
      blogState.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setCurrentPage(1);
  }, [searchTerm, blogState]);

  // Extract categories and archives from blog data
  useEffect(() => {
    const uniqueCategories = [
      ...new Set(blogState.map((blog) => blog.category)),
    ];
    setCategories(uniqueCategories);

    const uniqueArchives = [
      ...new Set(blogState.map((blog) => blog?.createdAt)),
    ];
    setArchives(uniqueArchives);
  }, [blogState]);

  // Filter blogs by selected category
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setFilteredBlogs(
      blogState.filter((blog) => (category ? blog.category === category : true))
    );
    setCurrentPage(1);
  };

  // Filter blogs by selected archive year

  // Pagination calculations
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  return (
    <>
      {" "}
      <Meta title={"Blog"} />
      <BreadCrumb title="Blog" />
      <div className="blog-list pb-24 pt-24 main-blog-page single-blog-page">
        <div className="container mx-auto">
          <div className="flex flex-wrap">
            <div className="lg:w-2/3 md:w-full order-1 lg:order-last">
              <div className="flex flex-wrap">
                <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
                  {currentBlogs.map((blog) => (
                    <BlogCard blog={blog} key={blog.id} />
                  ))}
                </div>

                {/* Pagination */}
                <div className="pro-pagination-style text-center mt-8">
                  <div className="pages">
                    <ul className="ml-60 flex justify-center space-x-4">
                      <a
                        href="#"
                        className={`border-[2.5px] border-gray-300 p-3 rounded-xl ${
                          currentPage === 1
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                        onClick={() =>
                          currentPage > 1 && setCurrentPage(currentPage - 1)
                        }
                      >
                        <FaAngleLeft size={20} />
                      </a>
                      {Array.from({ length: totalPages }, (_, index) => (
                        <a
                          href="#"
                          key={index}
                          className={`border-[2.5px] border-gray-300 py-3 px-4 rounded-xl ${
                            currentPage === index + 1
                              ? "bg-gray-300"
                              : "cursor-pointer"
                          }`}
                          onClick={() => setCurrentPage(index + 1)}
                        >
                          {index + 1}
                        </a>
                      ))}
                      <a
                        href="#"
                        className={`border-[2.5px] border-gray-300 p-3 rounded-xl ${
                          currentPage === totalPages
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                        onClick={() =>
                          currentPage < totalPages &&
                          setCurrentPage(currentPage + 1)
                        }
                      >
                        <FaAngleRight size={20} />
                      </a>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-[30%] md:w-full mt-12 mr-10 lg:mt-0">
              <div className="blog-sidebar">
                <div className="search-widget mb-8">
                  <form className="flex " action="#">
                    <input
                      className="w-full p-4 border-[2.5px] border-gray-300 rounded-xl"
                      placeholder="Search"
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                      type="submit"
                      className=" text-blue-600 relative right-9 "
                    >
                      <IoSearch size={20} />
                    </button>
                  </form>
                </div>

                <div className="border-[2.5px] border-gray-300 rounded-xl p-10">
                  <div className="sidebar-widget mb-8 ">
                    <h3 className="sidebar-title text-xl text-gray-700 border-b-[2.5px] pb-6 border-gray-300 font-semibold mb-4">
                      Categories
                    </h3>
                    <div className="category-post">
                      <ul className="list-none text-lg flex gap-3 flex-col">
                        <li>
                          <Link
                            onClick={() => handleCategoryChange("")}
                            className="text-gray-900"
                          >
                            All Categories
                          </Link>
                        </li>
                        {categories.slice(0, 5).map((category, index) => (
                          <li key={index}>
                            <Link
                              onClick={() => handleCategoryChange(category)}
                              className={`text-gray-900  hover:text-blue-500 ${
                                selectedCategory === category
                                  ? "text-blue-500"
                                  : ""
                              }`}
                            >
                              {category}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="sidebar-widget  mb-8">
                    <h3 className="sidebar-title text-xl font-semibold mb-4 mt-16 text-gray-700 border-b-[2.5px] pb-6 border-gray-300  ">
                      Recent Posts
                    </h3>
                    {blogState.slice(-4).map((post, index) => (
                      <Link
                        to={"/blog/" + post.id}
                        key={index}
                        className="recent-single-post flex mb-4"
                      >
                        <div className="thumb-side mr-4">
                          <div>
                            <img
                              src={post.images?.[0].url}
                              alt="Recent Post"
                              className="w-32 h-28 object-cover rounded"
                            />
                          </div>
                        </div>
                        <div className="media-side">
                          <span className="date text-lg text-gray-900 flex gap-2">
                            <SlCalender color="#266BF9" size={18} />
                            {moment(post?.createdAt).format(
                              "MMMM Do YYYY, h:mm a"
                            )}
                          </span>
                          <h5 className="text-lg font-semibold">
                            <div className="text-gray-900">
                              {post.title.split(" ").slice(0, 2).join(" ")}
                            </div>
                          </h5>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Archives */}
                  <div className="sidebar-widget mb-8">
                    <h3 className="sidebar-title text-xl font-semibold mb-4 mt-16 text-gray-700 border-b-[2.5px] pb-6 border-gray-300">
                      Archives
                    </h3>
                    <div className="category-post">
                      <ul className="list-none text-lg flex gap-3 flex-col">
                        {archives.slice(0, 3).map((archive, index) => (
                          <li key={index}>
                            <Link className="text-gray-900 text-center">
                              {archive.split("T")[0]}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Blog;
