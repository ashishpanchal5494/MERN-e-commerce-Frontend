import React from "react";
import { Link } from "react-router-dom";

function BlogCard() {
  return (
    <div className="blog-card">
      <div className="card-image">
        <img className="img-fluid w-100" src="images/blog-1.jpg" alt="blog" />
      </div>
      <div className="blog-content">
        <p className="date">1 Dec, 2024</p>
        <h5 className="title">A beautiful sunday morning renaissance</h5>
        <p className="decs">
          Lorem klfds sjklgfjl asdjklaf asdkl;a ajsopj jjasjka askdljsaf
        </p>
        <Link to="/blog/:id" className="button">
          Read more
        </Link>
      </div>
    </div>
  );
}

export default BlogCard;
