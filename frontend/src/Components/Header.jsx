import React, { useCallback, useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AuthModals } from "./Components.js"
import { logoutUser } from "../Redux/Thunks/thunks.js"
import { useSelector, useDispatch } from 'react-redux'
import toast from "react-hot-toast"
import { FaUserAlt, FaBars, FaTimes } from "react-icons/fa";
import { HamMenu } from './Components.js';
import { getAllProjects } from "../Redux/Thunks/thunks.js";
import { EditProfileModal } from "./Components.js";
import { logo } from '../assets/assets.js'

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const [isHamOpen, setIsHamOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const projects = useSelector((state) => state.project.projects);

  const navItems = [
    {
      element: "Services",
      path: "/services",
      items: [
        { name: "Web Development", id: 1, slug: "web-development" },
        { name: "Mobile App Development", id: 2, slug: "mobile-app-development" },
        { name: "Custom Software Development", id: 3, slug: "custom-software-development" },
        { name: "Cybersecurity Solutions", id: 4, slug: "cybersecurity-solutions" },
        { name: "Cloud Infrastructure", id: 5, slug: "cloud-infrastructure" },
        { name: "Data Analytics", id: 6, slug: "data-analytics" }
      ]
    },
    {
      element: "Projects",
      path: "/projects",
    },
    {
      element: "About",
      path: "/about",
    },
    {
      element: "Contact",
      path: "/contact",
    }
  ];

  const closeHamMenu = useCallback(() => {
    setIsHamOpen(false);
  });

  const handleAccountClick = () => {
    if (user?.isAdmin) {
      setIsMobileMenuOpen(false);
      setIsHamOpen(false);
      navigate("/admin");
      return;
    }
    setIsEditProfileOpen(true);
    setIsMobileMenuOpen(false);
  }

  const handleLogout = useCallback(async () => {
    const result = await dispatch(logoutUser());
    if (logoutUser.fulfilled.match(result)) {
      closeHamMenu();
      setIsMobileMenuOpen(false);
      navigate("/");
      toast.success("Logged out successfully");
    } else {
      toast.error("Something went wrong");
    }
  }, []);

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  }

  const closeAuthModal = useCallback(() => {
    setAuthMode('login');
    setIsAuthOpen(false);
  });

  const closeEditProfile = useCallback(() => {
    setIsEditProfileOpen(false)
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  useEffect(() => {
    dispatch(getAllProjects());
  }, []);

  return (
    <header className='border border-b-card-border w-full h-18 bg-transparent backdrop-blur-md flex justify-between items-center fixed top-0 z-50 border-gray-200'>
      {/* Logo */}
      <div className="flex items-center justify-start pl-6">
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-purple-600 bg-clip-text text-transparent">
          <img src={logo} alt="Logo" className='w-36' />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center space-x-1">
        {navItems.map((item, index) => (
          <div key={index} className="relative group">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `${isActive
                  ? "text-text bg-text-bg border-card-border"
                  : "hover:bg-[#c4a964] border-transparent"
                } px-4 py-2 rounded-xl text-base font-medium border transition-all duration-300`
              }
            >
              {item.element}
            </NavLink>
            {/* Custom hovercard for Projects */}
            {item.element === "Projects" && projects && projects.length > 0 && (
              <div className="absolute left-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200 z-50 overflow-hidden">
                <ul>
                  {projects.slice(0, 5).map((project, subIdx) => (
                    <li key={project._id || subIdx}>
                      <span
                        className="block px-5 py-2 text-gray-700 hover:bg-card-border hover:text-black cursor-pointer transition-all duration-200"
                        onClick={() => navigate(`/project/${project._id}`)}
                      >
                        {project.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* Default hovercard for other nav items */}
            {item.items && item.element !== "Projects" && (
              <div className="absolute left-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200 z-50 overflow-hidden">
                <ul>
                  {item.items.map((subItem, subIdx) => (
                    <li key={subItem.id || subIdx}>
                      <span
                        className="block px-5 py-2 text-gray-700 hover:text-black hover:bg-card-border cursor-pointer transition-all duration-200"
                        onClick={() => {
                          if (item.element === "Services") {
                            navigate(`/service/${subItem.slug}`);
                          }
                        }}
                      >
                        {subItem.name || subItem}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Desktop Auth Buttons */}
      <div className='hidden lg:flex items-center gap-3 pr-6'>
        {!!isAuthenticated ? (
          <button
            className='flex justify-center items-center h-10 w-10 gap-2 text-gray-700 border-1 border-gray-300 hover:text-text hover:bg-card-bg hover:border-card-border rounded-full transition-all duration-300 cursor-pointer'
            onClick={() => setIsHamOpen(true)}
          >
            {user?.profilePic ? (
              <span className='text-2xl w-full h-full flex justify-center items-center'>
                <img src={user.profilePic} alt="Profile" className='h-full w-full object-cover rounded-full' />
              </span>
            ) : (
              <span className='text-2xl w-full h-full flex justify-center items-center'>
                <FaUserAlt className="text-lg" />
              </span>
            )}
          </button>
        ) : (
          <>
            <button
              className="cursor-pointer px-4 py-2 hover:bg-button-hover rounded-xl transition-all duration-300 font-medium"
              onClick={() => openAuthModal('login')}
            >
              Login
            </button>
            <button
              className="cursor-pointer px-4 py-2 bg-button hover:bg-button-hover text-white hover:text-black rounded-xl transition-all duration-300 font-medium"
              onClick={() => openAuthModal('signup')}
            >
              Sign Up
            </button>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden pr-6">
        <button
          className="p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg lg:hidden">
          <nav className="flex flex-col py-4">
            {navItems.map((item, index) => (
              <NavLink
                to={item.path}
                key={index}
                className={({ isActive }) =>
                  `${isActive
                    ? "text-text bg-text-bg"
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  } px-6 py-3 text-sm font-medium transition-all duration-300`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.element}
              </NavLink>
            ))}

            {/* Mobile Auth Buttons */}
            <div className="px-6 py-4 border-t border-gray-200">
              {!!isAuthenticated ? (
                <>
                  <button
                    className='flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 w-full justify-start' onClick={handleAccountClick}
                  >
                    <FaUserAlt className="text-lg" />
                    <span className="text-sm font-medium">{user?.isAdmin ? "Account" : "Edit Profile"}</span>
                  </button>
                  <button className='px-4 py-2 font-semibold text-white bg-red-500 rounded-lg w-full mt-2' onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <div className="flex flex-col gap-3">
                  <button
                    className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 font-medium text-left"
                    onClick={() => {
                      openAuthModal('login');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Login
                  </button>
                  <button
                    className="px-4 py-2 bg-button rounded-xl transition-all duration-300 font-medium shadow-lg"
                    onClick={() => {
                      openAuthModal('signup');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}

      <AuthModals
        isOpen={isAuthOpen}
        onClose={closeAuthModal}
        initialMode={authMode}
      />

      <HamMenu
        isOpen={isHamOpen}
        onClose={closeHamMenu}
        handleLogout={handleLogout}
      />

      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={closeEditProfile}
      />
    </header>
  )
}

export default Header
