// src/components/Sidebar.jsx
import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  AlertTriangle,
  AlertCircle,
  Package,
  Users,
  Shield,
  Settings,
  ChevronRight,
  ChevronLeft,
  LogOut,
  X
} from "lucide-react";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/tenders", label: "Tenders", icon: FileText },
  { path: "/clashes", label: "Clashes", icon: AlertTriangle },
  { path: "/issues", label: "Issues", icon: AlertCircle },
  { path: "/inventory", label: "Inventory", icon: Package },
  { path: "/users", label: "Users", icon: Users },
  { path: "/roles", label: "Roles", icon: Shield },
  { path: "/features", label: "Features", icon: Settings },
];

const quickLinks = [
  { label: "Settings", icon: Settings },
  { label: "Logout", icon: LogOut },
];

const Sidebar = ({ isMobile, isCollapsed, isOpen, onToggleCollapse }) => {
  const location = useLocation();
  const [hoverIndex, setHoverIndex] = useState(null);
  
  // Handle sidebar visibility based on props
  const sidebarVisible = isMobile ? isOpen : true;

  // Handle closing sidebar when clicking a link on mobile
  const handleLinkClick = () => {
    if (isMobile && isOpen) {
      onToggleCollapse(false);
    }
  };

  if (!sidebarVisible) {
    return null;
  }

  return (
    <>
      {/* Backdrop for mobile */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-40 z-20" 
          onClick={() => onToggleCollapse(false)}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`
          ${isMobile ? 'fixed inset-y-0 left-0 z-30' : 'relative'} 
          ${isCollapsed && !isMobile ? 'w-20' : 'w-64'} 
          bg-white min-h-screen shadow-md flex flex-col transition-all duration-300
        `}
      >
        {/* Logo area */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          {(!isCollapsed || isMobile) && (
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              AdminPanel
            </h2>
          )}
          
          <button 
            onClick={() => onToggleCollapse(!isCollapsed)} 
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isMobile ? (
              <X className="h-5 w-5 text-gray-500" />
            ) : (
              isCollapsed ? (
                <ChevronRight className="h-5 w-5 text-gray-500" /> 
              ) : (
                <ChevronLeft className="h-5 w-5 text-gray-500" />
              )
            )}
          </button>
        </div>
        
        {/* Main navigation */}
        <nav className="p-3 flex-grow overflow-y-auto">
          <div className={`${!isCollapsed || isMobile ? "mb-3 px-3" : "mb-2"}`}>
            {(!isCollapsed || isMobile) && <p className="text-xs uppercase text-gray-500 font-semibold">Main Navigation</p>}
            {isCollapsed && !isMobile && <div className="h-px bg-gray-200 my-2"></div>}
          </div>
          
          <div className="space-y-1">
            {navItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={handleLinkClick}
                className={`flex items-center px-3 py-2.5 rounded-lg transition-all ${
                  location.pathname === item.path 
                    ? "bg-blue-50 text-blue-600" 
                    : "text-gray-600 hover:bg-gray-50"
                } ${hoverIndex === index ? "shadow-sm" : ""}`}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <div className={`${location.pathname === item.path 
                  ? "bg-blue-100" 
                  : "bg-gray-100"} p-2 rounded-lg mr-3`}>
                  <item.icon className={`h-5 w-5 ${
                    location.pathname === item.path ? "text-blue-600" : "text-gray-500"
                  }`} />
                </div>
                {(!isCollapsed || isMobile) && (
                  <span className={`font-medium ${location.pathname === item.path && "font-semibold"}`}>
                    {item.label}
                  </span>
                )}
                {(!isCollapsed || isMobile) && location.pathname === item.path && (
                  <div className="ml-auto w-1.5 h-5 bg-blue-500 rounded-full"></div>
                )}
              </Link>
            ))}
          </div>
        </nav>
        
        {/* Quick links / footer */}
        <div className="mt-auto p-3 border-t border-gray-100">
          {(!isCollapsed || isMobile) && (
            <p className="text-xs uppercase text-gray-500 font-semibold px-3 mb-2">Quick Links</p>
          )}
          <div className="space-y-1">
            {quickLinks.map((item, index) => (
              <a
                key={item.label}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick();
                }}
                className="flex items-center px-3 py-2.5 rounded-lg transition-all text-gray-600 hover:bg-gray-50"
              >
                <div className="bg-gray-100 p-2 rounded-lg mr-3">
                  <item.icon className="h-5 w-5 text-gray-500" />
                </div>
                {(!isCollapsed || isMobile) && <span className="font-medium">{item.label}</span>}
              </a>
            ))}
          </div>
        </div>
        
        {/* User profile */}
        {(!isCollapsed || isMobile) ? (
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="h-9 w-9 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium">
                JD
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">John Doe</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-3 border-t border-gray-100 flex justify-center">
            <div className="h-9 w-9 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium">
              JD
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;