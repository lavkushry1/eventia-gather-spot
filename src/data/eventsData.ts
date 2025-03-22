
import { EventProps } from '@/components/home/EventCard';

// Sample data for different event categories
export const eventsData: EventProps[] = [
  // Music Events
  {
    id: 'music-1',
    title: 'Rock Music Festival',
    description: 'Experience the best rock bands performing live on one stage.',
    date: new Date(2024, 4, 15),
    location: 'Concert Arena, Bengaluru',
    imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    price: 1499,
    category: 'Music',
    attendees: 3500,
  },
  {
    id: 'music-2',
    title: 'Classical Music Night',
    description: 'A soothing evening with classical maestros from around the country.',
    date: new Date(2024, 4, 22),
    location: 'Town Hall, Bengaluru',
    imageUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    price: 999,
    category: 'Music',
    attendees: 1200,
  },
  
  // Comedy Events
  {
    id: 'comedy-1',
    title: 'Stand-up Comedy Night',
    description: 'Laugh till you drop with the funniest comedians in town.',
    date: new Date(2024, 4, 18),
    location: 'Comedy Club, Bengaluru',
    imageUrl: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
    price: 799,
    category: 'Comedy',
    attendees: 450,
  },
  {
    id: 'comedy-2',
    title: 'Improv Comedy Workshop',
    description: 'Learn the art of improvisational comedy with industry professionals.',
    date: new Date(2024, 4, 25),
    location: 'Cultural Center, Bengaluru',
    imageUrl: 'https://images.unsplash.com/photo-1610890690846-5149750c8634?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
    price: 1299,
    category: 'Comedy',
    attendees: 120,
  },
  
  // Workshop Events
  {
    id: 'workshop-1',
    title: 'Photography Masterclass',
    description: 'Master the art of photography with renowned photographers.',
    date: new Date(2024, 5, 5),
    location: 'Creative Studios, Bengaluru',
    imageUrl: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    price: 2499,
    category: 'Workshops',
    attendees: 80,
  },
  {
    id: 'workshop-2',
    title: 'Culinary Workshop',
    description: 'Learn to cook gourmet meals with expert chefs.',
    date: new Date(2024, 5, 12),
    location: 'Culinary Institute, Bengaluru',
    imageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    price: 1899,
    category: 'Workshops',
    attendees: 35,
  },
  
  // Theatre Events
  {
    id: 'theatre-1',
    title: 'Romeo and Juliet',
    description: 'A modern adaptation of Shakespeare\'s classic love tragedy.',
    date: new Date(2024, 5, 18),
    location: 'City Theatre, Bengaluru',
    imageUrl: 'https://images.unsplash.com/photo-1503095396549-807759245b35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
    price: 699,
    category: 'Theatre',
    attendees: 500,
  },
  {
    id: 'theatre-2',
    title: 'The Miracle Worker',
    description: 'An inspiring play about overcoming disabilities and finding hope.',
    date: new Date(2024, 5, 25),
    location: 'Drama Society, Bengaluru',
    imageUrl: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    price: 599,
    category: 'Theatre',
    attendees: 320,
  },
  
  // Exhibition Events
  {
    id: 'exhibition-1',
    title: 'Modern Art Exhibition',
    description: 'Explore contemporary art from emerging artists around the country.',
    date: new Date(2024, 6, 10),
    location: 'Art Gallery, Bengaluru',
    imageUrl: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    price: 349,
    category: 'Exhibition',
    attendees: 1500,
  },
  {
    id: 'exhibition-2',
    title: 'Science and Technology Expo',
    description: 'Discover the latest innovations in science and technology.',
    date: new Date(2024, 6, 18),
    location: 'Convention Center, Bengaluru',
    imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    price: 499,
    category: 'Exhibition',
    attendees: 2200,
  },
];

export const eventCategories = [
  { id: 'all', name: 'All Events', icon: '🎭' },
  { id: 'music', name: 'Music', icon: '🎵' },
  { id: 'comedy', name: 'Comedy', icon: '😂' },
  { id: 'workshops', name: 'Workshops', icon: '🔧' },
  { id: 'theatre', name: 'Theatre', icon: '🎭' },
  { id: 'exhibition', name: 'Exhibition', icon: '🖼️' },
  { id: 'sports', name: 'Sports', icon: '🏆' },
];
