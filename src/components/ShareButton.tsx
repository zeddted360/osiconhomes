"use client";
import { Share2 } from 'lucide-react';
import React from 'react'
import { Button } from './ui/button';

interface ShareButtonProps {
    typedBde: string;
}
  
const ShareButton = ({ typedBde }:ShareButtonProps) => {
    const parsedBde = JSON.parse(typedBde);
  const handleShare = async () => {
    const shareData = {
      title: `${parsedBde.firstname} ${parsedBde.lastname} - Business Development Executive`,
      text: `Connect with ${parsedBde.firstname} ${parsedBde.lastname}, Business Development Executive at Osicon Homes`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback for browsers that don't support Web Share API
        const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          shareData.text
        )}&url=${encodeURIComponent(shareData.url)}`;
        window.open(shareUrl, "_blank");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <Button
      onClick={handleShare}
      className="flex cursor-pointer md:mt-4 items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-gray-300 hover:text-white hover:bg-white/20 transition-all duration-300"
    >
      <Share2 className="w-4 h-4" />
      <span>Share Profile</span>
    </Button>
  );
};

export default ShareButton