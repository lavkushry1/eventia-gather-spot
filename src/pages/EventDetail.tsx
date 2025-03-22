
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, Share2, Heart, ChevronDown, ChevronUp, Plus, Minus, CheckCircle } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnimatedButton from '@/components/ui/AnimatedButton';
import PageTransition from '@/components/common/PageTransition';
import { format } from 'date-fns';
import { EventProps } from '@/components/home/EventCard';

// Sample event data (same as in Index.tsx)
const eventsData: EventProps[] = [
  {
    id: '1',
    title: 'Music Festival 2023',
    description: 'The biggest music festival of the year featuring top artists from around the world.',
    date: new Date(2023, 6, 15),
    location: 'Central Park, New York',
    imageUrl: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    price: 149.99,
    category: 'Music',
    attendees: 5280,
    featured: true,
  },
  {
    id: '2',
    title: 'Tech Conference 2023',
    description: 'Join tech leaders and innovators for three days of inspiring talks and workshops.',
    date: new Date(2023, 7, 22),
    location: 'Convention Center, San Francisco',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    price: 299.99,
    category: 'Conferences',
    attendees: 1820,
  },
];

// Extended event details
interface ExtendedEventDetails extends EventProps {
  organizer: string;
  contactEmail: string;
  contactPhone: string;
  website: string;
  fullDescription: string;
  schedule: Array<{
    time: string;
    activity: string;
  }>;
  ticketTypes: Array<{
    id: string;
    name: string;
    price: number;
    description: string;
    available: number;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

// Sample extended event data
const extendedEventData: Record<string, ExtendedEventDetails> = {
  '1': {
    ...eventsData[0],
    organizer: 'MusicLive Productions',
    contactEmail: 'info@musicfestival2023.com',
    contactPhone: '+1 (555) 123-4567',
    website: 'www.musicfestival2023.com',
    fullDescription: `
      Join us for the biggest music festival of the year featuring top artists from around the world. The Music Festival 2023 will feature over 50 artists across 5 stages, with performances spanning multiple genres including pop, rock, electronic, hip-hop, and indie.
      
      This three-day event includes food vendors from top local restaurants, art installations, and interactive experiences. Camp on-site or take advantage of our shuttle services from downtown.
      
      Don't miss this opportunity to see your favorite artists live and discover new music in the beautiful setting of Central Park.
    `,
    schedule: [
      { time: '10:00 AM', activity: 'Gates Open' },
      { time: '11:30 AM', activity: 'First Acts Begin (Stages 2-5)' },
      { time: '1:00 PM', activity: 'Main Stage Opening Acts' },
      { time: '4:30 PM', activity: 'Food & Drink Festival' },
      { time: '6:00 PM', activity: 'Supporting Artists' },
      { time: '8:30 PM', activity: 'Headliners Performance' },
      { time: '11:00 PM', activity: 'After Party Begins' },
    ],
    ticketTypes: [
      {
        id: 'general',
        name: 'General Admission',
        price: 149.99,
        description: 'Access to all stages and general festival grounds.',
        available: 2500,
      },
      {
        id: 'vip',
        name: 'VIP Access',
        price: 299.99,
        description: 'Priority entry, exclusive viewing areas, VIP lounges, and complimentary refreshments.',
        available: 500,
      },
      {
        id: 'premium',
        name: 'Premium Package',
        price: 499.99,
        description: 'All VIP benefits plus backstage tours, artist meet & greets, and exclusive merchandise.',
        available: 100,
      },
    ],
    faqs: [
      {
        question: 'What items are prohibited?',
        answer: 'Prohibited items include outside food and beverages, illegal substances, weapons, professional cameras, and drones. See our website for a complete list.',
      },
      {
        question: 'Is the event family-friendly?',
        answer: 'The event is open to all ages, but we recommend bringing children only during daytime hours. Children under 10 receive free admission when accompanied by a paying adult.',
      },
      {
        question: 'What happens in case of rain?',
        answer: 'The festival will proceed rain or shine. In case of severe weather, performances may be delayed or relocated. No refunds will be issued due to weather conditions.',
      },
      {
        question: 'Can I leave and re-enter?',
        answer: 'Yes, we allow re-entry to the festival grounds. Make sure to get your hand stamped and keep your ticket before leaving.',
      },
      {
        question: 'Are there ATMs on site?',
        answer: 'Yes, ATMs are available throughout the festival grounds. However, most vendors accept credit/debit cards and contactless payments.',
      },
    ],
  },
  '2': {
    ...eventsData[1],
    organizer: 'TechForward Group',
    contactEmail: 'info@techconference2023.com',
    contactPhone: '+1 (555) 987-6543',
    website: 'www.techconference2023.com',
    fullDescription: `
      Tech Conference 2023 is the premier gathering for technology professionals, entrepreneurs, and innovators. Join us for three days of inspiring keynotes, in-depth workshops, and networking opportunities with the brightest minds in the industry.
      
      This year's conference focuses on emerging technologies including artificial intelligence, blockchain, quantum computing, and sustainable tech solutions. With over 100 speakers from leading global companies and startups, you'll gain valuable insights and actionable strategies to implement in your organization.
      
      The conference also features a startup showcase, recruitment fair, and product demonstrations from the most innovative companies in tech.
    `,
    schedule: [
      { time: '8:00 AM', activity: 'Registration & Breakfast' },
      { time: '9:30 AM', activity: 'Opening Keynote' },
      { time: '11:00 AM', activity: 'Breakout Sessions - Track 1-4' },
      { time: '12:30 PM', activity: 'Networking Lunch' },
      { time: '2:00 PM', activity: 'Panel Discussions' },
      { time: '3:30 PM', activity: 'Workshops' },
      { time: '5:00 PM', activity: 'Evening Keynote' },
      { time: '7:00 PM', activity: 'Reception & Networking Event' },
    ],
    ticketTypes: [
      {
        id: 'standard',
        name: 'Standard Pass',
        price: 299.99,
        description: 'Access to all keynotes, panels, and the exhibition hall.',
        available: 1000,
      },
      {
        id: 'pro',
        name: 'Professional Pass',
        price: 599.99,
        description: 'Standard access plus entry to all workshops and networking events.',
        available: 500,
      },
      {
        id: 'executive',
        name: 'Executive Pass',
        price: 999.99,
        description: 'All access pass including private executive sessions, VIP lounges, and exclusive dinners with speakers.',
        available: 100,
      },
    ],
    faqs: [
      {
        question: 'Is there a dress code?',
        answer: 'Business casual attire is recommended for the conference sessions. Some evening networking events may suggest business formal attire.',
      },
      {
        question: 'Will presentations be available after the conference?',
        answer: 'Yes, registered attendees will receive access to a digital library of presentations and session recordings approximately one week after the event.',
      },
      {
        question: 'Is there Wi-Fi available?',
        answer: 'Complimentary high-speed Wi-Fi will be available throughout the conference venue for all attendees.',
      },
      {
        question: 'Are meals included?',
        answer: 'Continental breakfast, refreshment breaks, and lunch are included for all attendees. Evening receptions may include light appetizers.',
      },
      {
        question: 'Can I transfer my registration to a colleague?',
        answer: 'Yes, you may transfer your registration to another person from your organization up to 48 hours before the event by contacting our support team.',
      },
    ],
  },
};

// TicketSelect component
interface TicketSelectProps {
  ticket: {
    id: string;
    name: string;
    price: number;
    description: string;
    available: number;
  };
  quantity: number;
  onQuantityChange: (id: string, quantity: number) => void;
}

const TicketSelect: React.FC<TicketSelectProps> = ({ ticket, quantity, onQuantityChange }) => {
  return (
    <div className="border border-border rounded-lg p-4 mb-4 transition-all hover:border-accent/50">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="mb-4 md:mb-0">
          <h4 className="font-semibold text-lg">{ticket.name}</h4>
          <p className="text-muted-foreground text-sm mb-2">{ticket.description}</p>
          <div className="flex items-center text-sm">
            <span className="text-muted-foreground mr-2">Available:</span>
            <span className="font-medium">{ticket.available}</span>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="mr-6">
            <span className="text-xl font-semibold">${ticket.price.toFixed(2)}</span>
          </div>
          
          <div className="flex items-center border border-border rounded-md">
            <button
              onClick={() => onQuantityChange(ticket.id, Math.max(0, quantity - 1))}
              className="p-2 hover:bg-secondary/70 text-foreground/80 transition-colors"
              disabled={quantity === 0}
            >
              <Minus size={16} />
            </button>
            <span className="w-10 text-center">{quantity}</span>
            <button
              onClick={() => onQuantityChange(ticket.id, quantity + 1)}
              className="p-2 hover:bg-secondary/70 text-foreground/80 transition-colors"
              disabled={quantity >= ticket.available}
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// FAQ item component
interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  toggleOpen: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, toggleOpen }) => {
  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={toggleOpen}
        className="flex items-center justify-between w-full py-4 text-left"
      >
        <h4 className="font-medium text-foreground">{question}</h4>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-muted-foreground">{answer}</p>
      </div>
    </div>
  );
};

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<ExtendedEventDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [ticketQuantities, setTicketQuantities] = useState<Record<string, number>>({});
  const [openFAQs, setOpenFAQs] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<'details' | 'schedule'>('details');
  
  useEffect(() => {
    // Simulate loading delay
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      if (id && extendedEventData[id]) {
        setEvent(extendedEventData[id]);
        
        // Initialize ticket quantities
        const initialQuantities: Record<string, number> = {};
        extendedEventData[id].ticketTypes.forEach(ticket => {
          initialQuantities[ticket.id] = 0;
        });
        setTicketQuantities(initialQuantities);
        
        setIsLoading(false);
      } else {
        // Handle event not found
        console.error('Event not found');
        setIsLoading(false);
      }
    }, 800);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  const handleQuantityChange = (ticketId: string, quantity: number) => {
    setTicketQuantities(prev => ({
      ...prev,
      [ticketId]: quantity,
    }));
  };
  
  const toggleFAQ = (index: number) => {
    setOpenFAQs(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  
  const totalTickets = Object.values(ticketQuantities).reduce((sum, qty) => sum + qty, 0);
  const totalPrice = event
    ? event.ticketTypes.reduce(
        (sum, ticket) => sum + ticket.price * (ticketQuantities[ticket.id] || 0),
        0
      )
    : 0;
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="mb-4 text-2xl font-bold text-accent">
            Event<span className="text-primary">ia</span>
          </div>
          <div className="flex space-x-2">
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Event Not Found</h2>
            <p className="text-muted-foreground mb-6">The event you are looking for does not exist.</p>
            <Link to="/">
              <AnimatedButton>Return to Home</AnimatedButton>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1 pt-20">
          {/* Hero Section with Event Image */}
          <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${event.imageUrl})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
            
            <div className="absolute top-0 left-0 w-full h-full flex items-end">
              <div className="container mx-auto px-4 pb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="inline-block px-3 py-1 mb-4 rounded-full text-xs font-semibold bg-accent text-white">
                    {event.category}
                  </span>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4 max-w-3xl">{event.title}</h1>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex flex-wrap gap-4 text-muted-foreground"
                >
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>{format(event.date, 'EEEE, MMMM d, yyyy')}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>Starts at 10:00 AM</span>
                  </div>
                  
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{event.location}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    <span>{event.attendees.toLocaleString()} attending</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Left Column - Event Details */}
              <div className="flex-1">
                {/* Tabs for Details and Schedule */}
                <div className="flex border-b border-border mb-8">
                  <button
                    className={`pb-4 px-4 font-medium transition-colors ${
                      activeTab === 'details'
                        ? 'text-accent border-b-2 border-accent'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    onClick={() => setActiveTab('details')}
                  >
                    Event Details
                  </button>
                  <button
                    className={`pb-4 px-4 font-medium transition-colors ${
                      activeTab === 'schedule'
                        ? 'text-accent border-b-2 border-accent'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    onClick={() => setActiveTab('schedule')}
                  >
                    Schedule
                  </button>
                </div>
                
                {/* Details Tab Content */}
                {activeTab === 'details' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="prose prose-sm max-w-none mb-10">
                      <h3 className="text-2xl font-semibold mb-4">About This Event</h3>
                      <div className="whitespace-pre-line text-muted-foreground">
                        {event.fullDescription}
                      </div>
                    </div>
                    
                    <div className="mb-10">
                      <h3 className="text-2xl font-semibold mb-4">Organizer</h3>
                      <div className="glassmorphism rounded-lg p-6">
                        <h4 className="font-semibold text-lg mb-3">{event.organizer}</h4>
                        <div className="space-y-2 text-muted-foreground">
                          <p><span className="font-medium text-foreground">Email:</span> {event.contactEmail}</p>
                          <p><span className="font-medium text-foreground">Phone:</span> {event.contactPhone}</p>
                          <p><span className="font-medium text-foreground">Website:</span> {event.website}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-10">
                      <h3 className="text-2xl font-semibold mb-4">FAQs</h3>
                      <div className="glassmorphism rounded-lg divide-y divide-border overflow-hidden">
                        {event.faqs.map((faq, index) => (
                          <FAQItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openFAQs[index] || false}
                            toggleOpen={() => toggleFAQ(index)}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {/* Schedule Tab Content */}
                {activeTab === 'schedule' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="mb-8">
                      <h3 className="text-2xl font-semibold mb-6">Event Schedule</h3>
                      <div className="glassmorphism rounded-lg p-6">
                        <div className="relative pl-8 border-l-2 border-accent">
                          {event.schedule.map((item, index) => (
                            <div key={index} className="mb-8 last:mb-0">
                              <div className="absolute -left-[9px]">
                                <div className="w-4 h-4 rounded-full bg-accent" />
                              </div>
                              <div className="mb-1 font-semibold text-lg">{item.time}</div>
                              <div className="text-muted-foreground">{item.activity}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-8">
                      <h3 className="text-2xl font-semibold mb-4">Location</h3>
                      <div className="glassmorphism rounded-lg p-6">
                        <h4 className="font-semibold text-lg mb-3">{event.location}</h4>
                        <div className="w-full h-64 bg-muted rounded-lg mb-4">
                          {/* Map placeholder - would be an actual map in a real implementation */}
                          <div className="w-full h-full flex items-center justify-center bg-secondary/50 rounded-lg">
                            <span className="text-muted-foreground">Map View</span>
                          </div>
                        </div>
                        <p className="text-muted-foreground">
                          Detailed directions and parking information will be provided in your ticket confirmation email.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
              
              {/* Right Column - Ticket Selection */}
              <div className="lg:w-[380px]">
                <div className="sticky top-24">
                  <div className="glassmorphism rounded-lg overflow-hidden">
                    <div className="p-6">
                      <h3 className="text-2xl font-semibold mb-6">Get Tickets</h3>
                      
                      {event.ticketTypes.map((ticket) => (
                        <TicketSelect
                          key={ticket.id}
                          ticket={ticket}
                          quantity={ticketQuantities[ticket.id] || 0}
                          onQuantityChange={handleQuantityChange}
                        />
                      ))}
                      
                      <div className="mt-6 pt-6 border-t border-border">
                        <div className="flex justify-between mb-2">
                          <span className="text-muted-foreground">Total Tickets:</span>
                          <span className="font-medium">{totalTickets}</span>
                        </div>
                        <div className="flex justify-between mb-6">
                          <span className="text-muted-foreground">Total Price:</span>
                          <span className="font-bold text-xl">${totalPrice.toFixed(2)}</span>
                        </div>
                        
                        <Link to="/checkout">
                          <AnimatedButton
                            variant="accent"
                            fullWidth
                            size="lg"
                            disabled={totalTickets === 0}
                          >
                            {totalTickets === 0 ? 'Select Tickets' : 'Proceed to Checkout'}
                          </AnimatedButton>
                        </Link>
                      </div>
                    </div>
                    
                    <div className="bg-secondary/30 p-4 border-t border-border">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        <span>Secure checkout</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors">
                      <Share2 size={18} />
                      <span>Share</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors">
                      <Heart size={18} />
                      <span>Save</span>
                    </button>
                  </div>
                </div>
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
