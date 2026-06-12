import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-on-background text-inverse-on-surface">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-lg px-gutter py-xl max-w-container-max mx-auto">
        <div className="flex flex-col items-start gap-sm">
          <Link to="/" className="text-headline-sm font-headline-sm text-primary-fixed">FoodSaver</Link>
          <p className="text-body-sm font-body-sm text-outline-variant max-w-[250px]">
            Empowering communities to reduce food waste and protect our planet, one delicious meal at a time.
          </p>
        </div>
        <div className="flex flex-col gap-sm">
          <h4 className="text-label-md font-label-md text-primary-fixed uppercase tracking-wider mb-xs">Platform</h4>
          <Link to="/marketplace" className="text-outline-variant hover:text-primary-fixed transition-colors text-body-sm font-body-sm hover:opacity-80">Marketplace</Link>
          <Link to="/customer/impact" className="text-outline-variant hover:text-primary-fixed transition-colors text-body-sm font-body-sm hover:opacity-80">Impact Stats</Link>
          <Link to="/" className="text-outline-variant hover:text-primary-fixed transition-colors text-body-sm font-body-sm hover:opacity-80">Mission</Link>
        </div>
        <div className="flex flex-col gap-sm">
          <h4 className="text-label-md font-label-md text-primary-fixed uppercase tracking-wider mb-xs">Legal</h4>
          <a href="#" className="text-outline-variant hover:text-primary-fixed transition-colors text-body-sm font-body-sm hover:opacity-80">Terms of Service</a>
          <a href="#" className="text-outline-variant hover:text-primary-fixed transition-colors text-body-sm font-body-sm hover:opacity-80">Privacy</a>
        </div>
        <div className="col-span-1 md:col-span-3 border-t border-outline/30 pt-lg mt-sm flex justify-between items-center flex-wrap gap-sm">
          <p className="text-body-sm font-body-sm text-outline-variant">© 2024 FoodSaver. Saving the planet, one bag at a time.</p>
          <div className="flex gap-md">
            <span className="material-symbols-outlined text-outline-variant hover:text-primary-fixed cursor-pointer transition-colors">public</span>
            <span className="material-symbols-outlined text-outline-variant hover:text-primary-fixed cursor-pointer transition-colors">share</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
