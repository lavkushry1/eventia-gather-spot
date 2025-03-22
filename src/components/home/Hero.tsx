
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Search } from 'lucide-react';
import AnimatedButton from '../ui/AnimatedButton';
import DateSelector from '../ui/DateSelector';

const Hero = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [location, setLocation] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  
  const locations = [
    'All Locations',
    'New York',
    'Los Angeles',
    'Chicago',
    'Miami',
    'San Francisco',
    'London',
    'Paris',
    'Tokyo',
  ];

  return (
    <section className="relative pt-20 pb-12 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/10 via-background to-background" />
      
      <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/10 blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl -z-10" />
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-1.5 mb-6 rounded-full bg-accent/10 text-accent text-sm font-medium"
          >
            Discover events that match your passion
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold mb-6 text-balance"
          >
            Find and Book the Best
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-accent to-blue-500">
              Events Near You
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Discover concerts, conferences, workshops, and more. 
            Book tickets seamlessly and enjoy unforgettable experiences.
          </motion.p>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto glassmorphism rounded-xl p-4 md:p-6 shadow-glass-hover"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-5 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search events, artists, venues..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-12 pl-10 pr-4 rounded-lg border border-input bg-white/50 text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>
            
            <div className="md:col-span-3 relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full h-12 pl-10 pr-4 rounded-lg border border-input bg-white/50 text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-accent/50"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="md:col-span-3">
              <DateSelector
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                className="w-full"
              />
            </div>
            
            <div className="md:col-span-1 flex items-center justify-center">
              <AnimatedButton
                variant="accent"
                className="w-full h-12 md:w-12"
                aria-label="Search"
              >
                <Search className="h-5 w-5 md:mx-auto" />
                <span className="md:hidden ml-2">Search</span>
              </AnimatedButton>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-2 mt-6 text-sm text-muted-foreground"
        >
          <span>Popular:</span>
          {['Concerts', 'Festivals', 'Conferences', 'Sports', 'Workshops'].map((tag) => (
            <a
              key={tag}
              href="#"
              className="hover:text-accent transition-colors hover:underline underline-offset-4"
            >
              {tag}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
