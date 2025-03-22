
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, CreditCard, Calendar, User, Mail, CheckCircle, Lock } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnimatedButton from '@/components/ui/AnimatedButton';
import PageTransition from '@/components/common/PageTransition';
import { toast } from '@/hooks/use-toast';

// Sample ticket data
const ticketsInCart = [
  {
    id: 'ticket-1',
    eventId: '1',
    eventName: 'Music Festival 2023',
    ticketType: 'General Admission',
    price: 149.99,
    quantity: 2,
    date: 'July 15, 2023',
    location: 'Central Park, New York',
  },
];

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'credit-card' | 'paypal'>('credit-card');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    agreeTerms: false,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  
  const subtotal = ticketsInCart.reduce((sum, ticket) => sum + ticket.price * ticket.quantity, 0);
  const serviceFee = subtotal * 0.1; // 10% service fee
  const total = subtotal + serviceFee;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep === 1) {
      // Validate contact information
      if (!formData.fullName || !formData.email || !formData.phone) {
        toast({
          title: 'Missing Information',
          description: 'Please fill in all required fields.',
          variant: 'destructive',
        });
        return;
      }
      
      setCurrentStep(2);
      window.scrollTo(0, 0);
    } else {
      // Validate payment information
      if (paymentMethod === 'credit-card') {
        if (!formData.cardName || !formData.cardNumber || !formData.expiryDate || !formData.cvv) {
          toast({
            title: 'Missing Information',
            description: 'Please fill in all payment details.',
            variant: 'destructive',
          });
          return;
        }
        
        if (!formData.agreeTerms) {
          toast({
            title: 'Terms Agreement Required',
            description: 'Please agree to our terms and conditions.',
            variant: 'destructive',
          });
          return;
        }
      }
      
      // Simulate payment processing
      setIsProcessing(true);
      
      setTimeout(() => {
        setIsProcessing(false);
        toast({
          title: 'Payment Successful!',
          description: 'Your tickets have been confirmed and emailed to you.',
          variant: 'default',
        });
        
        // Navigate to confirmation page (in a real app)
        // history.push('/confirmation');
      }, 2000);
    }
  };
  
  const formatCardNumber = (value: string) => {
    return value
      .replace(/\s/g, '')
      .replace(/(\d{4})/g, '$1 ')
      .trim();
  };
  
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1 pt-24 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              {/* Checkout Header */}
              <div className="mb-8">
                <Link to="/" className="inline-flex items-center text-accent hover:underline mb-6">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  <span>Continue Shopping</span>
                </Link>
                
                <h1 className="text-3xl font-bold mb-2">Secure Checkout</h1>
                <p className="text-muted-foreground">Complete your purchase securely.</p>
              </div>
              
              {/* Checkout Progress */}
              <div className="mb-10">
                <div className="flex items-center justify-between max-w-md">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      currentStep >= 1 ? 'bg-accent text-white' : 'bg-secondary text-muted-foreground'
                    }`}>
                      <User className="h-5 w-5" />
                    </div>
                    <span className={`text-sm ${currentStep >= 1 ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                      Your Details
                    </span>
                  </div>
                  
                  <div className="flex-1 h-1 mx-4 bg-secondary">
                    <div 
                      className="h-full bg-accent" 
                      style={{ width: currentStep > 1 ? '100%' : '0%', transition: 'width 0.5s ease' }}
                    />
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      currentStep >= 2 ? 'bg-accent text-white' : 'bg-secondary text-muted-foreground'
                    }`}>
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <span className={`text-sm ${currentStep >= 2 ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                      Payment
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Checkout Form */}
                <div className="lg:col-span-7">
                  <form onSubmit={handleSubmit}>
                    {/* Step 1: Contact Information */}
                    {currentStep === 1 && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        className="glassmorphism rounded-lg p-6"
                      >
                        <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
                        
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="fullName" className="block text-sm font-medium mb-1">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              id="fullName"
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleInputChange}
                              className="w-full h-12 px-4 rounded-lg border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                              placeholder="Enter your full name"
                              required
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-1">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className="w-full h-12 px-4 rounded-lg border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                              placeholder="Enter your email address"
                              required
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium mb-1">
                              Phone Number *
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="w-full h-12 px-4 rounded-lg border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                              placeholder="Enter your phone number"
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="mt-8">
                          <AnimatedButton
                            type="submit"
                            variant="accent"
                            size="lg"
                            className="w-full md:w-auto"
                          >
                            Continue to Payment
                          </AnimatedButton>
                        </div>
                      </motion.div>
                    )}
                    
                    {/* Step 2: Payment Information */}
                    {currentStep === 2 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        className="glassmorphism rounded-lg p-6"
                      >
                        <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
                        
                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
                          <button
                            type="button"
                            className={`flex-1 py-3 px-4 rounded-lg border ${
                              paymentMethod === 'credit-card'
                                ? 'border-accent bg-accent/5'
                                : 'border-border bg-card'
                            } flex items-center justify-center gap-2 transition-colors`}
                            onClick={() => setPaymentMethod('credit-card')}
                          >
                            <CreditCard className={`h-5 w-5 ${paymentMethod === 'credit-card' ? 'text-accent' : ''}`} />
                            <span className={paymentMethod === 'credit-card' ? 'font-medium' : ''}>Credit Card</span>
                          </button>
                          
                          <button
                            type="button"
                            className={`flex-1 py-3 px-4 rounded-lg border ${
                              paymentMethod === 'paypal'
                                ? 'border-accent bg-accent/5'
                                : 'border-border bg-card'
                            } flex items-center justify-center gap-2 transition-colors`}
                            onClick={() => setPaymentMethod('paypal')}
                          >
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M19.5 8.25V16.5C19.5 17.5 18.75 18.25 17.75 18.25H6.25C5.25 18.25 4.5 17.5 4.5 16.5V8.25C4.5 7.25 5.25 6.5 6.25 6.5H17.75C18.75 6.5 19.5 7.25 19.5 8.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className={paymentMethod === 'paypal' ? 'font-medium' : ''}>PayPal</span>
                          </button>
                        </div>
                        
                        {paymentMethod === 'credit-card' && (
                          <div className="space-y-4">
                            <div>
                              <label htmlFor="cardName" className="block text-sm font-medium mb-1">
                                Name on Card *
                              </label>
                              <input
                                type="text"
                                id="cardName"
                                name="cardName"
                                value={formData.cardName}
                                onChange={handleInputChange}
                                className="w-full h-12 px-4 rounded-lg border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                                placeholder="Enter name on card"
                                required
                              />
                            </div>
                            
                            <div>
                              <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">
                                Card Number *
                              </label>
                              <div className="relative">
                                <input
                                  type="text"
                                  id="cardNumber"
                                  name="cardNumber"
                                  value={formData.cardNumber}
                                  onChange={(e) => {
                                    const formatted = formatCardNumber(e.target.value.replace(/[^\d]/g, '').substring(0, 16));
                                    setFormData(prev => ({ ...prev, cardNumber: formatted }));
                                  }}
                                  className="w-full h-12 px-4 pr-10 rounded-lg border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                                  placeholder="XXXX XXXX XXXX XXXX"
                                  required
                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                                </div>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label htmlFor="expiryDate" className="block text-sm font-medium mb-1">
                                  Expiry Date *
                                </label>
                                <div className="relative">
                                  <input
                                    type="text"
                                    id="expiryDate"
                                    name="expiryDate"
                                    value={formData.expiryDate}
                                    onChange={(e) => {
                                      let value = e.target.value.replace(/[^\d]/g, '');
                                      if (value.length > 4) value = value.substring(0, 4);
                                      if (value.length > 2) {
                                        value = `${value.substring(0, 2)}/${value.substring(2)}`;
                                      }
                                      setFormData(prev => ({ ...prev, expiryDate: value }));
                                    }}
                                    className="w-full h-12 px-4 pr-10 rounded-lg border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                                    placeholder="MM/YY"
                                    required
                                  />
                                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    <Calendar className="h-5 w-5 text-muted-foreground" />
                                  </div>
                                </div>
                              </div>
                              
                              <div>
                                <label htmlFor="cvv" className="block text-sm font-medium mb-1">
                                  CVV *
                                </label>
                                <input
                                  type="text"
                                  id="cvv"
                                  name="cvv"
                                  value={formData.cvv}
                                  onChange={(e) => {
                                    const value = e.target.value.replace(/[^\d]/g, '').substring(0, 3);
                                    setFormData(prev => ({ ...prev, cvv: value }));
                                  }}
                                  className="w-full h-12 px-4 rounded-lg border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                                  placeholder="XXX"
                                  required
                                />
                              </div>
                            </div>
                            
                            <div className="mt-4">
                              <label className="flex items-start">
                                <input
                                  type="checkbox"
                                  name="agreeTerms"
                                  checked={formData.agreeTerms}
                                  onChange={handleInputChange}
                                  className="mt-1 mr-2"
                                />
                                <span className="text-sm text-muted-foreground">
                                  I agree to the <a href="#" className="text-accent hover:underline">Terms and Conditions</a> and <a href="#" className="text-accent hover:underline">Privacy Policy</a>.
                                </span>
                              </label>
                            </div>
                          </div>
                        )}
                        
                        {paymentMethod === 'paypal' && (
                          <div className="bg-secondary/30 rounded-lg p-6 text-center">
                            <p className="text-muted-foreground mb-4">
                              You will be redirected to PayPal to complete your payment securely.
                            </p>
                            <p className="text-sm text-muted-foreground">
                              After payment, you'll return to Eventia to get your ticket confirmation.
                            </p>
                          </div>
                        )}
                        
                        <div className="mt-8 flex flex-col sm:flex-row sm:justify-between gap-4">
                          <button
                            type="button"
                            className="px-6 py-3 rounded-lg border border-border text-foreground hover:bg-secondary/70 transition-colors"
                            onClick={() => setCurrentStep(1)}
                          >
                            Back
                          </button>
                          
                          <AnimatedButton
                            type="submit"
                            variant="accent"
                            size="lg"
                            isLoading={isProcessing}
                          >
                            {isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
                          </AnimatedButton>
                        </div>
                      </motion.div>
                    )}
                  </form>
                </div>
                
                {/* Order Summary */}
                <div className="lg:col-span-5">
                  <div className="glassmorphism rounded-lg overflow-hidden">
                    <div className="p-6">
                      <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                      
                      <div className="space-y-4 mb-6">
                        {ticketsInCart.map((ticket) => (
                          <div key={ticket.id} className="flex justify-between pb-4 border-b border-border last:border-b-0 last:pb-0">
                            <div>
                              <h3 className="font-medium mb-1">{ticket.eventName}</h3>
                              <p className="text-sm text-muted-foreground mb-1">{ticket.ticketType}</p>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Calendar className="h-4 w-4 mr-1" />
                                <span>{ticket.date}</span>
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground mt-1">
                                <MapPin className="h-4 w-4 mr-1" />
                                <span>{ticket.location}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">${ticket.price.toFixed(2)} x {ticket.quantity}</p>
                              <p className="font-bold mt-1">${(ticket.price * ticket.quantity).toFixed(2)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="space-y-2 pt-4 border-t border-border">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Subtotal</span>
                          <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Service Fee</span>
                          <span>${serviceFee.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between pt-3 border-t border-border font-bold">
                          <span>Total</span>
                          <span>${total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-secondary/30 p-4 border-t border-border">
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        <span>Tickets will be emailed immediately</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Lock className="h-4 w-4 mr-2 text-green-500" />
                        <span>Secure payment processing</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <p className="text-sm text-muted-foreground">
                      Need help? <a href="#" className="text-accent hover:underline">Contact our support team</a>
                    </p>
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

export default Checkout;
