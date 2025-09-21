"use client";
import Link from "next/link";
import React, {useState} from "react";
import { Heart, Search, ShoppingCart, UserRound } from "lucide-react";
import HeaderBottom from "./header-bottom";
import useUser from "apps/user-ui/src/hooks/useUser";
import axiosInstance from "apps/user-ui/src/utils/axiosInstance";
import {useStore} from "apps/user-ui/src/store";

const Header=() => {
  const {user, isLoading}=useUser();
  const wishlist=useStore((state: any) => state.wishlist);
  const cart=useStore((state: any) => state.cart);

  const [searchQuery, setSearchQuery]=useState("");
  const [suggestions, setSuggestions]=useState<any[]>([]);
  const [loadingSuggestions, setLoadingSuggestions]=useState(false);

  const handleSearchClick = async () => {
    if (!searchQuery.trim()) return;
    setLoadingSuggestions(true);
    try {
      const res = await axiosInstance.get(
        `/product/api/search-products?q=${encodeURIComponent(searchQuery)}`
      );
      setSuggestions(res.data || []);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  return (
    <div className="w-full bg-white">
      <div className="w-[80%] py-5 m-auto flex items-center justify-between">
        <div>
          <Link href={"/"}>
            <span className="text-3xl font-[500]">Eshop</span>
          </Link>
        </div>
        {/* Search */}
        <div className="w-[50%] relative">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearchClick()}
            className="w-full px-4 font-Poppins font-medium border-[2.5px] rounded-lg border-[#3489ff] outline-none h-[55px]"
          />
          <button onClick={handleSearchClick} className="w-[60px] cursor-pointer flex items-center justify-center h-[55px] bg-[#3489ff] absolute top-0 right-0">
            <Search color="#fff" className="rounded-lg" />
          </button>
          {/* Suggestions */}
          {searchQuery && suggestions.length > 0 && (
            <div className="absolute top-[60px] w-full bg-white border rounded-lg shadow-md max-h-[300px] overflow-y-auto z-50">
              {loadingSuggestions ? (
                <div className="p-3 text-gray-500">Loading...</div>
              ) : (
                suggestions.map((item) => (
                  <Link
                    key={item.id}
                    href={`/product/${item.slug}`}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    {item.title}
                  </Link>
                ))
              )}
            </div>
          )}
        </div>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            {!isLoading && user? (
              <>
                <Link
                  href={"/profile"}
                  className="border-2 w-[50px] h-[50px] flex items-center justify-center rounded-full border-[#010f1c1a]"
                >
                  <UserRound />
                </Link>
                <Link href={"/profile"} className="">
                    <span className="block font-medium">Hello, </span>
                  <span className="font-semibold">{user?.name?.split(" ")[0]}</span>
                  </Link>
              </>

            ) : (
              <>
                <Link
                  href={"/login"}
                  className="border-2 w-[50px] h-[50px] flex items-center justify-center rounded-full border-[#010f1c1a]"
                >
                  <UserRound />
                </Link>
                <Link href={"/login"} className="">
                    <span className="block font-medium">Hello, </span>
                    <span className="font-semibold">{isLoading ? "..." : "Sign In"}</span>
                  </Link>
              </>
            )}

          </div>
          <div className="flex items-center gap-5">
            <Link href={"/wishlist"} className="relative">
              <Heart />
              <div className="w-6 h-6 border-2 border-white bg-red-500 rounded-full flex items-center justify-center absolute top-[-10px] right-[-10px]">
                <span className="text-white font-medium text-sm">{wishlist?.length}</span>
              </div>
            </Link>
            <Link href={"/cart"} className="relative">
              <ShoppingCart />
              <div className="w-6 h-6 border-2 border-white bg-red-500 rounded-full flex items-center justify-center absolute top-[-10px] right-[-10px]">
                <span className="text-white font-medium text-sm">{cart?.length}</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="border-b border-b-[#99999938]" />
      <HeaderBottom />
    </div>
  );
};

export default Header;
