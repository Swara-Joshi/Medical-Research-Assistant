
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { useAppContext } from '@/contexts/AppContext';

const ResultsPanel = () => {
  const { currentResponse, loading } = useAppContext();
  
  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Processing Query...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-medical-500 border-t-transparent"></div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (!currentResponse) {
    return null;
  }
  
  const { answer, results, query } = currentResponse;
  
  return (
    <div className="space-y-4 w-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Medical Research Answer</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">Query: "{query}"</p>
          <div className="bg-medical-50 dark:bg-medical-900/20 p-4 rounded-md">
            <p>{answer}</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Evidence Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" className="w-full">
            {results.map((result) => (
              <AccordionItem key={result.id} value={result.id}>
                <AccordionTrigger className="hover:bg-gray-50 dark:hover:bg-gray-900/30 px-3 rounded-md">
                  <div className="flex flex-col items-start text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{result.source.title}</span>
                      <Badge variant="outline" className="bg-medical-100 text-medical-700 dark:bg-medical-900/40 dark:text-medical-300">
                        {result.source.year}
                      </Badge>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {result.source.authors.join(", ")}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 py-3 bg-gray-50 dark:bg-gray-900/20 rounded-md mt-1">
                  <p className="mb-4">{result.text}</p>
                  <div className="text-sm">
                    {result.source.journal && (
                      <p className="text-gray-600 dark:text-gray-400">
                        <span className="font-medium">Journal:</span> {result.source.journal}
                      </p>
                    )}
                    {result.source.doi && (
                      <p className="text-gray-600 dark:text-gray-400">
                        <span className="font-medium">DOI:</span> {result.source.doi}
                      </p>
                    )}
                    {result.source.url && (
                      <p className="text-gray-600 dark:text-gray-400">
                        <span className="font-medium">URL:</span>{" "}
                        <a 
                          href={result.source.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-medical-600 dark:text-medical-400 hover:underline"
                        >
                          {result.source.url}
                        </a>
                      </p>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsPanel;
