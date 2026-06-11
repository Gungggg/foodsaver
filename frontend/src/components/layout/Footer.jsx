import { Link } from 'react-router-dom';
import { HiHeart } from 'react-icons/hi';

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-lg">🌿</span>
              </div>
              <span className="font-heading font-bold text-xl">FoodSaver</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Save food, save money, save the planet. Join the movement against food waste.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider mb-4 text-white/90">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/marketplace" className="text-white/70 hover:text-white text-sm transition-colors">Marketplace</Link></li>
              <li><Link to="/register" className="text-white/70 hover:text-white text-sm transition-colors">Become a Partner</Link></li>
              <li><Link to="/" className="text-white/70 hover:text-white text-sm transition-colors">How It Works</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider mb-4 text-white/90">Support</h4>
            <ul className="space-y-2">
              <li><span className="text-white/70 text-sm">help@foodsaver.id</span></li>
              <li><span className="text-white/70 text-sm">+62 21 1234 5678</span></li>
              <li><span className="text-white/70 text-sm">FAQ & Help Center</span></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider mb-4 text-white/90">Stay Updated</h4>
            <p className="text-white/70 text-sm mb-3">Get eco tips and deals in your inbox.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-secondary/50"
              />
              <button className="px-4 py-2 bg-secondary text-white rounded-lg text-sm font-medium hover:bg-secondary-light transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} FoodSaver. All rights reserved.
          </p>
          <p className="text-white/50 text-sm flex items-center gap-1">
            Made with <HiHeart className="w-4 h-4 text-red-400" /> for the planet
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
