import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const SubFooter = () => {
  return (
    <div className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-gray-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:text-gray-400">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/tours" className="hover:text-gray-400">
                  Tours
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gray-400">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>Email: info@travelheights.com</li>
              <li>Phone: +1 (123) 456-7890</li>
              <li>Address: 123 Travel St, Adventure City, World</li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
              >
                <FaFacebook size={24} />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
              >
                <FaTwitter size={24} />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
              >
                <FaInstagram size={24} />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
              >
                <FaLinkedin size={24} />
              </Link>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="mb-4">
              Subscribe to our newsletter for the latest travel deals and
              updates.
            </p>
            {/* <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-l-md text-gray-900 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-blue-600 px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </button>
            </form> */}
          </div>
        </div>

        {/* Legal Links */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <ul className="flex justify-center space-x-6">
            <li>
              <Link href="/privacy-policy" className="hover:text-gray-400">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms-of-service" className="hover:text-gray-400">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/cancellation-policy" className="hover:text-gray-400">
                Cancellation Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SubFooter;
