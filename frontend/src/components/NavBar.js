import React from "react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import Swal from "sweetalert2";

import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";


const NavBar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleClick = () => {
    logout();

    // Show success message if logout was successful
    Swal.fire({
      icon: "success",
      title: "Logout Successful!",
      text: "You have successfully logged out.",
      confirmButtonColor: "#3085d6",
    }).then(() => {
      navigate("/login");
    });
  };

  return (
    <div>
      <Disclosure as="nav" className="bg-[#ffcb8a]">
        {({ open }) => (
          <>
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="flex">
                    <img
                      className="w-auto h-10 "
                    
                      alt="Note Master"
                    />
                    <div className="mt-2 font-bold tracking-widest text-center text-transparent text-xl bg-gradient-to-r from-[#454545] via-[#FF6000] to-[#FFA559] bg-clip-text">
                      Note Master
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="flex items-center ml-4 md:ml-6">
                    <div className="text-sm font-medium leading-none text-black">
                      {user.email}
                    </div>
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-[#454545] text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#454545]">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="w-8 h-8 rounded-full"
                        
                            alt=""
                          />
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
                <div className="flex -mr-2 md:hidden">
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-[#454545] p-2 text-gray-400 hover:bg-gray-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
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

            <Disclosure.Panel className="md:hidden">
              <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img
                      className="w-10 h-10 rounded-full"
                      alt=""
                    />
                  </div>
                </div>
                <div className="px-2 mt-3 space-y-1">
                  <div className="ml-3">
                    <div className="text-sm font-medium leading-none text-black">
                      {user.email}
                    </div>
                  </div>
                  <a
                    href="/login"
                    className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-[#808080] hover:text-white"
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
