import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Separator } from "@components/ui/separator";

import logo from "@public/logo/logo.svg";

export default function Footer({ className = "" }) {
  return (
    <footer className={`${className} py-12 transition-colors duration-200`}>
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
                <span className="text-2xl font-bold  ">Funtrail</span>
              </div>
            </Link>
            <p className="text-sm mb-4">
              Empowering adventures and connecting trails worldwide.
            </p>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Facebook">
                <Facebook size={20} />
              </Link>
              <Link href="#" aria-label="Twitter">
                <Twitter size={20} />
              </Link>
              <Link href="#" aria-label="Instagram">
                <Instagram size={20} />
              </Link>
              <Link href="#" aria-label="LinkedIn">
                <Linkedin size={20} />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4  ">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <Link href="/careers">Careers</Link>
              </li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4  ">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms">Terms of Service</Link>
              </li>
              <li>
                <Link href="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/cookies">Cookie Policy</Link>
              </li>
              <li>
                <Link href="/disclaimer">Disclaimer</Link>
              </li>
            </ul>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Funtrail Inc. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
