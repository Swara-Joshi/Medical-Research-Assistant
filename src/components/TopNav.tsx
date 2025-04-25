
import React from 'react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';

const TopNav = () => {
  return (
    <header className="bg-white dark:bg-gray-950 border-b sticky top-0 z-50">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <SidebarTrigger />
        </div>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 text-medical-600 dark:text-medical-400"
          >
            <path d="M8 2v4" />
            <path d="M16 2v4" />
            <path d="M3 10h18" />
            <path d="M4 6h16a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z" />
            <path d="M8 14h.01" />
            <path d="M12 14h.01" />
            <path d="M16 14h.01" />
            <path d="M8 18h.01" />
            <path d="M12 18h.01" />
            <path d="M16 18h.01" />
          </svg>
          <span className="font-bold text-xl">Medical Research Assistant</span>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button variant="ghost" className="text-medical-700 dark:text-medical-300">
            About
          </Button>
          <Button variant="ghost" className="text-medical-700 dark:text-medical-300">
            Documentation
          </Button>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
