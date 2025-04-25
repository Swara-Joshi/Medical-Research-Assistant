
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useAppContext } from '@/contexts/AppContext';
import { searchMedicalLiterature } from '@/services/api';

const SearchBox = () => {
  const [query, setQuery] = useState('');
  const { filters, setLoading, setCurrentResponse, addHistoryItem } = useAppContext();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) {
      toast({
        title: "Query Required",
        description: "Please enter a medical query.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    try {
      const response = await searchMedicalLiterature(query, filters);
      setCurrentResponse(response);
      
      // Add to history
      addHistoryItem({
        id: crypto.randomUUID(),
        query,
        timestamp: new Date().toISOString(),
        response
      });
      
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Search Failed",
        description: "Failed to process your query. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Enter your medical research query (e.g., 'What are the latest treatments for type 2 diabetes?')"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="min-h-[120px] resize-none"
          />
          <div className="flex justify-end">
            <Button type="submit" className="bg-medical-600 hover:bg-medical-700">
              Search Medical Literature
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SearchBox;
