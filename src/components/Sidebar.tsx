import React from 'react';
import { FaFlag, FaPassport } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
import SwashIcon from '../assets/swash-flag-logo.png';
import { NavLink } from 'react-router';

const SidebarItem: React.FC<{
  isOpen: boolean;
  tooltipContent: string;
  icon: React.ReactNode;
  to: string;
  children: React.ReactNode;
}> = ({ isOpen, tooltipContent, icon, to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `p-4 hover:bg-gray-200 cursor-pointer flex items-center ${
          isOpen ? 'space-x-2' : 'justify-center'
        } ${isActive ? 'text-blue-500' : 'text-gray-800'}`
      }
      data-tooltip-id="sidebar-tooltip"
      data-tooltip-content={tooltipContent}
    >
      {icon}
      {isOpen && <span>{children}</span>}
    </NavLink>
  );
};

const Sidebar: React.FC<{
  isOpen: boolean;
  onToggle: () => void;
}> = ({ isOpen, onToggle }) => {
  return (
    <div
      className={`bg-white shadow-md h-screen transition-all duration-200 ${
        isOpen ? 'w-48' : 'w-16'
      }`}
    >
      <div
        className={`p-4 flex gap-2 ${isOpen ? 'flex-row' : 'flex-col items-center'}`}
      >
        <button
          onClick={onToggle}
          className="text-gray-600 hover:text-gray-800 cursor-pointer"
        >
          {isOpen ? '←' : '→'}
        </button>
        <img
          src={SwashIcon}
          className="w-8 h-8 rounded-full"
          alt="swash-icon"
        />
      </div>
      <nav className="mt-4">
        <ul>
          <SidebarItem
            isOpen={isOpen}
            tooltipContent="Flags"
            icon={<FaFlag className="text-xl text-gray-800" />}
            to="/dashboard"
          >
            Flags
          </SidebarItem>
          <SidebarItem
            isOpen={isOpen}
            tooltipContent="API Tokens"
            icon={<FaPassport className="text-xl text-gray-800" />}
            to="/api-tokens"
          >
            API Tokens
          </SidebarItem>
        </ul>
      </nav>
      {!isOpen && <Tooltip id="sidebar-tooltip" place="right" />}
    </div>
  );
};

export default Sidebar;
