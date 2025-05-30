import GetStartedForm from "@/components/GetStartedForm";
import { Building, Home, Send, Users } from "lucide-react";

const GetStartedPage: React.FC = () => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-amber-50 min-h-screen">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -right-32 w-96 h-96 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-20 -left-32 w-96 h-96 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full blur-3xl opacity-40"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center space-y-6 mb-12">
          <div className="inline-flex items-center space-x-3 px-6 py-3 rounded-full bg-gradient-to-r from-amber-400/20 to-orange-500/20 border border-amber-400/30">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
            <span className="text-amber-700 font-semibold text-sm uppercase tracking-wider">
              Get Started
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Start Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
              Project
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Let’s bring your real estate, construction, or home management
            vision to life. Fill out the form below, and our team will reach out
            to discuss your needs.
          </p>
        </div>

        {/* Contact Form */}
        <GetStartedForm />
        {/* Stats Section */}
        <div className="mt-12 bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 text-center">
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center mx-auto">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">500+</div>
              <div className="text-gray-300 text-sm">Projects Completed</div>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center mx-auto">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">1000+</div>
              <div className="text-gray-300 text-sm">Happy Clients</div>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center mx-auto">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">15+</div>
              <div className="text-gray-300 text-sm">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetStartedPage;
