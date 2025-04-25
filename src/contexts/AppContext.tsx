
import React, { createContext, useContext, useState } from 'react';
import { SearchFilters, HistoryItem, QueryResponse } from '../types';

interface AppContextType {
  history: HistoryItem[];
  addHistoryItem: (item: HistoryItem) => void;
  clearHistory: () => void;
  filters: SearchFilters;
  setFilters: (filters: SearchFilters) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  currentResponse: QueryResponse | null;
  setCurrentResponse: (response: QueryResponse | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [filters, setFilters] = useState<SearchFilters>({
    sourceTypes: ['literature', 'clinical_trials', 'guidelines'],
  });
  const [loading, setLoading] = useState(false);
  const [currentResponse, setCurrentResponse] = useState<QueryResponse | null>(null);

  const addHistoryItem = (item: HistoryItem) => {
    setHistory((prev) => [item, ...prev]);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <AppContext.Provider
      value={{
        history,
        addHistoryItem,
        clearHistory,
        filters,
        setFilters,
        loading,
        setLoading,
        currentResponse,
        setCurrentResponse,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
