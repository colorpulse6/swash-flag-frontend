import { Outlet } from 'react-router';
import Sidebar from './Sidebar';
import { useState } from 'react';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex">
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
