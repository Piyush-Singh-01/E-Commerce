import { Link } from "react-router-dom";

import {FaGithub, FaLinkedin} from "react-icons/fa";

import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <Link
              to="/"
              className="text-2xl font-bold text-white"
            >
              Cartify
            </Link>

            <p className="mt-4 text-sm leading-6 text-gray-400 max-w-xs">
              Discover quality products at great prices.
              Shop easily and securely with Cartify.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-6">

              <a
                href="https://www.linkedin.com/in/piyush-singh-p9939/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Linkedin"
                className="text-gray-400 hover:text-white transition"
              >
                <FaLinkedin size={18} />
              </a>

              <a
                href="https://github.com/Piyush-Singh-01"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-gray-400 hover:text-white transition"
              >
                <FaGithub size={18} />
              </a>

            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Shop
            </h3>

            <ul className="space-y-3 text-sm">

              <li>
                <Link
                  to="/product"
                  className="hover:text-white transition"
                >
                  All Products
                </Link>
              </li>

              <li>
                <Link to="/product?category=mobile,laptop,watch"
                 className="hover:text-white transition" >
                  Electronics
                </Link>
              </li>

              <li>
                <Link
                  to = '/product?category=fashion'
                  className="hover:text-white transition"
                >
                  Fashion
                </Link>
              </li>

              <li>
                <Link
                  to="/product?category=shoes"
                  className="hover:text-white transition"
                >
                  Sports
                </Link>
              </li>

              <li>
                <Link
                  to="/product?category=beauty"
                  className="hover:text-white transition"
                >
                  Beauty
                </Link>
              </li>

            </ul>
          </div>


          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm">

              <li>
                <Link
                  to="/"
                  className="hover:text-white transition"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="hover:text-white transition"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="hover:text-white transition"
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  to="/wishlist"
                  className="hover:text-white transition"
                >
                  Wishlist
                </Link>
              </li>

              <li>
                <Link
                  to="/orders"
                  className="hover:text-white transition"
                >
                  My Orders
                </Link>
              </li>

            </ul>
          </div>


          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Contact Us
            </h3>

            <ul className="space-y-4 text-sm">

              <li className="flex items-start gap-3">
                <Mail
                  size={18}
                  className="mt-0.5 shrink-0"
                />

                <span>
                  support@cartify.com
                </span>
              </li>

              <li className="flex items-start gap-3">
                <Phone
                  size={18}
                  className="mt-0.5 shrink-0"
                />

                <span>
                  +91 98765 43210
                </span>
              </li>

              <li className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0"
                />

                <span>
                  Gurugram, Haryana, India
                </span>
              </li>

            </ul>
          </div>

        </div>
      </div>


      {/* Bottom Bar */}
      <div className="border-t border-gray-800">

        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-gray-500">

          <p>
            © {new Date().getFullYear()} Cartify. All rights reserved.
          </p>

          <p>
            Built with React & Node.js
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;