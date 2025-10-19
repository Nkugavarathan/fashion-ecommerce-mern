import React from "react"
import FacebookIcon from "@mui/icons-material/Facebook"
import InstagramIcon from "@mui/icons-material/Instagram"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import PinterestIcon from "@mui/icons-material/Pinterest"
import PhoneIcon from "@mui/icons-material/Phone"
import MailIcon from "@mui/icons-material/Mail"
import HomeIcon from "@mui/icons-material/Home"
// import { mobile, tablet } from "../responsive"

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 px-6 py-10">
      <div className="flex flex-wrap gap-8 justify-between">
        {/* Left Section */}
        <div className="flex-1 min-w-[250px]">
          <h1 className="text-2xl font-bold text-teal-600 mb-4">VARA</h1>
          <p className="mb-4 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            fuga itaque minima iure ex ad facilis unde, cumque deleniti aut
            laudantium magni dolores ipsa, a dolorem, esse sint quo
            exercitationem?
          </p>
          <div className="flex gap-3">
            <span className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white hover:scale-110 transition">
              <FacebookIcon />
            </span>
            <span className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white hover:scale-110 transition">
              <InstagramIcon />
            </span>
            <span className="w-10 h-10 rounded-full bg-blue-800 flex items-center justify-center text-white hover:scale-110 transition">
              <LinkedInIcon />
            </span>
            <span className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white hover:scale-110 transition">
              <PinterestIcon />
            </span>
          </div>
        </div>

        {/* Center Section */}
        <div className="flex-1 min-w-[250px] hidden md:block">
          <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
          <ul className="flex flex-wrap gap-y-2 text-sm">
            <li className="w-1/2">Home</li>
            <li className="w-1/2">Women Fashions</li>
            <li className="w-1/2">My Account</li>
            <li className="w-1/2">Order Tracking</li>
            <li className="w-1/2">Wishlist</li>
            <li className="w-1/2">Terms</li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="flex-1 min-w-[250px]">
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <div className="flex items-center gap-2 mb-2 text-sm">
            <HomeIcon />
            <span>No 10, HighLevel Road, Nugegoda.</span>
          </div>
          <div className="flex items-center gap-2 mb-2 text-sm">
            <PhoneIcon />
            <span>+771234567</span>
          </div>
          <div className="flex items-center gap-2 mb-2 text-sm">
            <MailIcon />
            <span>contactvara@gmail.com</span>
          </div>
          <img
            src="https://i.ibb.co/Qfvn4z6/payment.png"
            alt="Payment Methods"
            className="mt-4 w-40"
          />
        </div>
      </div>
    </footer>
  )
}
