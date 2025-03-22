
import { useState } from 'react';
import { format, addMonths, subMonths, isSameDay, isSameMonth, isToday } from 'date-fns';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface DateSelectorProps {
  selectedDate: Date | null;
  onDateChange: (date: Date) => void;
  className?: string;
  minDate?: Date;
  maxDate?: Date;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  selectedDate,
  onDateChange,
  className,
  minDate = new Date(),
  maxDate = addMonths(new Date(), 6),
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const daysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const firstDayOfWeek = firstDay.getDay(); // 0 for Sunday, 1 for Monday, etc.
    
    // Get days from previous month to fill the first week
    const daysFromPrevMonth = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
    
    const days = [];
    
    // Add days from previous month
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = prevMonthDays - daysFromPrevMonth + 1; i <= prevMonthDays; i++) {
      days.push({
        date: new Date(year, month - 1, i),
        isCurrentMonth: false,
      });
    }
    
    // Add days from current month
    const lastDay = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= lastDay; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }
    
    // Add days from next month to complete the grid (up to 42 cells for 6 weeks)
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }
    
    return days;
  };

  const isDateSelectable = (date: Date) => {
    return date >= minDate && date <= maxDate;
  };

  return (
    <div className={cn("relative", className)}>
      <Button
        variant="outline"
        className="w-full justify-between"
        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
      >
        <span>{selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Select a date'}</span>
        <CalendarIcon className="ml-2 h-4 w-4" />
      </Button>
      
      <AnimatePresence>
        {isCalendarOpen && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-2 rounded-lg glassmorphism p-4 w-[320px] shadow-elevation-3"
          >
            <div className="flex items-center justify-between mb-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={prevMonth}
                disabled={isSameMonth(subMonths(currentMonth, 1), subMonths(minDate, 1))}
                className="h-8 w-8 p-0"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </Button>
              <h4 className="text-lg font-medium">
                {format(currentMonth, 'MMMM yyyy')}
              </h4>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={nextMonth}
                disabled={isSameMonth(addMonths(currentMonth, 1), addMonths(maxDate, 1))}
                className="h-8 w-8 p-0"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                <div key={i} className="h-8 flex items-center justify-center text-xs font-medium text-muted-foreground">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {daysInMonth().map((day, i) => {
                const isSelected = selectedDate ? isSameDay(day.date, selectedDate) : false;
                const isSelectable = isDateSelectable(day.date);
                const isTodayDate = isToday(day.date);
                
                return (
                  <button
                    key={i}
                    type="button"
                    disabled={!isSelectable || !day.isCurrentMonth}
                    onClick={() => {
                      if (isSelectable && day.isCurrentMonth) {
                        onDateChange(day.date);
                        setIsCalendarOpen(false);
                      }
                    }}
                    className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center text-sm transition-colors",
                      !day.isCurrentMonth && "text-muted-foreground/30",
                      day.isCurrentMonth && !isSelected && isSelectable && "hover:bg-secondary",
                      isSelected && "bg-accent text-white",
                      isTodayDate && !isSelected && "border border-accent text-accent",
                      !isSelectable && day.isCurrentMonth && "text-muted-foreground cursor-not-allowed"
                    )}
                  >
                    {format(day.date, 'd')}
                  </button>
                );
              })}
            </div>
            
            <div className="mt-4 flex justify-end">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsCalendarOpen(false)}
              >
                Close
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DateSelector;
