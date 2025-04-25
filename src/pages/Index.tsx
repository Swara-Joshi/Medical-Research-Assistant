
import React from 'react';
import { AppProvider } from '@/contexts/AppContext';
import TopNav from '@/components/TopNav';
import SearchBox from '@/components/SearchBox';
import FilterPanel from '@/components/FilterPanel';
import ResultsPanel from '@/components/ResultsPanel';
import HistorySidebar from '@/components/HistorySidebar';
import { SidebarProvider, Sidebar, SidebarContent } from '@/components/ui/sidebar';

const Index = () => {
  return (
    <AppProvider>
      <SidebarProvider defaultOpen={true}>
        <div className="min-h-screen flex w-full flex-col">
          <TopNav />
          <div className="flex flex-1">
            <Sidebar collapsible="offcanvas" className="border-r">
              <SidebarContent>
                <HistorySidebar />
              </SidebarContent>
            </Sidebar>
            <main className="flex-1 container py-6">
              <div className="grid gap-6 md:grid-cols-[300px_1fr] lg:grid-cols-[250px_1fr] xl:grid-cols-[300px_1fr]">
                <div>
                  <FilterPanel />
                </div>
                <div className="space-y-6">
                  <SearchBox />
                  <ResultsPanel />
                </div>
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </AppProvider>
  );
};

export default Index;
