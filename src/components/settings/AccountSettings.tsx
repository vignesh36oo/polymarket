"use client";

import React, { useState } from "react";
import { AlertCircle } from "lucide-react";

export default function AccountSettings() {
  const [useCustomRPC, setUseCustomRPC] = useState(false);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
       <h2 className="text-2xl font-bold text-black dark:text-white mb-6">Account Settings</h2>

       {/* Wallet Section */}
       <div className="mb-10">
         <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-4">Wallet</h3>
         <div className="bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-xl p-5">
            <div className="flex items-start justify-between">
               <div>
                 <h4 className="font-bold text-zinc-900 dark:text-zinc-100">Pay your own gas</h4>
                 <p className="text-sm text-zinc-500 mt-0.5">
                   Use a custom RPC (must own $POL in your connected wallet)
                 </p>
               </div>
               
               {/* Custom Toggle Switch */}
               <button 
                  onClick={() => setUseCustomRPC(!useCustomRPC)}
                  className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${useCustomRPC ? "bg-blue-600" : "bg-zinc-200 dark:bg-zinc-800"}`}
               >
                 <div
                   className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${useCustomRPC ? "translate-x-5" : "translate-x-0"}`}
                 ></div>
               </button>
            </div>

            <div className="mt-6 flex justify-end">
               <button className="px-4 py-2 bg-blue-600/10 text-blue-500 hover:bg-blue-600/20 font-bold text-sm rounded-lg transition-colors">
                  Save changes
               </button>
            </div>
         </div>
       </div>

       {/* Delete Account Section */}
       <div>
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-4">Delete Account</h3>
          
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3 text-red-500 mb-6">
             <AlertCircle size={20} className="flex-shrink-0" />
             <p className="text-sm font-medium">Permanently delete your account. This action cannot be undone.</p>
          </div>

          <button className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-sm rounded-xl transition-colors shadow-lg shadow-red-500/20 active:scale-[0.98]">
             Delete Account
          </button>
       </div>
    </div>
  );
}
