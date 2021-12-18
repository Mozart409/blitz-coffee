import { useState } from "react"
import { Link, useMutation, Image } from "blitz"
import logout from "app/auth/mutations/logout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { Transition } from "@headlessui/react"
import Avatar from "react-avatar"
import ThemeToggle from "./ThemeToggle"

const NavBar = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)
  const [isDropdown, setIsDropdown] = useState(false)

  const Navlinks = [
    { id: 1, href: "/", name: "Home" },
    { id: 2, href: "/coffees", name: "Coffees" },
    { id: 3, href: "/profile", name: "Profile" },
  ]
  return (
    <>
      <nav className="bg-gray-800">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href="/">
                  <a>
                    <Image
                      className="block w-auto h-12 rounded"
                      src="/apple-icon-180.png"
                      alt="Logo"
                      height={32}
                      width={32}
                    />
                  </a>
                </Link>
              </div>
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}

                  {Navlinks.map((item) => (
                    <Link key={item.id} href={item.href}>
                      <a
                        data-cy={item.name}
                        className="py-2 px-3 text-sm font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700"
                      >
                        {item.name}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex items-center">
                <ThemeToggle />
                {/* <button className="p-1 text-gray-400 bg-gray-800 rounded-full hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none">
                  <span className="sr-only">View notifications</span>

                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </button> */}

                {/* <!-- Profile dropdown --> */}
                <div className="relative ml-3">
                  <div>
                    <button
                      type="button"
                      className="flex text-sm bg-gray-800 rounded-full focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none"
                      id="user-menu"
                      aria-expanded="false"
                      aria-haspopup="true"
                      onClick={() => setIsDropdown(!isDropdown)}
                    >
                      <span className="sr-only">Open user menu</span>
                      {/*   <img
                       className="w-8 h-8 rounded-full"
                       src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=k3BsfAE0bE&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                       alt=""
                     /> */}
                      <div className="w-8 h-8">
                        <Avatar
                          size="32px"
                          className="rounded-full"
                          email={currentUser?.email}
                          color="cyan"
                        />
                      </div>
                    </button>
                  </div>
                  {/* <!--
             Dropdown menu, show/hide based on menu state.

             Entering: "transition ease-out duration-100"
               From: "transform opacity-0 scale-95"
               To: "transform opacity-100 scale-100"
             Leaving: "transition ease-in duration-75"
               From: "transform opacity-100 scale-100"
               To: "transform opacity-0 scale-95"
           --> */}
                  <Transition
                    show={isDropdown}
                    enter="transition ease-out duration-100 transform"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-75 transform"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                    onClick={() => setIsDropdown(!isDropdown)}
                  >
                    {currentUser ? (
                      <div
                        className="absolute right-0 py-1 mt-2 w-48 bg-white rounded-md ring-1 ring-black ring-opacity-5 shadow-lg origin-top-right focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu"
                      >
                        <Link href="/profile">
                          <a
                            className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                          >
                            Your Profile
                          </a>
                        </Link>

                        <div className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100">
                          <button
                            className="button"
                            onClick={async () => {
                              await logoutMutation()
                            }}
                            role="menuitem"
                          >
                            Sign out
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="absolute right-0 py-1 mt-2 w-48 bg-white rounded-md ring-1 ring-black ring-opacity-5 shadow-lg origin-top-right focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu"
                      >
                        <Link href="/login">
                          <a
                            className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                          >
                            Sign in
                          </a>
                        </Link>
                      </div>
                    )}
                  </Transition>
                </div>
              </div>
            </div>
            <div className="flex -mr-2 sm:hidden">
              {/* <!-- Mobile menu button --> */}
              <button
                type="button"
                className="inline-flex justify-center items-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:ring-2 focus:ring-inset focus:ring-white focus:outline-none"
                aria-controls="mobile-menu"
                aria-expanded="false"
                onClick={() => setIsDropdown(!isDropdown)}
              >
                <span className="sr-only">Open main menu</span>

                {!isDropdown ? (
                  <Transition
                    show={!isDropdown}
                    enter="transition ease-out duration-100 transform"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-75 transform"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                    onClick={() => setIsDropdown(!isDropdown)}
                  >
                    <svg
                      className="block w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </Transition>
                ) : (
                  <Transition
                    show={isDropdown}
                    enter="transition ease-out duration-100 transform"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-75 transform"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                    onClick={() => setIsDropdown(!isDropdown)}
                  >
                    <svg
                      className="block w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </Transition>
                )}
              </button>
            </div>
          </div>
        </div>
        {/* <!-- Mobile menu, show/hide based on menu state. --> */}
        <Transition
          show={isDropdown}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
          onClick={() => setIsDropdown(!isDropdown)}
        >
          <div className="sm:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
              {Navlinks.map((item) => (
                <Link key={item.id} href={item.href}>
                  <a className="block py-2 px-3 text-base font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700">
                    {item.name}
                  </a>
                </Link>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  {/* <img
                  className="w-10 h-10 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=k3BsfAE0bE&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                /> */}
                  <div className="w-10 h-10">
                    <Avatar
                      size="40px"
                      className="rounded-full"
                      email={currentUser?.email}
                      color="cyan"
                    />
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">{currentUser?.name}</div>
                  <div className="text-sm font-medium text-gray-400">{currentUser?.email}</div>
                </div>
                <button className="flex-shrink-0 p-1 ml-auto text-gray-400 bg-gray-800 rounded-full hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none">
                  <span className="sr-only">View notifications</span>
                  {/* <!-- Heroicon name: outline/bell --> */}
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </button>
              </div>
              <div className="px-2 mt-3 space-y-1">
                {currentUser ? (
                  <>
                    <Link href="/profile">
                      <a className="block py-2 px-3 text-base font-medium text-gray-400 rounded-md hover:text-white hover:bg-gray-700">
                        Your Profile
                      </a>
                    </Link>
                    <div className="block py-2 px-3 text-base font-medium text-gray-400 rounded-md hover:text-white hover:bg-gray-700">
                      <button
                        className="button"
                        onClick={async () => {
                          await logoutMutation()
                        }}
                        role="menuitem"
                      >
                        Sign out
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <Link href="/login">
                      <a className="block py-2 px-3 text-base font-medium text-gray-400 rounded-md hover:text-white hover:bg-gray-700">
                        Sign in
                      </a>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </Transition>
      </nav>
    </>
  )
}

export default NavBar
