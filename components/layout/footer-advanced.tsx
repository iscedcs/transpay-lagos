import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import MaxWidthWrapper from "./max-width-wrapper";

export default function FooterAlternative() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#0a0a0a] text-white pt-16 pb-8 border-t border-[#1a1a1a]">
      <MaxWidthWrapper>
        <div className="container mx-auto px-4 md:px-6">
          {/* Top section with logo, description and contact info */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="lg:col-span-1">
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold text-[#ffcc00]">
                  TRANSPAY
                </span>
              </div>
              <p className="text-gray-400 mb-6 max-w-xs">
                Revolutionizing transportation management across Nigeria with
                secure, efficient levy collection solutions.
              </p>
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="text-gray-400 hover:text-[#ffcc00] transition-colors duration-300"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-[#ffcc00] transition-colors duration-300"
                  aria-label="Twitter"
                >
                  <Twitter size={20} />
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-[#ffcc00] transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-[#ffcc00] transition-colors duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-[#ffcc00] transition-colors duration-300"
                  aria-label="Github"
                >
                  <Github size={20} />
                </Link>
              </div>
            </div>

            {/* Contact information */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                CONTACT US
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <MapPin
                    size={18}
                    className="text-[#ffcc00] mr-2 mt-1 flex-shrink-0"
                  />
                  <span className="text-gray-400">
                    123 Transportation Avenue, Victoria Island, Lagos, Nigeria
                  </span>
                </li>
                <li className="flex items-center">
                  <Phone
                    size={18}
                    className="text-[#ffcc00] mr-2 flex-shrink-0"
                  />
                  <span className="text-gray-400">+234 123 456 7890</span>
                </li>
                <li className="flex items-center">
                  <Mail
                    size={18}
                    className="text-[#ffcc00] mr-2 flex-shrink-0"
                  />
                  <span className="text-gray-400">info@transpay.com</span>
                </li>
              </ul>
            </div>

            {/* Quick links */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                QUICK LINKS
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="#about"
                      className="text-gray-400 hover:text-[#ffcc00] transition-colors duration-300"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#features"
                      className="text-gray-400 hover:text-[#ffcc00] transition-colors duration-300"
                    >
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#pricing"
                      className="text-gray-400 hover:text-[#ffcc00] transition-colors duration-300"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#blog"
                      className="text-gray-400 hover:text-[#ffcc00] transition-colors duration-300"
                    >
                      Blog
                    </Link>
                  </li>
                </ul>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="#faq"
                      className="text-gray-400 hover:text-[#ffcc00] transition-colors duration-300"
                    >
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#support"
                      className="text-gray-400 hover:text-[#ffcc00] transition-colors duration-300"
                    >
                      Support
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#careers"
                      className="text-gray-400 hover:text-[#ffcc00] transition-colors duration-300"
                    >
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#contact"
                      className="text-gray-400 hover:text-[#ffcc00] transition-colors duration-300"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Newsletter subscription */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                SUBSCRIBE
              </h3>
              <p className="text-gray-400 mb-4">
                Stay updated with our latest news and offers.
              </p>
              <form className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#ffcc00] text-white"
                  required
                />
                <button
                  type="submit"
                  className="bg-[#ffcc00] hover:bg-[#e6b800] text-black transition-colors duration-300 rounded-md px-4 py-2 font-medium"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Middle section with links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-t border-b border-[#1a1a1a]">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider mb-3">
                PRODUCT
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#pricing"
                    className="text-gray-400 hover:text-[#ffcc00] transition-colors duration-300"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#integrations"
                    className="text-gray-400 hover:text-[#ffcc00] transition-colors duration-300"
                  >
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link
                    href="#changelog"
                    className="text-gray-400 hover:text-[#ffcc00] transition-colors duration-300"
                  >
                    Changelog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider mb-3">
                COMPANY
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#about"
                    className="text-gray-400 hover:text-[#ffcc00] transition-colors duration-300"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#blog"
                    className="text-gray-400 hover:text-[#ffcc00] transition-colors duration-300"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#careers"
                    className="text-gray-400 hover:text-[#ffcc00] transition-colors duration-300"
                  >
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider mb-3">
                RESOURCES
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#terms"
                    className="text-gray-400 hover:text-[#ffcc00] transition-colors duration-300"
                  >
                    Terms of service
                  </Link>
                </li>
                <li>
                  <Link
                    href="#privacy"
                    className="text-gray-400 hover:text-[#ffcc00] transition-colors duration-300"
                  >
                    Privacy policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#security"
                    className="text-gray-400 hover:text-[#ffcc00] transition-colors duration-300"
                  >
                    Security
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider mb-3">
                DEVELOPERS
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#api"
                    className="text-gray-400 hover:text-[#ffcc00] transition-colors duration-300"
                  >
                    API
                  </Link>
                </li>
                <li>
                  <Link
                    href="#docs"
                    className="text-gray-400 hover:text-[#ffcc00] transition-colors duration-300"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="#status"
                    className="text-gray-400 hover:text-[#ffcc00] transition-colors duration-300"
                  >
                    Status
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom section with copyright and status */}
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Transpay. All rights reserved.
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
              <Link
                href="#system-status"
                className="text-gray-400 hover:text-[#ffcc00] text-sm"
              >
                System Status
              </Link>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
}
