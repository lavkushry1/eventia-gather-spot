
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/common/PageTransition';
import EventCard from '@/components/home/EventCard';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { iplMatches } from '@/data/iplData';
import { format } from 'date-fns';
import { MapPin, Calendar, Clock } from 'lucide-react';

const IPLTickets = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedVenue, setSelectedVenue] = useState<string | null>(null);
  const navigate = useNavigate();
  
  // Extract unique dates and venues for filters
  const uniqueDates = Array.from(new Set(iplMatches.map(match => 
    format(match.date, 'yyyy-MM-dd')
  ))).sort();
  
  const uniqueVenues = Array.from(new Set(iplMatches.map(match => 
    match.location.split(',')[0].trim()
  ))).sort();
  
  // Filter matches based on selected filters
  const filteredMatches = iplMatches.filter(match => {
    const matchDateStr = format(match.date, 'yyyy-MM-dd');
    const matchVenue = match.location.split(',')[0].trim();
    
    if (selectedDate && matchDateStr !== selectedDate) return false;
    if (selectedVenue && matchVenue !== selectedVenue) return false;
    
    return true;
  });

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative h-64 md:h-80 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/90 to-blue-600/90" />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center text-white px-4"
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-4">IPL 2024 Tickets</h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto">
                  Book official tickets for the Indian Premier League 2024 season. Don't miss the action!
                </p>
              </motion.div>
            </div>
          </section>
          
          {/* Filters Section */}
          <section className="py-8 bg-secondary/30">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="w-full md:w-auto">
                  <h2 className="text-xl font-semibold mb-2">Filter Matches</h2>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                  <select 
                    className="w-full sm:w-auto px-4 py-2 rounded-md border border-border bg-background"
                    value={selectedDate || ''}
                    onChange={(e) => setSelectedDate(e.target.value || null)}
                  >
                    <option value="">All Dates</option>
                    {uniqueDates.map(date => (
                      <option key={date} value={date}>
                        {format(new Date(date), 'dd MMM yyyy')}
                      </option>
                    ))}
                  </select>
                  
                  <select
                    className="w-full sm:w-auto px-4 py-2 rounded-md border border-border bg-background"
                    value={selectedVenue || ''}
                    onChange={(e) => setSelectedVenue(e.target.value || null)}
                  >
                    <option value="">All Venues</option>
                    {uniqueVenues.map(venue => (
                      <option key={venue} value={venue}>{venue}</option>
                    ))}
                  </select>
                  
                  <AnimatedButton
                    variant="outline"
                    onClick={() => {
                      setSelectedDate(null);
                      setSelectedVenue(null);
                    }}
                  >
                    Clear Filters
                  </AnimatedButton>
                </div>
              </div>
            </div>
          </section>
          
          {/* Matches Section */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8">Available Matches</h2>
              
              {filteredMatches.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-xl text-muted-foreground">No matches found with the selected filters.</p>
                  <AnimatedButton 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      setSelectedDate(null);
                      setSelectedVenue(null);
                    }}
                  >
                    Reset Filters
                  </AnimatedButton>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMatches.map((match, index) => (
                    <div key={match.id} className="rounded-xl overflow-hidden border border-border/40 bg-card hover:shadow-lg transition-shadow group">
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={match.imageUrl} 
                          alt={match.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex justify-between items-center">
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent/90 text-white">
                              IPL 2024
                            </span>
                            <span className="text-white font-bold text-xl">
                              ₹{match.price.toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-5">
                        <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{format(match.date, 'EEE, dd MMM yyyy')}</span>
                          <Clock className="h-4 w-4 ml-2" />
                          <span>{format(match.date, 'h:mm a')}</span>
                        </div>
                        
                        <h3 className="text-xl font-semibold mb-2">
                          {match.homeTeam} vs {match.awayTeam}
                        </h3>
                        
                        <div className="flex items-center gap-1 text-muted-foreground mb-4">
                          <MapPin className="h-4 w-4" />
                          <span>{match.location}</span>
                        </div>
                        
                        <AnimatedButton 
                          fullWidth 
                          variant="accent"
                          onClick={() => navigate(`/events/${match.id}`)}
                        >
                          View Tickets
                        </AnimatedButton>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
          
          {/* Information Section */}
          <section className="py-12 bg-secondary/20">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="p-6 rounded-xl bg-card border border-border/40">
                  <h3 className="text-xl font-semibold mb-3">Ticket Information</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Tickets are available in multiple categories</li>
                    <li>• Children above 3 years require a ticket</li>
                    <li>• Entry through designated gates only</li>
                    <li>• Digital tickets will be sent to your email</li>
                  </ul>
                </div>
                
                <div className="p-6 rounded-xl bg-card border border-border/40">
                  <h3 className="text-xl font-semibold mb-3">Match Day Guidelines</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Gates open 2 hours before match time</li>
                    <li>• Bring a valid photo ID for verification</li>
                    <li>• No outside food or beverages allowed</li>
                    <li>• Follow all stadium safety protocols</li>
                  </ul>
                </div>
                
                <div className="p-6 rounded-xl bg-card border border-border/40">
                  <h3 className="text-xl font-semibold mb-3">Cancellation Policy</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Full refund if match is cancelled</li>
                    <li>• 50% refund if cancelled 7 days before</li>
                    <li>• No refund for postponed matches</li>
                    <li>• Contact support for assistance</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default IPLTickets;
