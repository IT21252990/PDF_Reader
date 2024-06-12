import React from "react";
import { useNavigate } from "react-router-dom"; // Hook to navigate programmatically
import { useLogout } from "../hooks/useLogout"; // Custom hook for handling logout logic
import { useAuthContext } from "../hooks/useAuthContext"; // Custom hook for accessing authentication context
import Swal from "sweetalert2"; // Library for displaying alerts
import logo from "../images/logo.png"; // Import logo image
import userimg from "../images/user.png"; // Import user image
import { Fragment } from "react"; // Fragment component for wrapping multiple elements
import { Disclosure, Menu, Transition } from "@headlessui/react"; // Headless UI components for responsive navigation menu
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"; // Icons for the menu toggle button

const NavBar = () => {
  const { logout } = useLogout(); // Get the logout function from the custom hook
  const { user } = useAuthContext(); // Get the user object from the authentication context
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Handle logout button click
  const handleClick = () => {
    logout(); // Call the logout function

    // Show success message if logout was successful
    Swal.fire({
      icon: "success",
      title: "Logout Successful!",
      text: "You have successfully logged out.",
      confirmButtonColor: "#3085d6",
    }).then(() => {
      navigate("/login"); // Navigate to the login page after the alert is dismissed
    });
  };

  return (
    <div>
      {/* Disclosure component for responsive navigation menu */}
      <Disclosure as="nav" className="bg-[#c294fa]">
        {({ open }) => (
          <>
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                {/* Logo and title */}
                <div className="flex items-center">
                  <div className="flex">
                    <img className="w-auto h-10" src={logo} alt="Pdf Reader" />
                    <div className="mt-2 font-bold tracking-widest text-center text-transparent text-xl bg-gradient-to-r from-[#594077] via-[#a068e6] to-[#6a38a7] bg-clip-text">
                      PDF Reader
                    </div>
                  </div>
                </div>
                {/* User info and logout button (visible on larger screens) */}
                <div className="hidden md:block">
                  <div className="flex items-center ml-4 md:ml-6">
                    <div className="text-sm font-medium leading-none text-[#1d0e30]">
                      {user.email} {/* Display the user's email */}
                    </div>
                    {/* Menu component for user avatar and logout option */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-[#c294fa] text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#454545]">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <img className="w-8 h-8 rounded-full" src={userimg} alt="user" />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-1 origin-top-right bg-red-500 rounded-md shadow-2xl hover:bg-red-700 ring-2 ring-red-800 focus:outline-none">
                          <Menu.Item>
                            <a
                              href="/login"
                              className="block px-2 py-2 ml-14 text-[12px] font-bold text-white"
                              onClick={handleClick}
                            >
                              Sign out
                            </a>
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
                {/* Menu button (visible on smaller screens) */}
                <div className="flex -mr-2 md:hidden">
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-[#1d0e30] p-2 text-gray-400 hover:bg-gray-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block w-6 h-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block w-6 h-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            {/* Responsive menu panel (visible on smaller screens) */}
            <Disclosure.Panel className="md:hidden">
              <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img className="w-10 h-10 rounded-full" src={userimg} alt="user" />
                  </div>
                </div>
                <div className="px-2 mt-3 space-y-1">
                  <div className="ml-3">
                    <div className="text-sm mb-3 font-medium leading-none text-black">
                      {user.email} {/* Display the user's email */}
                    </div>
                  </div>
                  <hr></hr>
                  <a
                    href="/login"
                    className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-red-500 hover:text-white"
                    onClick={handleClick}
                  >
                    Sign out
                  </a>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default NavBar;
