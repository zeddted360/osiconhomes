import { LucideProps } from "lucide-react";

interface IMobileMenuProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  menuItems: Array<{
    icon: React.ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
    >;
    label: string;
    href: string;
  }>;
}

const MobileMenu = ({ toggleMenu, isMenuOpen, menuItems }: IMobileMenuProps) => {
    
  return (
    <div
      className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
        isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={toggleMenu}
      ></div>
      <div
        className={`absolute right-0 top-0 h-full w-80 bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl border-l border-white/10 transform transition-transform duration-500 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-24 px-6">
          <nav className="flex-1 space-y-2">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={toggleMenu}
                className="flex items-center space-x-4 p-4 rounded-xl text-white/90 hover:text-amber-400 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="p-2 rounded-lg bg-gradient-to-br from-amber-400/20 to-orange-500/20 group-hover:from-amber-400/30 group-hover:to-orange-500/30 transition-all duration-300">
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="font-medium text-lg">{item.label}</span>
              </a>
            ))}
          </nav>
          <div className="pb-8">
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-400/20 to-orange-500/20 border border-amber-400/30">
              <p className="text-white/80 text-sm text-center">
                Ready to find your dream home?
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu