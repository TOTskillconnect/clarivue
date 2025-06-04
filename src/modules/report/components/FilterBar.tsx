import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, X } from 'lucide-react';
import { format } from 'date-fns';
import { ReportFilters } from '../types';
import { cn } from '@/lib/utils';

interface FilterBarProps {
  filters: ReportFilters;
  onUpdateFilters: (filters: Partial<ReportFilters>) => void;
  roles?: string[];
  stages?: string[];
  interviewers?: string[];
  availableTags?: string[];
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onUpdateFilters,
  roles = [],
  stages = [],
  interviewers = [],
  availableTags = [],
}) => {
  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);
    
    onUpdateFilters({ dateRange: { start, end } });
  };

  const handleTagRemove = (tagToRemove: string) => {
    onUpdateFilters({
      tags: filters.tags?.filter(tag => tag !== tagToRemove) || [],
    });
  };

  const handleTagAdd = (tag: string) => {
    onUpdateFilters({
      tags: [...(filters.tags || []), tag],
    });
  };

  return (
    <div className="flex flex-wrap gap-3 items-center p-4 bg-gray-50 rounded-lg">
      {/* Role Filter */}
      <Select
        value={filters.role}
        onValueChange={(value) => onUpdateFilters({ role: value || undefined })}
      >
        <SelectTrigger className="w-[180px] bg-white">
          <SelectValue placeholder="Select Role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Roles</SelectItem>
          {roles.map((role) => (
            <SelectItem key={role} value={role}>
              {role}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Stage Filter */}
      <Select
        value={filters.stage}
        onValueChange={(value) => onUpdateFilters({ stage: value || undefined })}
      >
        <SelectTrigger className="w-[180px] bg-white">
          <SelectValue placeholder="Select Stage" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Stages</SelectItem>
          {stages.map((stage) => (
            <SelectItem key={stage} value={stage}>
              {stage}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Interviewer Filter */}
      <Select
        value={filters.interviewer}
        onValueChange={(value) => onUpdateFilters({ interviewer: value || undefined })}
      >
        <SelectTrigger className="w-[180px] bg-white">
          <SelectValue placeholder="Select Interviewer" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Interviewers</SelectItem>
          {interviewers.map((interviewer) => (
            <SelectItem key={interviewer} value={interviewer}>
              {interviewer}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Date Range Filter */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[180px] justify-start text-left font-normal bg-white",
              !filters.dateRange && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {filters.dateRange ? (
              format(filters.dateRange.start, "LLL dd, y")
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={filters.dateRange?.start}
            onSelect={handleDateSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {/* Tags Display */}
      <div className="flex flex-wrap gap-2">
        {filters.tags?.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="bg-white"
          >
            {tag}
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 ml-2"
              onClick={() => handleTagRemove(tag)}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
      </div>

      {/* Available Tags */}
      <Select
        onValueChange={handleTagAdd}
      >
        <SelectTrigger className="w-[180px] bg-white">
          <SelectValue placeholder="Add Tag" />
        </SelectTrigger>
        <SelectContent>
          {availableTags
            .filter(tag => !filters.tags?.includes(tag))
            .map((tag) => (
              <SelectItem key={tag} value={tag}>
                {tag}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      {/* Reset Filters */}
      {(filters.role || filters.stage || filters.interviewer || filters.dateRange || filters.tags?.length) && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onUpdateFilters({
            role: undefined,
            stage: undefined,
            interviewer: undefined,
            dateRange: undefined,
            tags: [],
          })}
          className="ml-auto"
        >
          Reset Filters
        </Button>
      )}
    </div>
  );
}; 