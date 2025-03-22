
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Calendar, MapPin } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/common/PageTransition';
import EventCard from '@/components/home/EventCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { eventsData, eventCategories } from '@/data/eventsData';
import { Card, CardContent } from '@/components/ui/card';

const Events = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter events by category and search query
  const filteredEvents = eventsData.filter(event => {
    const matchesCategory = selectedCategory === 'all' || 
                           event.category.toLowerCase() === selectedCategory.toLowerCase();
    
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-primary/90 to-accent/90 text-white py-16">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-3xl mx-auto"
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Amazing Events</h1>
                <p className="text-lg opacity-90 mb-8">
                  Find and book tickets for the best events happening in Bengaluru
                </p>
                
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-5 w-5" />
                    <Input 
                      placeholder="Search events, artists, venues..." 
                      className="pl-10 bg-transparent border-white/30 text-white placeholder:text-white/70 w-full"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex-1 relative hidden md:block">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-5 w-5" />
                    <Input 
                      placeholder="Location" 
                      className="pl-10 bg-transparent border-white/30 text-white placeholder:text-white/70"
                      defaultValue="Bengaluru"
                    />
                  </div>
                  <div className="flex-1 relative hidden md:block">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-5 w-5" />
                    <Input 
                      placeholder="Date" 
                      className="pl-10 bg-transparent border-white/30 text-white placeholder:text-white/70"
                      type="date"
                    />
                  </div>
                  <Button className="bg-white text-primary hover:bg-white/90 font-medium">
                    Find Events
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>
          
          {/* Categories Section */}
          <section className="py-8 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="flex items-center space-x-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
                {eventCategories.map((category, i) => (
                  <motion.button
                    key={category.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex items-center ${
                      selectedCategory === category.id
                        ? 'bg-accent text-white'
                        : 'bg-secondary/50 text-foreground hover:bg-secondary/80'
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </motion.button>
                ))}
              </div>
            </div>
          </section>
          
          {/* Events Listing Section */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">
                  {selectedCategory === 'all' 
                    ? 'All Events' 
                    : eventCategories.find(c => c.id === selectedCategory)?.name || 'Events'}
                </h2>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                  <select 
                    className="p-2 rounded-md border border-input bg-background text-sm"
                    defaultValue="recommended"
                  >
                    <option value="recommended">Recommended</option>
                    <option value="date">Date</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>
              
              {filteredEvents.length === 0 ? (
                <Card className="w-full p-8 text-center">
                  <CardContent>
                    <h3 className="text-xl font-semibold mb-2">No events found</h3>
                    <p className="text-muted-foreground">Try adjusting your filters or search query</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEvents.map((event, index) => (
                    <EventCard 
                      key={event.id} 
                      event={event} 
                      index={index}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
          
          {/* Featured Cities Section */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-6">Browse Events by City</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {['Bengaluru', 'Mumbai', 'Delhi', 'Chennai', 'Hyderabad', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Chandigarh', 'Kochi'].map((city, index) => (
                  <motion.div
                    key={city}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-card rounded-lg p-4 text-center hover:shadow-md transition-all border border-border/40"
                  >
                    <p className="font-medium">{city}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Events;
