import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { Separator } from "@components/ui/separator";

import logo from "@public/logo/logo.svg";

export default function Footer({ className = "" }) {
  return (
    <footer className={`${className} bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 py-12 transition-colors duration-200`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <div className="flex items-center space-x-2">
                <Image
                  src={logo}
                  className="size-10"
                  alt="Funtrail Logo"
                  width={40}
                  height={40}
                />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  Funtrail
                </span>
              </div>
            </Link>
            <p className="text-sm mb-4">
              Empowering adventures and connecting trails worldwide.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                aria-label="Facebook"
                className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <Facebook size={20} />
              </Link>
              <Link
                href="#"
                aria-label="Twitter"
                className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <Twitter size={20} />
              </Link>
              <Link
                href="#"
                aria-label="Instagram"
                className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <Instagram size={20} />
              </Link>
              <Link
                href="#"
                aria-label="LinkedIn"
                className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <Linkedin size={20} />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="hover:text-gray-900 dark:hover:text-white"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-gray-900 dark:hover:text-white"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="hover:text-gray-900 dark:hover:text-white"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-gray-900 dark:hover:text-white"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/terms"
                  className="hover:text-gray-900 dark:hover:text-white"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-gray-900 dark:hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="hover:text-gray-900 dark:hover:text-white"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/disclaimer"
                  className="hover:text-gray-900 dark:hover:text-white"
                >
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Funtrail Inc. All rights reserved.
          </div>
          <div className="flex items-center space-x-2">
            <Input
              type="email"
              placeholder="Subscribe to our newsletter"
              className="max-w-xs"
            />
            <Button type="submit">Subscribe</Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
