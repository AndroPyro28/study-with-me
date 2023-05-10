import React, { useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "~/app/features/userSlice";

const NavLinks = () => {
  const [openProfileMenu, setOpenProfileMenu] = useState<boolean>(false);
  const [openHamburgerMenu, setOpenHamburgerMenu] = useState<boolean>(false);

  const handleClickProfileMenu = () => setOpenProfileMenu((prev) => !prev);
  const handleClickHamburgerMenu = () => setOpenHamburgerMenu((prev) => !prev);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  const user = useSelector(getUser);
  const { profile, email } = user;

  return (
    <nav className="border-gray-200 bg-white dark:bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <a href="#" className="flex items-center">
          <img
            src="/assets/logo.png"
            className="mr-3 h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
            Study with me
          </span>
        </a>

        <div className="flex items-center md:order-2">
          <button
            type="button"
            className="relative mr-3 flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 md:mr-0"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom"
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="h-8 w-8 rounded-full"
              src="/assets/defaultProfile.png"
              alt="user photo"
              onClick={handleClickProfileMenu}
            />

            {openProfileMenu && (
              <div
                className="absolute right-[-5em] top-7 z-50 my-4 list-none divide-y divide-gray-100 rounded-lg bg-white text-base shadow dark:divide-gray-600 dark:bg-gray-700 "
                id="user-dropdown"
              >
                <div className="px-4 py-3">
                  <Link href={'profile'}>
                  <span className="block text-sm text-gray-900 dark:text-white">
                    {profile?.firstname} {profile?.lastname}
                  </span>
                  <span className="block truncate  text-sm text-gray-500 dark:text-gray-400">
                    {email}
                  </span>
                  </Link>
                </div>

                <ul className="py-2" aria-labelledby="user-menu-button">
                  <li>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Settings
                    </Link>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={handleLogout}
                    >
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </button>

          <button
            data-collapse-toggle="mobile-menu-2"
            type="button"
            className="ml-1 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
            aria-controls="mobile-menu-2"
            aria-expanded="false"
            onClick={handleClickHamburgerMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        {openHamburgerMenu && (
          <div
            className=" w-full items-center justify-between md:order-1 md:flex md:hidden md:w-auto"
            id="mobile-menu-2"
          >
            <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900">
              <li>
                <Link
                  href="/calendar"
                  className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                >
                  Calendar
                </Link>
              </li>
              <li>
                <Link
                  href="/study-notes"
                  className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                  aria-current="page"
                >
                  Study-notes
                </Link>
              </li>
              <li>
                <Link
                  href="/quizes"
                  className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                  aria-current="page"
                >
                  Quizes
                </Link>
              </li>
            </ul>
          </div>
        )}

        <div
          className=" hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
          id="mobile-menu-2"
        >
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900">
            <li>
              <Link
                href="/calendar"
                className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
              >
                Calendar
              </Link>
            </li>
            <li>
              <Link
                href="/study-notes"
                className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                aria-current="page"
              >
                Study-notes
              </Link>
            </li>
            <li>
              <Link
                href="/quizes"
                className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                aria-current="page"
              >
                Quizes
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavLinks;
