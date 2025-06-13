import React from 'react';
import { Home, Star, MessageCircle, Filter, Users, BookOpen, Calendar, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar = ({ isOpen, onClose, activeTab, onTabChange }: SidebarProps) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, count: null },
    { id: 'top-rated', label: 'Top Rated', icon: Star, count: 15 },
    { id: 'most-discussed', label: 'Most Discussed', icon: MessageCircle, count: 8 },
    { id: 'my-reviews', label: 'My Reviews', icon: Users, count: 12 },
    { id: 'subjects', label: 'Subjects', icon: BookOpen, count: null },
    { id: 'schedule', label: 'Schedule', icon: Calendar, count: null },
    { id: 'filters', label: 'Filters', icon: Filter, count: null },
    { id: 'settings', label: 'Settings', icon: Settings, count: null },
  ];

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={`
        fixed left-0 top-0 h-full w-64 glass-dark border-r border-white/10 z-50 transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0
      `}>
        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gradient font-poppins">Faculty Hub</h2>
            <p className="text-sm text-gray-400 mt-1">Discover & Review</p>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  className={`
                    w-full justify-between p-3 h-auto text-left transition-all duration-300
                    ${isActive 
                      ? 'bg-gradient-to-r from-kiit-blue/20 to-kiit-purple/20 border border-kiit-blue/30 text-white' 
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }
                  `}
                  onClick={() => onTabChange(item.id)}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-kiit-blue' : ''}`} />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.count && (
                    <Badge variant="secondary" className="bg-kiit-blue/20 text-kiit-blue border-kiit-blue/30">
                      {item.count}
                    </Badge>
                  )}
                </Button>
              );
            })}
          </nav>

          <div className="mt-8 p-4 glass rounded-lg border border-white/10">
            <h3 className="text-sm font-semibold text-white mb-2">Quick Stats</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Reviews</span>
                <span className="text-kiit-blue font-semibold">1,247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Faculties Rated</span>
                <span className="text-kiit-green font-semibold">89</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Your Ranking</span>
                <span className="text-kiit-purple font-semibold">#23</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
