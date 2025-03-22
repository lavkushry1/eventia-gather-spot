
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-20">
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <div className="text-2xl font-bold tracking-tight text-primary mb-4">
                Event<span className="text-accent">ia</span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-xs">
                Discover and book tickets for the most exciting events happening around you.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  <Facebook size={18} />
                </a>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  <Twitter size={18} />
                </a>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  <Instagram size={18} />
                </a>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  <Mail size={18} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-base mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-muted-foreground hover:text-accent transition-colors">About Us</Link>
                </li>
                <li>
                  <Link to="/careers" className="text-muted-foreground hover:text-accent transition-colors">Careers</Link>
                </li>
                <li>
                  <Link to="/blog" className="text-muted-foreground hover:text-accent transition-colors">Blog</Link>
                </li>
                <li>
                  <Link to="/press" className="text-muted-foreground hover:text-accent transition-colors">Press</Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-base mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/help" className="text-muted-foreground hover:text-accent transition-colors">Help Center</Link>
                </li>
                <li>
                  <Link to="/terms" className="text-muted-foreground hover:text-accent transition-colors">Terms of Service</Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-muted-foreground hover:text-accent transition-colors">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/cookie" className="text-muted-foreground hover:text-accent transition-colors">Cookie Policy</Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-base mb-4">Contact Us</h4>
              <ul className="space-y-2">
                <li className="text-muted-foreground">Email: support@eventia.com</li>
                <li className="text-muted-foreground">Phone: +1 (800) 123-4567</li>
                <li className="text-muted-foreground">Address: 123 Event Street, New York, NY 10001</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-4 border-t border-border">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Eventia. All rights reserved.
              </p>
              <p className="text-sm text-muted-foreground flex items-center mt-2 md:mt-0">
                Made with <Heart size={14} className="mx-1 text-red-500" /> by Eventia Team
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
