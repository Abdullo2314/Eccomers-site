import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, ArrowRight, Menu, X } from "lucide-react";
import SearchInput from "./SearchInput";
import RegistrationModal from "../components/RegistrationModal";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";

function Header() {
    const { addToCart } = useCart();
    const { totalCount } = useCart();
    const { favorites } = useFavorites();
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);


    return (
        <header className="wrapper">

      <div className="wrapper_header">
        <Link className='wrapper_logo' to="/">
          <img
            src="/Group 1000004658.png"
            alt="Logo"
          />
          <h4>Fastcart</h4>
        </Link>
        <div>
          <ul  className='wrapper_nav'>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/">Contact</Link></li>
            <li><Link to="/">About</Link></li>
            <li><Link to="/">Sign Up</Link></li>
          </ul>
        </div>
        <div className="wrapper_user">
          <SearchInput />
          <Link to="/favorites" className="header_favorites">
            <Heart size={24} />
            {favorites.length > 0 && (
              <span className="">
                {favorites.length}
              </span>
            )}
          </Link>
          <Link to="/cart" className="header_corzin">
            <ShoppingCart size={24} />
            {totalCount > 0 && (
              <span>
                {totalCount}
              </span>
            )}
          </Link>
            <button className="header_menu" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? (
                <X size={28} />
                ) : (
                <Menu size={28} />
                )}
          </button>
          <RegistrationModal />
        </div>
      </div>
<div className="headers_line">
        </div>
          <div className="main_nav">
                <ul className='main_info'>
                  <li><Link to="/catalog">Woman’s Fashion</Link></li>
                  <li><Link to="/dairy">Men’s Fashion</Link></li>
                  <li><Link to="/meat">Electronics</Link></li>
                  <li><Link to="/vegetables">Home & Lifestyle</Link></li>
                  <li><Link to="/fruits">Medicine</Link></li>
                  <li><Link to="/fruits">Sports & Outdoor</Link></li>
                  <li><Link to="/fruits">Baby’s & Toys</Link></li>
                  <li><Link to="/fruits">Groceries & Pets</Link></li>
                  <li><Link to="/fruits">Health & Beauty</Link></li>
                </ul> 
            <div className='bg_black'>
              <div className='headline'>
                  <div className='apple'>
                    <img src="1200px-Apple_gray_logo 1.svg" alt="apple"/>
                    <p>iPhone 14 Series</p>
                  </div>
                  <h3>Up to 10% off Voucher</h3>
                  <div className="main_button">
                    <li><Link to="/">Shop Now</Link></li>
                    <ArrowRight/>
                  </div>
              </div>
                <img src="hero_endframe__cvklg0xk3w6e_large 2.png" alt=""/>
            </div>
          </div>


      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white sm:hidden flex flex-col px-4 py-6 text-lg gap-4">
            <button className='justify-end flex' onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? (
                <X className="bg-blue-500 flex md:hidden rounded-md stroke-white p-1" size={28} />
                ) : (
                <Menu className="bg-blue-500 flex md:hidden rounded-md stroke-white p-1" size={28} />
                )}
          </button>
          <nav className="flex flex-col gap-4">          
            <Link to="/catalog" onClick={() => setMobileMenuOpen(false)}>Все продукты</Link>
            <Link to="/dairy" onClick={() => setMobileMenuOpen(false)}>Молочная продукция</Link>
            <Link to="/meat" onClick={() => setMobileMenuOpen(false)}>Мясная продукция</Link>
            <Link to="/vegetables" onClick={() => setMobileMenuOpen(false)}>Овощи</Link>
            <Link to="/fruits" onClick={() => setMobileMenuOpen(false)}>Фрукты</Link>
            <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>Панел админка</Link>
          </nav>
          <div className="mt-auto">
            <SearchInput />
            <div className="mt-4">
              <RegistrationModal className="bg-blue-500 w-full h-[45px] stroke-white p-2 rounded" />
            </div>
          </div>
        </div>
      )}
    </header>
    );
}

export default Header;