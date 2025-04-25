
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppContext } from '@/contexts/AppContext';

const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: 30 }, (_, i) => currentYear - i);

const FilterPanel = () => {
  const { filters, setFilters } = useAppContext();
  
  const handleSourceTypeChange = (sourceType: string, checked: boolean) => {
    if (checked) {
      setFilters({
        ...filters,
        sourceTypes: [...filters.sourceTypes, sourceType]
      });
    } else {
      setFilters({
        ...filters,
        sourceTypes: filters.sourceTypes.filter(type => type !== sourceType)
      });
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Publication Date</h3>
          <div className="flex items-center gap-2">
            <Select
              value={filters.startYear?.toString() || ""}
              onValueChange={(value) => setFilters({
                ...filters,
                startYear: value ? parseInt(value) : undefined
              })}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="From Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Year</SelectItem>
                {yearOptions.map((year) => (
                  <SelectItem key={`from-${year}`} value={year.toString()}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span>to</span>
            <Select
              value={filters.endYear?.toString() || ""}
              onValueChange={(value) => setFilters({
                ...filters,
                endYear: value ? parseInt(value) : undefined
              })}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="To Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="present">Present</SelectItem>
                {yearOptions.map((year) => (
                  <SelectItem key={`to-${year}`} value={year.toString()}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Source Types</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="literature" 
                checked={filters.sourceTypes.includes('literature')}
                onCheckedChange={(checked) => handleSourceTypeChange('literature', checked as boolean)}
              />
              <Label htmlFor="literature">Medical Literature</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="clinical_trials" 
                checked={filters.sourceTypes.includes('clinical_trials')}
                onCheckedChange={(checked) => handleSourceTypeChange('clinical_trials', checked as boolean)}
              />
              <Label htmlFor="clinical_trials">Clinical Trials</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="guidelines" 
                checked={filters.sourceTypes.includes('guidelines')}
                onCheckedChange={(checked) => handleSourceTypeChange('guidelines', checked as boolean)}
              />
              <Label htmlFor="guidelines">Treatment Guidelines</Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterPanel;
