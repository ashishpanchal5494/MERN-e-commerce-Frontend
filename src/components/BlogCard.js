import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { SlCalender } from "react-icons/sl";
import { FaUser } from "react-icons/fa";

function BlogCard({ blog }) {
  return (
    <div key={blog.id} className="single-blog bg-white flex">
      <div className="blog-image w-auto ">
        <a href={blog.link}>
          <img
            src={blog?.images?.[0]?.url}
            alt={blog.title}
            className="w-[600px] h-96 rounded-3xl"
          />
        </a>
      </div>
      <div className="blog-text p-6">
        <div className="flex items-center  gap-2 text-gray-500 text-sm mb-4">
          <span className="flex gap-2 text-base">
            <SlCalender
              color="#266BF9"
              size={30}
              style={{ marginTop: "8px" }}
            />
            {moment(blog?.createdAt).format("MMMM Do YYYY, h:mm a")}
          </span>
          <span>
            <a
              href="blog-grid.html"
              className="hover:text-blue-500 flex gap-2 text-base"
            >
              <FaUser color="#266BF9" size={20} />
              {blog.author}
            </a>
          </span>
        </div>
        <h5 className="text-2xl font-semibold p-2 mb-3">
          <a href={blog.link} className="hover:text-blue-500 transition">
            {blog.title.split(" ").slice(0, 2).join(" ")}...
          </a>
        </h5>
        <p className="text-gray-600 text-lg px-2 mb-4">
          {blog.description.split(" ").slice(0, 10).join(" ")}...
        </p>
        {/* <a
          href={blog.link}
          className="btn  bg-zinc-700 text-white text-xl font-bold py-3 px-14 rounded-2xl hover:bg-blue-700 transition"
        >
          Read More
        </a> */}
        <Link
          to={"/blog/" + blog.id}
          className="btn  bg-zinc-700 text-white text-xl font-bold py-3 px-14 rounded-2xl hover:bg-blue-700 transition"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}

export default BlogCard;
