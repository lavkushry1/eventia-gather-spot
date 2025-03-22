
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Info, 
  Plus, 
  Minus,
  Ticket 
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/common/PageTransition';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { iplMatches, getTicketCategories } from '@/data/iplData';
import { EventProps } from '@/components/home/EventCard';

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState<EventProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedTicketType, setSelectedTicketType] = useState('general');
  
  // Simulate fetching event details
  useEffect(() => {
    // Try to find the event in the IPL matches first
    const iplMatch = iplMatches.find(event => event.id === id);
    
    // If found, set event data, otherwise fetch from other sources
    if (iplMatch) {
      setEventData(iplMatch);
      setLoading(false);
    } else {
      // Simulate an API call to get event data
      const timer = setTimeout(() => {
        // This would be replaced with an actual API call
        const mockEvent: EventProps = {
          id: id || 'unknown',
          title: 'Event Title',
          description: 'Event description would go here with details about the event.',
          date: new Date(),
          location: 'Event Venue, City',
          imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
          price: 999,
          category: 'Entertainment',
          attendees: 100,
        };
        
        setEventData(mockEvent);
        setLoading(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [id]);
  
  const ticketCategories = eventData?.id ? getTicketCategories(eventData.id) : [];
  const selectedTicket = ticketCategories.find(t => t.id === selectedTicketType) || ticketCategories[0];
  
  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= 10) {
      setQuantity(value);
    }
  };
  
  const handleProceedToCheckout = () => {
    if (!eventData) return;
    
    // Save selected event and ticket details to localStorage or state management
    localStorage.setItem('selectedEvent', JSON.stringify({
      ...eventData,
      ticketType: selectedTicket,
      quantity: quantity,
      totalPrice: selectedTicket.price * quantity
    }));
    
    toast({
      title: "Tickets Selected!",
      description: `${quantity} ${selectedTicket.name} tickets for ${eventData.homeTeam || eventData.title}`,
    });
    
    navigate('/checkout');
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="mb-4 text-2xl font-bold text-accent">Loading Event</div>
          <div className="flex space-x-2">
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!eventData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Event Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The event you're looking for doesn't exist or has been removed.
          </p>
          <AnimatedButton onClick={() => navigate('/')}>
            Back to Home
          </AnimatedButton>
        </div>
      </div>
    );
  }
  
  const isIplMatch = eventData.homeTeam && eventData.awayTeam;
  const eventTitle = isIplMatch ? `${eventData.homeTeam} vs ${eventData.awayTeam}` : eventData.title;

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          {/* Hero Section */}
          <div className="relative h-64 md:h-96 overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center" 
              style={{ backgroundImage: `url(${eventData.imageUrl})` }} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
            <div className="container mx-auto px-4 h-full flex items-end pb-8">
              <div className="text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {eventTitle}
                </h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {format(eventData.date, 'EEEE, MMMM d, yyyy')}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    {format(eventData.date, 'h:mm a')}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {eventData.location}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Event Details Column */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-card rounded-xl border border-border/40 p-6 mb-8"
                >
                  <h2 className="text-2xl font-bold mb-4">Event Details</h2>
                  <p className="text-muted-foreground mb-6">{eventData.description}</p>
                  
                  {/* Additional Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 mr-3 text-accent" />
                      <div>
                        <p className="font-medium">Expected Attendance</p>
                        <p className="text-muted-foreground">{eventData.attendees.toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Ticket className="h-5 w-5 mr-3 text-accent" />
                      <div>
                        <p className="font-medium">Ticket Types</p>
                        <p className="text-muted-foreground">{ticketCategories.length} categories available</p>
                      </div>
                    </div>
                    
                    {eventData.venueCapacity && (
                      <div className="flex items-center">
                        <Info className="h-5 w-5 mr-3 text-accent" />
                        <div>
                          <p className="font-medium">Venue Capacity</p>
                          <p className="text-muted-foreground">{eventData.venueCapacity.toLocaleString()} seats</p>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
                
                {/* Ticket Categories */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-card rounded-xl border border-border/40 p-6 mb-8"
                >
                  <h2 className="text-2xl font-bold mb-4">Ticket Categories</h2>
                  
                  <div className="space-y-4">
                    {ticketCategories.map((ticket) => (
                      <div 
                        key={ticket.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          selectedTicketType === ticket.id 
                            ? 'border-accent bg-accent/5' 
                            : 'border-border hover:border-accent/50'
                        }`}
                        onClick={() => setSelectedTicketType(ticket.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{ticket.name}</h3>
                            <p className="text-muted-foreground text-sm">{ticket.description}</p>
                            <p className="text-sm mt-1">
                              <span className="text-green-600">{ticket.available}</span> tickets left
                            </p>
                          </div>
                          <div className="text-xl font-bold">₹{ticket.price.toLocaleString('en-IN')}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
                
                {/* Venue Information */}
                {isIplMatch && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-card rounded-xl border border-border/40 p-6"
                  >
                    <h2 className="text-2xl font-bold mb-4">Venue Information</h2>
                    <div className="mb-4">
                      <h3 className="font-semibold text-lg mb-2">{eventData.location}</h3>
                      <p className="text-muted-foreground">
                        Please arrive at least 1 hour before the match starts to avoid any last-minute rush.
                        Gates open 2 hours before the scheduled match time.
                      </p>
                    </div>
                    
                    <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-secondary/30">
                      <div className="flex items-center justify-center h-full">
                        <p className="text-muted-foreground">Venue map will be available soon</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
              
              {/* Booking Column */}
              <div className="lg:sticky lg:top-24 h-fit">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-card rounded-xl border border-border/40 p-6"
                >
                  <h2 className="text-2xl font-bold mb-4">Book Tickets</h2>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">
                      Selected Ticket Type
                    </label>
                    <div className="p-3 bg-secondary/30 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{selectedTicket?.name}</span>
                        <span className="font-bold">₹{selectedTicket?.price.toLocaleString('en-IN')}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{selectedTicket?.description}</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">
                      Number of Tickets
                    </label>
                    <div className="flex items-center">
                      <button
                        onClick={() => handleQuantityChange(quantity - 1)}
                        disabled={quantity <= 1}
                        className="p-2 rounded-l-md border border-border bg-secondary/30 disabled:opacity-50"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={quantity}
                        onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                        className="w-16 h-10 text-center border-y border-border"
                      />
                      <button
                        onClick={() => handleQuantityChange(quantity + 1)}
                        disabled={quantity >= 10}
                        className="p-2 rounded-r-md border border-border bg-secondary/30 disabled:opacity-50"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="border-t border-border pt-4 mb-6">
                    <div className="flex justify-between mb-2">
                      <span>Price per ticket</span>
                      <span>₹{selectedTicket?.price.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Quantity</span>
                      <span>{quantity}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>₹{(selectedTicket?.price * quantity).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                  
                  <AnimatedButton
                    variant="accent"
                    fullWidth
                    size="lg"
                    onClick={handleProceedToCheckout}
                  >
                    Proceed to Checkout
                  </AnimatedButton>
                  
                  <p className="text-xs text-muted-foreground text-center mt-4">
                    By proceeding, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </motion.div>
                
                {/* Additional Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="mt-6 p-4 bg-secondary/30 rounded-xl text-sm"
                >
                  <div className="flex items-start gap-2">
                    <Info className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Important Information</p>
                      <ul className="mt-2 space-y-1 text-muted-foreground list-disc list-inside">
                        <li>Tickets cannot be cancelled once purchased</li>
                        <li>Entry with valid ID proof only</li>
                        <li>No outside food or drinks allowed</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default EventDetail;
