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

function Blog() {
  const dispatch = useDispatch();
  const blogState = useSelector((state) => state.blog.blogs);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState(blogState);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [archives, setArchives] = useState([]);
  const [selectedArchive, setSelectedArchive] = useState("");

  // Fetch blogs on mount
  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch]);

  const randomRecentPosts = () => {
    const shuffled = [...blogState].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 4); // Get the top 4 random posts
  };

  // Filter blogs based on search term
  useEffect(() => {
    setFilteredBlogs(
      blogState.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
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
  };

  // Filter blogs by selected archive year
  const handleArchiveChange = (archive) => {
    setSelectedArchive(archive);
    setFilteredBlogs(
      blogState.filter((blog) => (archive ? blog.date.includes(archive) : true))
    );
  };

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
                  {filteredBlogs.map((blog) => (
                    <BlogCard blog={blog} key={blog.id} />
                  ))}
                </div>

                {/* Pagination */}
                <div className="pro-pagination-style text-center mt-8">
                  <div className="pages">
                    <ul className=" ml-60 flex justify-center space-x-4">
                      <li className="border-[2.5px] border-gray-300 p-3 rounded-xl">
                        <div className="page-link">
                          <FaAngleLeft size={20} />
                        </div>
                      </li>
                      <li className="border-[2.5px] border-gray-300 py-3 px-4 rounded-xl">
                        <div className="page-link active">1</div>
                      </li>
                      <li className="border-[2.5px] border-gray-300 py-3 px-4 rounded-xl">
                        <div className="page-link">2</div>
                      </li>
                      <li className="border-[2.5px] border-gray-300 py-3 px-4 rounded-xl">
                        <div className="page-link">3</div>
                      </li>
                      <li className="border-[2.5px] border-gray-300 p-3 rounded-xl">
                        <div className="page-link ">
                          <FaAngleRight size={20} />
                        </div>
                      </li>
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
                          <a
                            href="#"
                            onClick={() => handleCategoryChange("")}
                            className="text-gray-900"
                          >
                            All Categories
                          </a>
                        </li>
                        {categories.map((category, index) => (
                          <li key={index}>
                            <a
                              href="#"
                              onClick={() => handleCategoryChange(category)}
                              className="text-gray-900"
                            >
                              {category}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="sidebar-widget  mb-8">
                    <h3 className="sidebar-title text-xl font-semibold mb-4 mt-16 text-gray-700 border-b-[2.5px] pb-6 border-gray-300  ">
                      Recent Posts
                    </h3>
                    {randomRecentPosts().map((post, index) => (
                      <div key={index} className="recent-single-post flex mb-4">
                        <div className="thumb-side mr-4">
                          <a href="blog-single-left-sidebar.html">
                            <img
                              src={post.images?.[0].url}
                              alt="Recent Post"
                              className="w-32 h-28 object-cover rounded"
                            />
                          </a>
                        </div>
                        <div className="media-side">
                          <span className="date text-lg text-gray-900 flex gap-2">
                            <SlCalender color="#266BF9" size={18} />
                            {moment(post?.createdAt).format(
                              "MMMM Do YYYY, h:mm a"
                            )}
                          </span>
                          <h5 className="text-lg font-semibold">
                            <a
                              href="blog-single-left-sidebar.html"
                              className="text-gray-900"
                            >
                              {post.title}
                            </a>
                          </h5>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Archives */}
                  <div className="sidebar-widget mb-8">
                    <h3 className="sidebar-title text-xl font-semibold mb-4 mt-16 text-gray-700 border-b-[2.5px] pb-6 border-gray-300">
                      Archives
                    </h3>
                    <div className="category-post">
                      <ul className="list-none text-lg flex gap-3 flex-col">
                        {archives.map((archive, index) => (
                          <li key={index}>
                            <a
                              href="#"
                              onClick={() => handleArchiveChange(archive)}
                              className="text-gray-900"
                            >
                              {archive}
                            </a>
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
