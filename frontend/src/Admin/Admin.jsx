import React, { useState, useEffect } from "react";
import {
  Contacts,
  Dashboard,
  Projects,
  Sidebar,
  Users,
  Settings,
  TopBar,
} from "./Components/Components.js";

function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard setActiveTab={setActiveTab} />;
      case "users":
        return <Users />;
      case "projects":
        return <Projects />;
      case "contacts":
        return <Contacts />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex mt-18 h-screen overflow-hidden">
      {/* Sidebar (fixed on large, slide on small) */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        {/* TopBar for mobile */}
        {isMobile && <TopBar setSidebarOpen={setSidebarOpen} />}

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 capitalize">
              {activeTab}
            </h2>
            <p className="text-gray-600 mt-1">
              Manage your {activeTab} and monitor performance
            </p>
          </div>

          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default Admin;
