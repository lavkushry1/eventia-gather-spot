
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import EventCard, { EventProps } from './EventCard';
import AnimatedButton from '../ui/AnimatedButton';

interface FeaturedEventsProps {
  events: EventProps[];
}

const FeaturedEvents: React.FC<FeaturedEventsProps> = ({ events }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const categories = [
    { id: 'all', name: 'All Events' },
    { id: 'music', name: 'Music' },
    { id: 'conferences', name: 'Conferences' },
    { id: 'workshops', name: 'Workshops' },
    { id: 'sports', name: 'Sports' },
  ];
  
  const filteredEvents = selectedCategory === 'all' 
    ? events 
    : events.filter(event => event.category.toLowerCase() === selectedCategory.toLowerCase());
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold mb-2"
            >
              Featured Events
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-muted-foreground max-w-2xl"
            >
              Discover the most popular events happening around you and book tickets before they sell out.
            </motion.p>
          </div>
          
          <Link to="/events">
            <AnimatedButton
              variant="ghost"
              className="mt-4 md:mt-0"
            >
              View All Events
              <ArrowRight className="ml-2 h-4 w-4" />
            </AnimatedButton>
          </Link>
        </div>
        
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
          {categories.map((category, i) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category.id
                  ? 'bg-accent text-white'
                  : 'bg-secondary text-foreground hover:bg-secondary/80'
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </motion.button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event, index) => (
            <EventCard 
              key={event.id} 
              event={event} 
              index={index}
              variant={index === 0 ? 'featured' : 'default'}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
