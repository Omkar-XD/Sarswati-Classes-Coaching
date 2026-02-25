import { Link } from "react-router-dom";
import { GraduationCap, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-primary-foreground">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="h-7 w-7 text-primary" />
            <span className="text-lg font-bold">Saraswati Classes</span>
          </div>
          <p className="text-sm opacity-70">Empowering students to achieve academic excellence through quality education and personalized guidance.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm opacity-70">
            <Link to="/courses" className="hover:opacity-100 transition-opacity">Courses</Link>
            <Link to="/test-series" className="hover:opacity-100 transition-opacity">Test Series</Link>
            <Link to="/about" className="hover:opacity-100 transition-opacity">About Us</Link>
            <Link to="/contact" className="hover:opacity-100 transition-opacity">Contact</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Programs</h4>
          <div className="flex flex-col gap-2 text-sm opacity-70">
            <span>CBSE Foundation</span>
            <span>SSC Board</span>
            <span>JEE / CET / NEET</span>
            <span>Test Series</span>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <div className="flex flex-col gap-2 text-sm opacity-70">
            <span className="flex items-center gap-2"><Phone className="h-4 w-4" /> +91 98765 43210</span>
            <span className="flex items-center gap-2"><Mail className="h-4 w-4" /> info@saraswaticlasses.com</span>
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Pune, Maharashtra</span>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-sm opacity-50">
        © {new Date().getFullYear()} Saraswati Classes. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
