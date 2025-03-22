
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

export interface EventProps {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  imageUrl: string;
  price: number;
  category: string;
  attendees: number;
  featured?: boolean;
  homeTeam?: string;
  awayTeam?: string;
  venueCapacity?: number;
}

interface EventCardProps {
  event: EventProps;
  index: number;
  variant?: 'default' | 'featured';
}

const EventCard: React.FC<EventCardProps> = ({ 
  event, 
  index, 
  variant = 'default'
}) => {
  const {
    id,
    title,
    description,
    date,
    location,
    imageUrl,
    price,
    category,
    attendees,
    featured,
    homeTeam,
    awayTeam,
  } = event;

  const isFeatured = variant === 'featured' || featured;
  const teamMatchup = homeTeam && awayTeam ? `${homeTeam} vs ${awayTeam}` : title;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className={cn(
        "overflow-hidden rounded-2xl border border-border/40 bg-card group card-hover",
        isFeatured ? "md:col-span-2" : ""
      )}
    >
      <Link to={`/events/${id}`} className="block h-full">
        <div className="relative h-48 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent/90 text-white backdrop-blur-sm">
              {category}
            </span>
            
            {featured && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/80 text-white backdrop-blur-sm">
                Featured
              </span>
            )}
          </div>
          
          <div className="absolute bottom-4 left-4">
            <p className="text-white font-bold text-xl drop-shadow-md">₹{price.toFixed(0)}</p>
          </div>
        </div>
        
        <div className="p-5">
          <div className="mb-2 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-accent" />
            <span className="text-sm text-muted-foreground">
              {format(date, 'EEE, MMM d, yyyy')}
            </span>
          </div>
          
          <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-accent transition-colors line-clamp-1">
            {teamMatchup}
          </h3>
          
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {description}
          </p>
          
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="truncate max-w-[150px]">{location}</span>
            </div>
            
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{attendees} attending</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default EventCard;
