
import { EventProps } from '@/components/home/EventCard';

export const iplMatches: EventProps[] = [
  {
    id: 'ipl-1',
    title: 'Chennai Super Kings vs Mumbai Indians',
    description: 'Opening match of the IPL 2024 season featuring a classic rivalry between CSK and MI.',
    date: new Date(2024, 3, 22, 19, 30), // April 22, 2024, 7:30 PM
    location: 'M.A. Chidambaram Stadium, Chennai',
    imageUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1167&q=80',
    price: 2499,
    category: 'Sports',
    attendees: 45000,
    homeTeam: 'Chennai Super Kings',
    awayTeam: 'Mumbai Indians',
    venueCapacity: 50000,
  },
  {
    id: 'ipl-2',
    title: 'Royal Challengers Bangalore vs Kolkata Knight Riders',
    description: 'RCB takes on KKR in this exciting IPL matchup at the Chinnaswamy Stadium.',
    date: new Date(2024, 3, 24, 19, 30), // April 24, 2024, 7:30 PM
    location: 'M. Chinnaswamy Stadium, Bangalore',
    imageUrl: 'https://images.unsplash.com/photo-1624880357913-a08c7f127910?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    price: 2999,
    category: 'Sports',
    attendees: 38000,
    homeTeam: 'Royal Challengers Bangalore',
    awayTeam: 'Kolkata Knight Riders',
    venueCapacity: 40000,
  },
  {
    id: 'ipl-3',
    title: 'Delhi Capitals vs Punjab Kings',
    description: 'Delhi Capitals host Punjab Kings in this north India derby match.',
    date: new Date(2024, 3, 26, 15, 30), // April 26, 2024, 3:30 PM
    location: 'Arun Jaitley Stadium, Delhi',
    imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1005&q=80',
    price: 1999,
    category: 'Sports',
    attendees: 35000,
    homeTeam: 'Delhi Capitals',
    awayTeam: 'Punjab Kings',
    venueCapacity: 41000,
  },
  {
    id: 'ipl-4',
    title: 'Rajasthan Royals vs Sunrisers Hyderabad',
    description: 'Rajasthan Royals face off against Sunrisers Hyderabad in this exciting encounter.',
    date: new Date(2024, 3, 27, 19, 30), // April 27, 2024, 7:30 PM
    location: 'Sawai Mansingh Stadium, Jaipur',
    imageUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1167&q=80',
    price: 1799,
    category: 'Sports',
    attendees: 30000,
    homeTeam: 'Rajasthan Royals',
    awayTeam: 'Sunrisers Hyderabad',
    venueCapacity: 35000,
  },
  {
    id: 'ipl-5',
    title: 'Gujarat Titans vs Lucknow Super Giants',
    description: 'The two newest IPL franchises face off in an exciting contest.',
    date: new Date(2024, 3, 29, 19, 30), // April 29, 2024, 7:30 PM
    location: 'Narendra Modi Stadium, Ahmedabad',
    imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1005&q=80',
    price: 2299,
    category: 'Sports',
    attendees: 75000,
    homeTeam: 'Gujarat Titans',
    awayTeam: 'Lucknow Super Giants',
    venueCapacity: 132000,
  },
  {
    id: 'ipl-6',
    title: 'Mumbai Indians vs Royal Challengers Bangalore',
    description: 'Mumbai Indians take on Royal Challengers Bangalore in this high-octane clash.',
    date: new Date(2024, 4, 2, 19, 30), // May 2, 2024, 7:30 PM
    location: 'Wankhede Stadium, Mumbai',
    imageUrl: 'https://images.unsplash.com/photo-1624880357913-a08c7f127910?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    price: 3499,
    category: 'Sports',
    attendees: 33000,
    homeTeam: 'Mumbai Indians',
    awayTeam: 'Royal Challengers Bangalore',
    venueCapacity: 33000,
  },
];

// Define different ticket categories with pricing for each match
export interface TicketCategory {
  id: string;
  name: string;
  description: string;
  price: number;
  available: number;
}

export const getTicketCategories = (matchId: string): TicketCategory[] => {
  const baseCategories: TicketCategory[] = [
    {
      id: 'platinum',
      name: 'Platinum',
      description: 'Premium seating with best view and complimentary refreshments',
      price: 0, // Will be calculated based on match
      available: 150,
    },
    {
      id: 'gold',
      name: 'Gold',
      description: 'Excellent views with comfortable seating',
      price: 0, // Will be calculated based on match
      available: 500,
    },
    {
      id: 'silver',
      name: 'Silver',
      description: 'Good seating with decent views of the field',
      price: 0, // Will be calculated based on match
      available: 1000,
    },
    {
      id: 'general',
      name: 'General',
      description: 'Standard seating with basic amenities',
      price: 0, // Will be calculated based on match
      available: 2500,
    },
  ];

  const match = iplMatches.find(m => m.id === matchId);
  
  if (!match) return baseCategories;
  
  // Calculate prices based on base match price
  return baseCategories.map((category, index) => {
    let multiplier = 1;
    
    switch(category.id) {
      case 'platinum':
        multiplier = 2.5;
        break;
      case 'gold':
        multiplier = 1.8;
        break;
      case 'silver':
        multiplier = 1.2;
        break;
      case 'general':
        multiplier = 1;
        break;
    }
    
    return {
      ...category,
      price: Math.round(match.price * multiplier),
    };
  });
};
