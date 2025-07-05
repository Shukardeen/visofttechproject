import React from "react";
import {
  FaHome,
  FaUsers,
  FaProjectDiagram,
  FaComments,
  FaCog,
  FaSignOutAlt,
  FaComment
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { logoutUser } from "../../Redux/Thunks/thunks.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Sidebar({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: <FaHome /> },
    { id: "users", label: "Users", icon: <FaUsers /> },
    { id: "projects", label: "Projects", icon: <FaProjectDiagram /> },
    { id: "contacts", label: "Contacts", icon: <FaComments /> },
    // { id: "testimonials", label: "Testimonials", icon: <FaComment /> },
    { id: 'settings', label: 'Settings', icon: <FaCog /> }
  ];

  const handleLogout = async () => {
    try {
      const result = await dispatch(logoutUser());
      if (logoutUser.fulfilled.match(result)) {
        navigate("/");
        toast.success("Logged out successfully");
      }
    } catch (error) {
      console.log("ERROR LOGGING OUT :: ", error);
      toast.error("Something went wrong");
    }
  }

  return (
    <div>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed top-0 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed h-screen w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <nav className="my-3 px-3 py-3">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setSidebarOpen(false);
                  setActiveTab(item.id);
                }}
                className={`cursor-pointer w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${activeTab === item.id
                    ? "bg-text text-white shadow-lg"
                    : "text-gray-700 hover:bg-card-bg hover:text-text"
                  }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </nav>

        <div className="p-2 border-t border-gray-200">
          <button className="w-full flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 cursor-pointer" onClick={handleLogout} >
            <FaSignOutAlt className="mr-3" />
            Logout
          </button>
          <button className="md:hidden w-full flex items-center px-2 py-2 text-sm font-medium text-gray-800 bg-gray-300 hover:bg-red-50 rounded-lg transition-all duration-300 cursor-pointer" onClick={() => setSidebarOpen(false)} >
            <IoClose className="mr-2 text-xl" />
            Close
          </button>
          
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
