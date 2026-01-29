import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaLinkedin,
  FaTwitterSquare,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "../assets/logoO.webp";

const Footer = () => {
  return (
    <footer className="bg-black rounded-t-2xl border-t-2 border-gray-800 text-white">
      <div className="max-w-[1520px] mx-auto px-4">
        <div className="flex flex-wrap justify-between py-10 mt-[50px]">
          {/* Logo & Description */}
          <div className="w-full md:w-[45%] lg:w-[32%] space-y-4">
            <img src={Logo} alt="Glore Logo" className="w-[250px]" />
            <p className="text-[15px] pr-6 hover:text-pink-600">
              আমাদের কালেকশন আপনাকে দেবে ফ্যাশনের আধুনিকতা এবং ঐতিহ্যের একটি
              নিখুঁত সংমিশ্রণ।
            </p>
          </div>

          {/* Explore More */}
          <div className="w-[33%] md:w-[22%] space-y-2">
            <p className="text-[30px] hover:text-pink-600 font-bold">
              Explore More
            </p>
            {["New Arrivals", "About Us", "Contact"].map((item, i) => (
              <Link key={i} to={`/${item.toLowerCase().replace(/\s+/g, "")}`}>
                <p className="text-[20px] hover:text-pink-600">{item}</p>
              </Link>
            ))}
          </div>

          {/* Client Experience */}
          <div className="w-[33%] md:w-[22%] space-y-2">
            <p className="text-[30px] hover:text-pink-600 font-bold">
              Client Experience
            </p>
            {[
              "Track Your Order",
              "Returns & Exchanges",
              "Customer Reviews",
              "Privacy Policy",
              "FAQ",
            ].map((item, i) => (
              <p key={i} className="text-[20px] hover:text-pink-600">
                {item}
              </p>
            ))}
          </div>

          {/* Contact & Social */}
          <div className="w-[33%] md:w-[22%] space-y-2">
            <p className="text-[30px] hover:text-pink-600 font-bold">
              GET IN TOUCH
            </p>
            <p className="text-[20px] hover:text-pink-600">
              মোবাইল নং: (+88) 01826339098
            </p>
            <p className="text-[20px] hover:text-pink-600">
              ইমেইল: anondo554@gmail.com
            </p>

            <div className="flex gap-4 text-[28px] pt-4">
              <a
                href="https://www.facebook.com/anondo554.0"
                aria-label="Facebook"
                title="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookSquare className="text-black bg-white rounded hover:text-pink-600" />
              </a>
              <a
                href="https://www.linkedin.com/in/anondo-ray-7b486b1b4/"
                aria-label="LinkedIn"
                title="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="text-black bg-white rounded hover:text-pink-600" />
              </a>
              <a
                href="https://www.linkedin.com/in/anondo-ray-7b486b1b4/"
                aria-label="Twitter"
                title="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitterSquare className="text-black bg-white rounded hover:text-pink-600" />
              </a>
              <a
                href="https://www.instagram.com/anondoray553/?hl=en"
                aria-label="Instagram"
                title="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagramSquare className="text-black bg-white rounded hover:text-pink-600" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
