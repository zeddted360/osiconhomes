"use client"
import { useState,useEffect,useActionState } from 'react';
import {
  Mail,
  ArrowRight,
} from "lucide-react";
import { Button } from './ui/button';
import { subscribe } from '@/app/actions/subscribe';

const Subscribe = () => {
    const [email, setEmail] = useState("");
    const [isHovered, setIsHovered] = useState(false);
    const [state, formAction, isPending] = useActionState(subscribe, {
        success: false,
        message:""
   })
    const [showMessage, setShowMessage] = useState<boolean>(false);

 useEffect(() => {
     if (state.success) setEmail("");
     if (state.message) {
         setShowMessage(true);
     const reset = setTimeout(() => setShowMessage(false), 3000);
     return () => 
       clearTimeout(reset);
     ;
     }
    
   }, [state.success]);

  return (
    <form action={formAction} className="space-y-4">
      <div className="relative group">
        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-400 group-focus-within:scale-110 transition-transform duration-200" />
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          className="w-full pl-12 pr-4 py-4 bg-white/5 border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
          required
        />
      </div>
      <Button
        type="submit"
        disabled={isPending}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-white py-4 rounded-2xl font-semibold hover:from-amber-500 hover:to-orange-600 transition-all duration-300 flex items-center justify-center space-x-3 shadow-2xl hover:shadow-amber-400/25 group"
      >
        <span>{isPending ? "Subscribing..." : "Subscribe Now"}</span>
        <ArrowRight
          className={`w-5 h-5 transition-transform duration-300 ${
            isHovered ? "translate-x-1" : ""
          }`}
        />
      </Button>
      {state.message && showMessage && (
        <div
          className={`text-sm ${
            state.success ? "text-green-400" : "text-red-400"
          }`}
        >
          {state.message}
        </div>
      )}
    </form>
  );
}

export default Subscribe