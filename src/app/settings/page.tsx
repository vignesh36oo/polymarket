"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { User, Wallet, Activity, Bell, Key, Code } from "lucide-react";
import ProfileSettings from "@/components/settings/ProfileSettings";
import AccountSettings from "@/components/settings/AccountSettings";
import NotificationSettings from "@/components/settings/NotificationSettings";

const sidebarTabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "account", label: "Account", icon: Wallet },
  { id: "trading", label: "Trading", icon: Activity },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "relayer", label: "Relayer API Keys", icon: Key },
  { id: "builder", label: "Builder Codes", icon: Code },
];

function SettingsContent() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "profile";

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8 mt-6">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <nav className="space-y-1">
            {sidebarTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => window.history.replaceState(null, "", `/settings?tab=${tab.id}`)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold text-sm ${
                    isActive
                      ? "bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white"
                      : "text-zinc-500 hover:text-black dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900"
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-grow max-w-3xl">
          {activeTab === "profile" && <ProfileSettings />}
          {activeTab === "account" && <AccountSettings />}
          {activeTab === "notifications" && <NotificationSettings />}
          {/* Add more tabs as needed here */}
          {!["profile", "account", "notifications"].includes(activeTab) && (
            <div className="text-zinc-500 py-10">
              Settings component for "{activeTab}" under development.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import ProtectedRoute from "@/components/ProtectedRoute";

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <Suspense fallback={<div className="p-8 text-center text-zinc-500">Loading Settings...</div>}>
        <SettingsContent />
      </Suspense>
    </ProtectedRoute>
  );
}
