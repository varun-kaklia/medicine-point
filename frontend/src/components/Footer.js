import React from "react";
import {FaFacebook, FaInstagram, FaTwitter, FaLinkedin} from "react-icons/fa"
import {Link} from 'react-router-dom'


const Footer = () => {
    return (
      <div className="bg-white pt-6 sm:pt-8 border-t border-gray-100">
        <div className="container sm:grid grid-cols-3 pb-2 sm:pb-4 divide-y-2 sm:divide-y-0">
        {/* Footer Text */}
          <div className="col-span-1 space-y-8">
            <img src="/images/2.png" className="w-48 pb-2 sm:pb-0"  alt="Medicine Point- Medicine Wholeseller in Noida..!" />
            <p className="text-gray-500 hidden sm:block">
            Shop No. A-1, Roshan Complex <br/>
Mamura, Noida Sector-66,<br/>
Uttar Pradesh-201301
            </p>
            <div className="hidden sm:flex space-x-6 divide-y-2">
              <a href="medicinpoint.com" className="text-gray-400 hover:text-gray-500">
                <FaFacebook/>
              </a>
              <a href="medicinpoint.com" className="text-gray-400 hover:text-gray-500">
                <FaInstagram/>
              </a>
              <a href="medicinpoint.com" className="text-gray-400 hover:text-gray-500">
                <FaTwitter/>
              </a>
              <a href="medicinpoint.com" className="text-gray-400 hover:text-gray-500">
                <FaLinkedin/>
              </a>
            </div>
          </div>
          {/* Footer Links */}
          <div className="col-span-2 sm:grid grid-cols-2 py-2 sm:py-2 gap-8 divide-y-2 sm:divide-y-0 ">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Information</h3>
                  <div className="mt-4 space-y-4">
                    <Link to="/aboutus" className="text-base text-gray-500 hover:text-gray-900 block">About Us</Link>
                    <Link to="/contactus" className="text-base text-gray-500 hover:text-gray-900 block">Contact Us</Link>
                    <Link to="/deliverypolicy" className="text-base text-gray-500 hover:text-gray-900 block">Delivery Policies</Link>
                    <Link to="/privacypolicy" className="text-base text-gray-500 hover:text-gray-900 block">Privacy And Policies</Link>
                    <Link to="/termsandcondition" className="text-base text-gray-500 hover:text-gray-900 block">Term and Condition</Link>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-gray-500 uppercase tracking-wider">Store</h3>
                  <div className="mt-4 space-y-4">
                    <Link to="/shop" className="text-base text-gray-500 hover:text-gray-900 block">Shop</Link>
                    <Link to="/shop" className="text-base text-gray-500 hover:text-gray-900 block">Brand</Link>
                    <Link to="/shop" className="text-base text-gray-500 hover:text-gray-900 block">Salt</Link>
                    <Link to="/offer" className="text-base text-gray-500 hover:text-gray-900 block">Daily Offer</Link>
                    <Link to="/points" className="text-base text-gray-500 hover:text-gray-900 block">Points</Link>
                  </div>
                </div>

              </div>
              <div className="grid grid-cols-2 py-2 sm:py-2 gap-8 sm:mt-0 mt-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Account</h3>
                  <div className="mt-4 space-y-4">
                    <Link to="/myaccount" className="text-base text-gray-500 hover:text-gray-900 block">My Account</Link>
                    <Link to="/myorder" className="text-base text-gray-500 hover:text-gray-900 block">My Order</Link>
                    {/* <Link to="#" className="text-base text-gray-500 hover:text-gray-900 block">Cold Drink</Link>
                    <Link to="#" className="text-base text-gray-500 hover:text-gray-900 block">Medicine Point</Link> */}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Items</h3>
                  <div className="mt-4 space-y-4">
                    <Link to="/shop" className="text-base text-gray-500 hover:text-gray-900 block">Medicines</Link>
                    <Link to="/shop" className="text-base text-gray-500 hover:text-gray-900 block">Syrup</Link>
                    <Link to="/shop" className="text-base text-gray-500 hover:text-gray-900 block">Creames</Link>
                    <Link to="/shop" className="text-base text-gray-500 hover:text-gray-900 block">Tablets</Link>
                  </div>
                </div>
              </div>
          </div>
        </div>
      <div className="bg-primary py-4 ">
        <div className="container flex items-center justify-between">
          <p className="text-white">	&#169; Medicine Point- All rights Reserved</p>
          <div>
            <img src="" alt="" className="h-5"/>
          </div>
        </div>
      </div>
      </div>
    );
  }

export default Footer;
