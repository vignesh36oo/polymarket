"use client";

import React, { useState } from "react";
import { Mail, Bell } from "lucide-react";

export default function NotificationSettings() {
  const [emailResolutions, setEmailResolutions] = useState(true);
  const [inAppFills, setInAppFills] = useState(true);
  const [inAppResolutions, setInAppResolutions] = useState(true);
  const [hideSmallFills, setHideSmallFills] = useState(true);

  // Reusable toggle switch component for the notifications
  const ToggleSwitch = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <button 
      onClick={onChange}
      className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${checked ? "bg-blue-600" : "bg-zinc-200 dark:bg-zinc-800"}`}
    >
      <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${checked ? "translate-x-5" : "translate-x-0"}`}></div>
    </button>
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <h2 className="text-2xl font-bold text-black dark:text-white mb-6">Notifications Settings</h2>

      <div className="bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden text-sm">
        
        {/* Email Section */}
        <div className="p-5 border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-base mb-6">
                <Mail size={18} />
                <h3>Email</h3>
            </div>
            
            <div className="flex items-center justify-between">
                <span className="font-semibold text-zinc-700 dark:text-zinc-300">Resolutions</span>
                <ToggleSwitch checked={emailResolutions} onChange={() => setEmailResolutions(!emailResolutions)} />
            </div>
        </div>

        {/* In-app Section */}
        <div className="p-5">
            <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-base mb-6">
                <Bell size={18} />
                <h3>In-app</h3>
            </div>
            
            <div className="space-y-6">
                {/* Order Fills */}
                <div>
                   <div className="flex items-center justify-between mb-2">
                       <span className="font-semibold text-zinc-700 dark:text-zinc-300">Order Fills</span>
                       <ToggleSwitch checked={inAppFills} onChange={() => setInAppFills(!inAppFills)} />
                   </div>
                   <div className="flex items-center gap-2 ml-1">
                      <input 
                         type="checkbox" 
                         id="hide-fills"
                         checked={hideSmallFills}
                         onChange={(e) => setHideSmallFills(e.target.checked)}
                         className="w-3.5 h-3.5 rounded border-zinc-700 bg-transparent text-blue-500 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer" 
                      />
                      <label htmlFor="hide-fills" className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 cursor-pointer">
                         Hide small fills (&lt;1 share)
                      </label>
                   </div>
                </div>

                {/* Resolutions */}
                <div className="flex items-center justify-between">
                    <span className="font-semibold text-zinc-700 dark:text-zinc-300">Resolutions</span>
                    <ToggleSwitch checked={inAppResolutions} onChange={() => setInAppResolutions(!inAppResolutions)} />
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}
