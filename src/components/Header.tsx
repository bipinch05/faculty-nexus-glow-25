
import React from 'react';
import { Search, Bell, User, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface HeaderProps {
  onMenuClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Header = ({ onMenuClick, searchQuery, onSearchChange }: HeaderProps) => {
  return (
    <header className="glass border-b border-white/10 p-4 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="lg:hidden text-white hover:bg-white/10"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-gradient font-poppins">KIIT-CONNECT</h1>
            <div className="w-2 h-2 bg-kiit-blue rounded-full animate-pulse-glow"></div>
          </div>
        </div>

        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search faculties, subjects, or departments..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 glass border-white/20 text-white placeholder-gray-400 focus:border-kiit-blue"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="relative text-white hover:bg-white/10"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-kiit-red rounded-full text-xs flex items-center justify-center animate-notification-bounce">
              3
            </span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
          >
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
