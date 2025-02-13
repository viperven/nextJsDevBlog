"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Menu, X, Sun, Moon } from "lucide-react"
import Image from "next/image"
import { BaseUrl } from "../lib/url"

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen)

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/post/create", label: "Write" },
  ]

  const handleLogout = async () => {
    try {
      const res = await fetch(`${BaseUrl}auth/logout`, { method: "GET" });
      const data = await res.json();
      window.location.href = '/auth/login';
    } catch (error) {
      console.error('Logout failed', error);
    }
  };


  return (
    <header className="bg-base-100 shadow-lg">
      <div className="navbar container mx-auto">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost normal-case text-xl">
            DevBlog
          </Link>
        </div>
        <div className="flex-none hidden md:block">
          <ul className="menu menu-horizontal px-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-none gap-2">
          <button className="btn btn-ghost btn-circle" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {mounted && (theme === "dark" ? <Sun /> : <Moon />)}
          </button>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <Image src="/defaultProfile.png" alt="Profile" width={50} height={50} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Profile</a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li onClick={handleLogout}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
          <button className="btn btn-ghost btn-circle md:hidden" onClick={toggleDrawer}>
            <Menu />
          </button>
        </div>
      </div>
      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 ${isDrawerOpen ? "block" : "hidden"} md:hidden`}
        onClick={toggleDrawer}
      >
        <div
          className="fixed inset-y-0 right-0 max-w-xs w-full bg-base-100 shadow-xl p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="btn btn-ghost btn-circle absolute top-4 right-4" onClick={toggleDrawer}>
            <X />
          </button>
          <div className="mt-8">
            <ul className="menu w-full">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={toggleDrawer}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a onClick={toggleDrawer}>Profile</a>
              </li>
              <li>
                <a onClick={toggleDrawer}>Settings</a>
              </li>
              <li>
                <a onClick={toggleDrawer}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

