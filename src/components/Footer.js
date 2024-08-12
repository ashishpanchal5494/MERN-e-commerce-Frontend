import React from "react";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import { IoLogoInstagram } from "react-icons/io5";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import newsletter from "../images/newsletter.png";

function Footer() {
  return (
    <div>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-5">
              <div className="footer-top-data d-flex gap-30 align-items-center">
                <img src={newsletter} alt="newsletter" />
                <h2 className="mb-0 text-white">Sign up for Newsletter</h2>
              </div>
            </div>
            <div className="col-7">
              <div className="input-group ">
                <input
                  type="text"
                  className="form-control py-1"
                  placeholder="Your Email Address"
                  aria-label="Your Email Address"
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text p-2" id="basic-addon2">
                  Subscribe
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-4">
              <h4 className="text-white mb-4">Contact Us</h4>
              <div className="text-white fs-6">
                <address>
                  Hno. 277 Near Vill chopal, <br /> Sonipat, Haryana <br />
                  Pincode: 131103
                </address>
                <a
                  href="tel:+91 7060839220"
                  className="mt-3 d-block mb-1 text-white"
                >
                  +91 7060839220
                </a>
                <a
                  href="mailto:ashishpanchal199@gmail.com"
                  className="mt-4 d-block mb-3 text-white"
                >
                  ashishpanchal199@gmail.com
                </a>
                <div className="social-icons d-flex align-items-center gap-30 mt-4">
                  <a href="" alt="social media">
                    <FaLinkedin className="text-white fs-4" />
                  </a>
                  <a href="" alt="social media">
                    <IoLogoInstagram className="text-white fs-4" />
                  </a>
                  <a href="" alt="social media">
                    <FaGithub className="text-white fs-4" />
                  </a>
                  <a href="" alt="social media">
                    <FaYoutube className="text-white fs-4" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4">Information</h4>
              <div className="footer-links d-flex flex-column">
                <Link to="privacy-policy" className="text-white py-2 mb-1">
                  Privacy Policy
                </Link>
                <Link to="refund-policy" className="text-white py-2 mb-1">
                  Refund Policy
                </Link>
                <Link to="shipping-policy" className="text-white py-2 mb-1">
                  Shopping Policy
                </Link>
                <Link
                  to="terms-and-conditions"
                  className="text-white py-2 mb-1"
                >
                  Term & Conditions
                </Link>
                <Link to="blogs" className="text-white py-2 mb-1">
                  Blogs
                </Link>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4">Account</h4>
              <div className="footer-links d-flex flex-column">
                <Link className="text-white py-2 mb-1">About Us</Link>
                <Link className="text-white py-2 mb-1">FAQ</Link>
                <Link className="text-white py-2 mb-1">Contact</Link>
              </div>
            </div>
            <div className="col-2">
              <h4 className="text-white mb-4">Quick Links</h4>
              <div className="footer-links d-flex flex-column">
                <Link className="text-white py-2 mb-1">Laptops</Link>
                <Link className="text-white py-2 mb-1">Headphones</Link>
                <Link className="text-white py-2 mb-1">Tablets</Link>
                <Link className="text-white py-2 mb-1">Watchs</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className="text-center mb-0 text-white">
                &copy; {new Date().getFullYear()}; Powered by Developer
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
