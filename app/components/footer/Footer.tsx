import React from "react";
import Container from "../Container";
import FooterList from "./FooterList";
import Link from "next/link";
import { MdFacebook } from "react-icons/md";
import {
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillYoutube,
} from "react-icons/ai";

function Footer() {
  return (
    <footer className="mt-16 bg-slate-700 text-sm text-slate-200">
      <Container>
        <div className="flex flex-col justify-between pb-8 pt-16 md:flex-row">
          <FooterList>
            <h3 className="mb-2 text-base font-bold">Shop Categories</h3>
            <Link href="#">Phones</Link>
            <Link href="#">Laptops</Link>
            <Link href="#">Desktops</Link>
            <Link href="#">Watches</Link>
            <Link href="#">TVs</Link>
            <Link href="#">Accessories</Link>
          </FooterList>
          <FooterList>
            <h3 className="mb-2 text-base font-bold">Customer Service</h3>
            <Link href="#">Contact Us</Link>
            <Link href="#">Shipping Policy</Link>
            <Link href="#">Returns and Exchanges</Link>
            <Link href="#">FAQs</Link>
          </FooterList>
          <div className="mb-6 w-full md:mb-0 md:w-1/3">
            <h3 className="mb-2 text-base font-bold">About Us</h3>
            <p className="mb-2">
              At our store, we are dedicated to providing the latest and
              greatest devices and accessories to our customers with a wide
              selection of phones, laptops, desktops, TVs, watches ad
              accessories
            </p>
            <p>
              &copy; {new Date().getFullYear()} E-Shop. All rights reserved.
            </p>
          </div>
          <FooterList>
            <h3 className="mb-2 text-base font-bold">Follow Us</h3>
            <div className="flex gap-2">
              <Link href="">
                <MdFacebook size={24} />
              </Link>
              <Link href="">
                <AiFillTwitterCircle size={24} />
              </Link>
              <Link href="">
                <AiFillInstagram size={24} />
              </Link>
              <Link href="">
                <AiFillYoutube size={24} />
              </Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
