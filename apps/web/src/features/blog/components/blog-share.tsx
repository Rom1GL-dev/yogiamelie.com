'use client';
import React, { useState } from 'react';
import { Share } from 'lucide-react';

export function BlogShare() {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const copyLinkToClipboard = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      setTooltipVisible(true);
      setTimeout(() => setTooltipVisible(false), 2000);
    });
  };

  return (
    <div className="relative">
      <Share
        onClick={copyLinkToClipboard}
        className={'h-5 w-5 cursor-pointer text-gray-500'}
      />
      {tooltipVisible && (
        <div className="absolute top-full left-1/2 w-52 -translate-x-1/2 transform rounded bg-gray-800 px-2 py-1 text-center text-xs text-white shadow-lg">
          Le lien du blog a bien été copié
        </div>
      )}
    </div>
  );
}
