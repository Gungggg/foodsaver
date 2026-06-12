import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:ml-[280px] flex flex-col h-screen overflow-hidden">
        {/* Mobile header */}
        <header className="bg-surface/80 backdrop-blur-md text-primary lg:hidden flex justify-between items-center px-gutter py-base w-full shadow-sm sticky top-0 z-30">
          <div className="text-headline-sm font-headline-sm font-bold text-primary">FoodSaver</div>
          <button onClick={() => setSidebarOpen(true)} className="text-on-surface-variant p-2 rounded-full hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-gutter lg:p-lg">
          <div className="max-w-container-max mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
