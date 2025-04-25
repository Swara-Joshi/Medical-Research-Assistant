
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useAppContext } from '@/contexts/AppContext';
import { format } from 'date-fns';

const HistorySidebar = () => {
  const { history, clearHistory, setCurrentResponse } = useAppContext();
  
  const handleHistoryItemClick = (index: number) => {
    if (history[index].response) {
      setCurrentResponse(history[index].response);
    }
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Search History</h2>
        {history.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={clearHistory}
            className="h-8 text-xs"
          >
            Clear All
          </Button>
        )}
      </div>
      <Separator />
      <ScrollArea className="flex-1">
        {history.length > 0 ? (
          <div className="p-4 space-y-4">
            {history.map((item, index) => (
              <div 
                key={item.id}
                onClick={() => handleHistoryItemClick(index)}
                className="p-3 rounded-md bg-gray-50 dark:bg-gray-900/30 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900/50 transition-colors"
              >
                <p className="font-medium text-sm line-clamp-2">{item.query}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {format(new Date(item.timestamp), 'MMM d, yyyy • h:mm a')}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-center px-4">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Your search history will appear here
            </p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default HistorySidebar;
