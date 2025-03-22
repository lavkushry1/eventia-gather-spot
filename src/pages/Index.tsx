
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import FeaturedEvents from '@/components/home/FeaturedEvents';
import { EventProps } from '@/components/home/EventCard';
import PageTransition from '@/components/common/PageTransition';

// Sample event data
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
  {
    id: '3',
    title: 'Art Exhibition: Modern Perspectives',
    description: 'Explore contemporary art from emerging artists around the globe.',
    date: new Date(2023, 5, 10),
    location: 'Modern Art Gallery, London',
    imageUrl: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    price: 24.99,
    category: 'Arts',
    attendees: 735,
  },
  {
    id: '4',
    title: 'Food & Wine Festival',
    description: 'Taste exquisite dishes and wines from renowned chefs and sommeliers.',
    date: new Date(2023, 8, 5),
    location: 'Riverside Gardens, Chicago',
    imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    price: 79.99,
    category: 'Food',
    attendees: 1250,
  },
  {
    id: '5',
    title: 'Digital Marketing Workshop',
    description: 'Learn the latest strategies and tools for effective digital marketing.',
    date: new Date(2023, 6, 8),
    location: 'Business Center, Austin',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    price: 149.99,
    category: 'Workshops',
    attendees: 325,
  },
  {
    id: '6',
    title: 'Summer Sports Championship',
    description: 'Watch top athletes compete in various sports disciplines.',
    date: new Date(2023, 7, 12),
    location: 'Sports Arena, Miami',
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    price: 59.99,
    category: 'Sports',
    attendees: 3800,
  },
];

const StatsSection = () => {
  return (
    <section className="py-16 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { label: 'Events', value: '10,000+' },
            { label: 'Users', value: '2M+' },
            { label: 'Tickets Sold', value: '5M+' },
            { label: 'Locations', value: '100+' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6"
            >
              <p className="text-4xl font-bold text-accent mb-2">{stat.value}</p>
              <p className="text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Event Organizer',
      content: 'Eventia has revolutionized how we manage ticket sales. The platform is intuitive and provides powerful analytics that help us improve our events.',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      id: 2,
      name: 'David Chen',
      role: 'Music Fan',
      content: 'I've been using Eventia to discover and book concerts for over a year now. The experience is seamless, and I love the personalized recommendations.',
      avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Conference Attendee',
      content: 'The ticket purchasing process is so smooth and straightforward. I appreciate the clear information about events and the reminder notifications.',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-4"
          >
            What Our Users Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Trusted by millions of event-goers and organizers around the world.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glassmorphism p-6 rounded-xl"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-medium">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">"{testimonial.content}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CategoriesSection = () => {
  const categories = [
    {
      id: 'music',
      name: 'Music',
      icon: '🎵',
      description: 'Concerts, festivals, and live performances',
      color: 'from-blue-500 to-purple-500',
    },
    {
      id: 'conferences',
      name: 'Conferences',
      icon: '💼',
      description: 'Business, tech, and professional gatherings',
      color: 'from-green-500 to-teal-500',
    },
    {
      id: 'workshops',
      name: 'Workshops',
      icon: '🔧',
      description: 'Skill-building and educational sessions',
      color: 'from-orange-500 to-red-500',
    },
    {
      id: 'sports',
      name: 'Sports',
      icon: '🏆',
      description: 'Competitions, matches, and athletic events',
      color: 'from-blue-500 to-cyan-500',
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-4"
          >
            Browse by Category
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Explore events by category to find exactly what you're looking for.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group rounded-xl overflow-hidden border border-border/40 shadow-elevation-1 relative hover:shadow-elevation-3 transition-all"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
              
              <div className="p-6 relative z-10">
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{category.description}</p>
                <a href="#" className="text-accent text-sm font-medium hover:underline transition-colors">
                  Explore {category.name} Events →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CallToAction = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent to-blue-600 opacity-90" />
          
          <div className="relative z-10 px-6 py-12 md:py-20 text-center md:text-left md:flex md:items-center md:justify-between">
            <div className="max-w-2xl mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4 text-white">Ready to Experience Amazing Events?</h2>
              <p className="text-white/90">
                Join thousands of event-goers and discover the best events happening around you.
                Book tickets seamlessly and enjoy unforgettable experiences.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <AnimatedButton
                className="bg-white text-accent hover:bg-white/90"
                size="lg"
              >
                Browse Events
              </AnimatedButton>
              <AnimatedButton
                className="bg-transparent text-white border border-white hover:bg-white/20"
                size="lg"
              >
                Learn More
              </AnimatedButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
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
  
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <FeaturedEvents events={eventsData} />
          <StatsSection />
          <CategoriesSection />
          <TestimonialsSection />
          <CallToAction />
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
