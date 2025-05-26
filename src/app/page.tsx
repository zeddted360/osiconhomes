import  Hero from "@/UI/Body/Hero";
import About from "@/UI/Body/About";
import ServicesSection from "@/UI/Body/Services";
import HotSales from "@/UI/Body/HotSales";
import Testimonials from "@/UI/Body/Testimonial";
import Affiliate from "@/UI/Body/Affiliate";
import FAQ from "@/UI/Body/Faq";
import Contact from "@/UI/Body/Contact";

const Dashboard = () => {
  
  return (
    <div id="home" className="min-h-screen relative overflow-hidden">
      {/* Background with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>


      {/* Hero Section */}
      <Hero/>
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
      {/* About us */}
      <About />
      
      {/* Our services */}
      <ServicesSection />
      
      {/* Hot Sales */}
      <HotSales />
      
      {/* testimonies */}
      <Testimonials />
      {/* Affiliate */}
      <Affiliate />
      
      {/* Faqs */}
      <FAQ />

      {/* contact */}
      <Contact />
    </div>
  );
};

export default Dashboard;
