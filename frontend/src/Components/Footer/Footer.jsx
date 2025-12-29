import {
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaTwitter,
  FaFacebookF,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-white mt-10">
      <div className="container mx-auto px-4 py-10">

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* ================= CONNECT ================= */}
          <div className="space-y-4 md:border-r md:pr-6">
            <h5 className="text-sm font-semibold tracking-wide">
              CONNECT WITH US
            </h5>

            <input
              type="email"
              placeholder="Enter Email ID"
              className="w-full p-2 rounded text-black outline-none"
            />

            {/* SOCIAL ICONS */}
            <div className="flex justify-center md:justify-start gap-4 pt-2">
              <FaFacebookF className="w-6 h-6 hover:text-blue-500 cursor-pointer" />
              <FaInstagram className="w-6 h-6 hover:text-pink-500 cursor-pointer" />
              <FaLinkedin className="w-6 h-6 hover:text-blue-400 cursor-pointer" />
              <FaTwitter className="w-6 h-6 hover:text-sky-400 cursor-pointer" />
              <FaYoutube className="w-6 h-6 hover:text-red-500 cursor-pointer" />
            </div>

            <p className="text-xs text-gray-400 pt-4 text-center md:text-left">
              © 2023 Prakash Traders. All rights reserved
            </p>
          </div>

          {/* ================= USEFUL LINKS ================= */}
          <div className="grid grid-cols-2 gap-6 md:border-r md:px-6">
            <div>
              <h5 className="text-sm font-semibold mb-3">USEFUL LINKS</h5>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>About Prakash Traders</li>
                <li>Help & Support</li>
                <li>FAQs</li>
                <li>Buying Guide</li>
                <li>Return Policy</li>
                <li>B2B Orders</li>
                <li>Store Locator</li>
              </ul>
            </div>

            <div className="pt-6 md:pt-0">
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Careers</li>
                <li>Terms of Use</li>
                <li>Privacy Policy</li>
                <li>Disclaimer</li>
                <li>Gift Card</li>
                <li>Unboxed</li>
                <li>E-Star</li>
              </ul>
            </div>
          </div>

          {/* ================= PRODUCTS ================= */}
          <div>
            <h5 className="text-sm font-semibold mb-3">PRODUCTS</h5>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Refrigerators</li>
              <li>Washing Machines</li>
              <li>Microwaves</li>
              <li>Mixers</li>
              <li>Grinders</li>
              <li>Power Hobs</li>
              <li>Chimneys</li>
              <li>Electric Rice Cookers</li>
              <li>Electric Kettles</li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
