import React, { useState, useEffect, Fragment } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Disc as Discord, Moon, Sun, Menu } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { Dialog, Transition } from '@headlessui/react';

import MobileNav from './MobileNav';

const NavButton = ({ children, to, external = false, variant = 'default' }: {
  children: React.ReactNode;
  to: string;
  external?: boolean;
  variant?: 'default' | 'discord';
}) => {
  const baseClasses = "px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105";
  const classes = clsx(baseClasses, {
    'bg-white text-black hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700': variant === 'default',
    'bg-[#5865F2] text-white hover:bg-[#4752C4] flex items-center gap-2': variant === 'discord',
  });

  if (external) {
    return (
      <motion.a
        href={to}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {variant === 'discord' && <Discord className="w-5 h-5" />}
        {children}
      </motion.a>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link to={to} className={classes}>
        {children}
      </Link>
    </motion.div>
  );
};

function Layout() {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-orange-900/30 text-white dark:bg-gray-900 dark:text-gray-100" dir="rtl">
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.img
              src="https://i.ibb.co/0R613JJY/gamelandmc.webp"
              alt="GameLand MC Logo"
              className="w-12 h-12 rounded-full object-cover"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            />
            <motion.h1
              className="text-2xl font-bold bg-gradient-to-l from-orange-500 to-white bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              گیم لند ام سی
            </motion.h1>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <NavButton to="/">قوانین اصلی</NavButton>
            <NavButton to="/job-rules">قوانین شغل ها</NavButton>
            <NavButton to="/robbery-rules">قوانین رابری</NavButton>
            <NavButton to="/gang-rules">قوانین گنگ ها</NavButton>
            <NavButton to="https://discord.com/invite/YPY3H56VtH" external variant="discord">
              دیسکورد
            </NavButton>
            <motion.button
              onClick={toggleDarkMode}
              className="p-2 rounded-full transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {darkMode ? <Sun className="w-5 h-5 text-white" /> : <Moon className="w-5 h-5 text-black" />}
            </motion.button>
          </div>

          <div className="lg:hidden">
            <motion.button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-gray-400 hover:text-gray-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="sr-only">Open menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </motion.button>
          </div>
        </div>
      </header>

      <MobileNav open={mobileMenuOpen} setOpen={setMobileMenuOpen} />

      <main className="container mx-auto px-4 py-8">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
}

export default Layout
