import React from "react";
import { Home, Search, Bookmark, User, Moon, Sun } from "lucide-react";

/**
 * Mobile Bottom Navigation component
 */
export function MobileBottomNav({
  activeTab,
  onTabChange,
  watchlistCount,
  darkMode,
  setDarkMode,
}) {
  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "search", label: "Search", icon: Search },
    {
      id: "watchlist",
      label: "Watchlist",
      icon: Bookmark,
      badge: watchlistCount,
    },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border z-50">
      <div className="flex items-center justify-around py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                flex flex-col items-center justify-center p-2 flex-1 transition-colors text-[#e63946]
                ${isActive ? "text-primary" : "text-muted-foreground"}
              `}
            >
              <div className="relative">
                <Icon className="h-6 w-6 text-[#e63946]" />
                {tab.badge > 0 && (
                  <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center text-[#e63946]">
                    {tab.badge > 9 ? "9+" : tab.badge}
                  </div>
                )}
              </div>
              <span className="text-xs mt-1">{tab.label}</span>
            </button>
          );
        })}

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex flex-col items-center justify-center p-2 flex-1 text-muted-foreground transition-colors"
        >
          {darkMode ? (
            <Sun className="h-6 w-6 text-[#e63946]" />
          ) : (
            <Moon className="h-6 w-6" />
          )}
          <span className="text-xs mt-1">Theme</span>
        </button>
      </div>
    </div>
  );
}
