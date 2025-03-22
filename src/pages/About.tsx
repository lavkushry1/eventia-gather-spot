
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/common/PageTransition';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { User, Users, Calendar, Award, Globe, TrendingUp, ThumbsUp, Heart } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: <User className="h-6 w-6 text-primary" />, value: '10M+', label: 'Registered users' },
    { icon: <Calendar className="h-6 w-6 text-primary" />, value: '10,000+', label: 'Events hosted' },
    { icon: <Globe className="h-6 w-6 text-primary" />, value: '300+', label: 'Cities' },
    { icon: <Award className="h-6 w-6 text-primary" />, value: '5M+', label: 'Tickets sold monthly' },
  ];

  const teams = [
    {
      name: 'Leadership',
      members: [
        { name: 'Ashish Hemrajani', role: 'Founder & CEO', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { name: 'Parikshit Dar', role: 'Co-founder & CTO', image: 'https://randomuser.me/api/portraits/men/2.jpg' },
        { name: 'Rajesh Balpande', role: 'Co-founder & Director', image: 'https://randomuser.me/api/portraits/men/3.jpg' },
      ]
    },
    {
      name: 'Product & Engineering',
      members: [
        { name: 'Anil Kumar', role: 'VP, Engineering', image: 'https://randomuser.me/api/portraits/men/4.jpg' },
        { name: 'Priya Singh', role: 'Head of Product', image: 'https://randomuser.me/api/portraits/women/5.jpg' },
        { name: 'Raj Sharma', role: 'Director of Technology', image: 'https://randomuser.me/api/portraits/men/6.jpg' },
      ]
    }
  ];

  const values = [
    { icon: <Users className="h-6 w-6" />, title: 'Customer First', description: 'We put our customers at the center of everything we do.' },
    { icon: <TrendingUp className="h-6 w-6" />, title: 'Innovation', description: 'We strive to innovate and improve our services continuously.' },
    { icon: <ThumbsUp className="h-6 w-6" />, title: 'Excellence', description: 'We are committed to excellence in all aspects of our business.' },
    { icon: <Heart className="h-6 w-6" />, title: 'Passion', description: 'We are passionate about entertainment and bringing joy to our users.' },
  ];

  const timeline = [
    { year: '2007', title: 'Founded', description: 'Eventia was founded with the vision to revolutionize event ticketing in India.' },
    { year: '2010', title: 'Expansion', description: 'Expanded operations to 10 major cities across India.' },
    { year: '2012', title: 'Mobile App', description: 'Launched our mobile app, making booking tickets even more convenient.' },
    { year: '2015', title: 'International Presence', description: 'Started operations in international markets including UAE and Sri Lanka.' },
    { year: '2018', title: 'AI Integration', description: 'Integrated AI-powered recommendations to improve user experience.' },
    { year: '2020', title: 'Virtual Events', description: 'Added support for virtual events during the global pandemic.' },
    { year: '2023', title: 'Blockchain Ticketing', description: 'Pioneered blockchain-based ticket verification to prevent fraud.' },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative py-20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-90"></div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')] bg-cover bg-center mix-blend-overlay"></div>
            <div className="container mx-auto px-4 relative z-10 text-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-3xl mx-auto"
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-4">About Eventia</h1>
                <p className="text-xl opacity-90 mb-8">
                  India's leading entertainment destination
                </p>
              </motion.div>
            </div>
          </section>
          
          {/* About Section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                  <div className="text-muted-foreground space-y-4">
                    <p>
                      Founded in 2007, Eventia has revolutionized how India books tickets for movies, events, sports, and experiences. What started as a small team with a big vision has grown into India's largest entertainment ticketing platform.
                    </p>
                    <p>
                      Our journey began with a simple question: Why should booking tickets be complicated? We set out to create a seamless experience for users to discover, plan, and book tickets for their favorite events.
                    </p>
                    <p>
                      Today, we serve millions of customers, partner with thousands of event organizers, and cover events across hundreds of cities in India and beyond.
                    </p>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="relative aspect-video rounded-2xl overflow-hidden shadow-xl"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1112&q=80" 
                    alt="Eventia Team" 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </div>
          </section>
          
          {/* Stats Section */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center p-6"
                  >
                    <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      {stat.icon}
                    </div>
                    <p className="text-4xl font-bold text-accent mb-2">{stat.value}</p>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Mission & Vision Section */}
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
                  Our Mission & Vision
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="max-w-3xl mx-auto"
                >
                  <Separator className="mb-8" />
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Mission</h3>
                      <p className="text-muted-foreground">
                        To connect people with unforgettable experiences by making the discovery and booking process simple, efficient, and enjoyable.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Vision</h3>
                      <p className="text-muted-foreground">
                        To be the world's leading entertainment destination, enriching lives through the power of shared experiences and creating memories that last a lifetime.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
          
          {/* Values Section */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl font-bold mb-4"
                >
                  Our Values
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-muted-foreground max-w-2xl mx-auto"
                >
                  The principles that guide every decision we make and every action we take.
                </motion.p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-card p-6 rounded-xl border border-border/40 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Timeline Section */}
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
                  Our Journey
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-muted-foreground max-w-2xl mx-auto"
                >
                  Milestones that have defined our growth over the years.
                </motion.p>
              </div>
              
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-[50%] top-0 bottom-0 w-0.5 bg-border"></div>
                
                <div className="space-y-12">
                  {timeline.map((item, index) => (
                    <motion.div
                      key={item.year}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`relative flex items-center ${
                        index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                      }`}
                    >
                      <div className="w-1/2"></div>
                      
                      {/* Circle indicator */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-primary z-10 flex items-center justify-center text-white text-xs font-bold">
                        {item.year.slice(-2)}
                      </div>
                      
                      <Card className={`w-1/2 ${index % 2 === 0 ? 'mr-8' : 'ml-8'}`}>
                        <CardContent className="p-6">
                          <div className="flex items-baseline mb-2">
                            <span className="text-sm font-semibold bg-accent/10 text-accent px-2 py-1 rounded">
                              {item.year}
                            </span>
                          </div>
                          <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                          <p className="text-muted-foreground">{item.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          
          {/* Team Section */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl font-bold mb-4"
                >
                  Our Team
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-muted-foreground max-w-2xl mx-auto"
                >
                  Meet the people who make Eventia possible.
                </motion.p>
              </div>
              
              <div className="space-y-12">
                {teams.map((team, i) => (
                  <div key={team.name}>
                    <h3 className="text-2xl font-semibold mb-6">{team.name}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {team.members.map((member, j) => (
                        <motion.div
                          key={member.name}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: j * 0.1 }}
                          className="bg-card rounded-xl overflow-hidden border border-border/40 shadow-sm hover:shadow-md transition-all"
                        >
                          <div className="aspect-square overflow-hidden">
                            <img 
                              src={member.image} 
                              alt={member.name} 
                              className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110"
                            />
                          </div>
                          <div className="p-4 text-center">
                            <h4 className="font-semibold text-lg">{member.name}</h4>
                            <p className="text-muted-foreground text-sm">{member.role}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          {/* CTA Section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-3xl mx-auto"
              >
                <h2 className="text-3xl font-bold mb-4">Join Us on Our Journey</h2>
                <p className="text-muted-foreground mb-8">
                  Be a part of our story as we continue to innovate and transform the entertainment landscape.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="/events" className="px-6 py-3 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors font-medium">
                    Explore Events
                  </a>
                  <a href="/careers" className="px-6 py-3 rounded-full bg-secondary text-primary hover:bg-secondary/90 transition-colors font-medium">
                    Join Our Team
                  </a>
                </div>
              </motion.div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default About;
