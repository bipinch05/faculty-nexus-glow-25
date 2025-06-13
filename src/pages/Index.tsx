import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import FacultyCard from '../components/FacultyCard';
import ChatSystem from '../components/ChatSystem';
import NotificationSystem from '../components/NotificationSystem';
import FacultyDetails from '../components/FacultyDetails';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Star, TrendingUp, Users, MessageCircle, Filter, X } from 'lucide-react';

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [showChat, setShowChat] = useState(false);

  const mockFaculties = [
    {
      id: '1',
      name: 'Dr. Arvind Singh',
      subjects: ['Data Structures', 'Algorithms'],
      sections: ['CSE 2A', 'CSE 2B'],
      rating: 4.8,
      likes: 120,
      dislikes: 8,
      tags: ['Strict', 'Helpful', 'Best for Notes'],
      department: 'Computer Science & Engineering',
      topComment: 'Explains concepts in depth. Strict about attendance.',
      sentiment: 'positive' as const,
      isNew: true
    },
    {
      id: '2',
      name: 'Prof. Rajesh Kumar',
      subjects: ['Algorithm Design', 'Competitive Programming'],
      sections: ['CSE 3A', 'CSE 3C'],
      rating: 4.5,
      likes: 95,
      dislikes: 12,
      tags: ['Friendly', 'Experienced'],
      department: 'Computer Science & Engineering',
      topComment: 'Great for competitive programming guidance.',
      sentiment: 'positive' as const
    },
    {
      id: '3',
      name: 'Dr. Sita Devi',
      subjects: ['Database Systems', 'Software Engineering'],
      sections: ['CSE 4A', 'CSE 4B'],
      rating: 4.7,
      likes: 88,
      dislikes: 5,
      tags: ['Helpful', 'Friendly', 'Best for Notes'],
      department: 'Computer Science & Engineering',
      topComment: 'Very supportive and explains concepts clearly.',
      sentiment: 'positive' as const
    },
    {
      id: '4',
      name: 'Prof. Manoj Gupta',
      subjects: ['Computer Networks', 'Cyber Security'],
      sections: ['CSE 3B', 'CSE 4C'],
      rating: 4.3,
      likes: 76,
      dislikes: 18,
      tags: ['Strict', 'Experienced'],
      department: 'Computer Science & Engineering',
      topComment: 'Tough but fair. Great practical knowledge.',
      sentiment: 'neutral' as const
    },
    {
      id: '5',
      name: 'Dr. Neha Agarwal',
      subjects: ['Machine Learning', 'Artificial Intelligence'],
      sections: ['CSE 4A', 'CSE 4D'],
      rating: 4.9,
      likes: 145,
      dislikes: 3,
      tags: ['Friendly', 'Helpful', 'Best for Notes'],
      department: 'Computer Science & Engineering',
      topComment: 'Outstanding teacher! Makes ML concepts easy to understand.',
      sentiment: 'positive' as const,
      isNew: true
    },
    {
      id: '6',
      name: 'Prof. Suresh Patel',
      subjects: ['Operating Systems', 'System Programming'],
      sections: ['CSE 3A', 'CSE 3D'],
      rating: 4.2,
      likes: 67,
      dislikes: 22,
      tags: ['Strict', 'Experienced'],
      department: 'Computer Science & Engineering',
      topComment: 'Good practical approach but assignments are tough.',
      sentiment: 'neutral' as const
    }
  ];

  const filteredFaculties = mockFaculties.filter(faculty => 
    faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faculty.subjects.some(subject => subject.toLowerCase().includes(searchQuery.toLowerCase())) ||
    faculty.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const topRatedFaculties = [...mockFaculties].sort((a, b) => b.rating - a.rating).slice(0, 3);
  const trendingFaculties = [...mockFaculties].sort((a, b) => (b.likes + Math.random() * 50) - (a.likes + Math.random() * 50)).slice(0, 3);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedFaculty(null);
        setShowChat(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass border-white/10 card-hover">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-6 h-6 lg:w-8 lg:h-8 text-kiit-blue" />
              <div>
                <p className="text-lg lg:text-2xl font-bold text-white">89</p>
                <p className="text-xs lg:text-sm text-gray-400">Total Faculties</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-white/10 card-hover">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Star className="w-6 h-6 lg:w-8 lg:h-8 text-kiit-orange" />
              <div>
                <p className="text-lg lg:text-2xl font-bold text-white">1,247</p>
                <p className="text-xs lg:text-sm text-gray-400">Total Reviews</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-white/10 card-hover">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-6 h-6 lg:w-8 lg:h-8 text-kiit-green" />
              <div>
                <p className="text-lg lg:text-2xl font-bold text-white">4.6</p>
                <p className="text-xs lg:text-sm text-gray-400">Avg Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-white/10 card-hover">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-6 h-6 lg:w-8 lg:h-8 text-kiit-purple" />
              <div>
                <p className="text-lg lg:text-2xl font-bold text-white">156</p>
                <p className="text-xs lg:text-sm text-gray-400">Active Chats</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <Button 
          onClick={() => setShowChat(!showChat)}
          className="btn-gradient"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          {showChat ? 'Hide Chat' : 'Open Chat'}
        </Button>
        <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
          <Filter className="w-4 h-4 mr-2" />
          Advanced Filters
        </Button>
        <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
          <TrendingUp className="w-4 h-4 mr-2" />
          View Analytics
        </Button>
      </div>

      {/* Top Rated Section */}
      <Card className="glass border-white/10">
        <CardHeader>
          <CardTitle className="text-gradient flex items-center space-x-2">
            <Star className="w-5 h-5 text-kiit-orange" />
            <span>Top Rated This Week</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {topRatedFaculties.map((faculty, index) => (
              <div key={faculty.id} className="relative">
                {index === 0 && (
                  <Badge className="absolute -top-2 -right-2 z-10 bg-kiit-orange text-white">
                    #1
                  </Badge>
                )}
                <FacultyCard 
                  faculty={faculty} 
                  onViewDetails={setSelectedFaculty}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* All Faculties */}
      <Card className="glass border-white/10">
        <CardHeader>
          <CardTitle className="text-white">All Faculties</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            {filteredFaculties.map(faculty => (
              <FacultyCard 
                key={faculty.id} 
                faculty={faculty} 
                onViewDetails={setSelectedFaculty}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'top-rated':
        return (
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-gradient">Top Rated Faculties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {topRatedFaculties.map(faculty => (
                  <FacultyCard 
                    key={faculty.id} 
                    faculty={faculty} 
                    onViewDetails={setSelectedFaculty}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        );
      case 'most-discussed':
        return (
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-gradient">Most Discussed Faculties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {trendingFaculties.map(faculty => (
                  <FacultyCard 
                    key={faculty.id} 
                    faculty={faculty} 
                    onViewDetails={setSelectedFaculty}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        );
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-kiit-darker">
      <div className="flex w-full h-screen overflow-hidden">
        <Sidebar 
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        
        <div className="flex-1 flex flex-col min-h-0">
          <Header 
            onMenuClick={() => setSidebarOpen(true)}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
          
          <main className="flex-1 overflow-hidden">
            <div className="h-full flex">
              <div className={`transition-all duration-300 ease-in-out overflow-auto ${
                showChat ? 'w-0 lg:w-2/3' : 'w-full'
              }`}>
                <div className="p-4 lg:p-6">
                  {renderContent()}
                </div>
              </div>
              
              {showChat && (
                <div className="w-full lg:w-1/3 border-l border-white/10 bg-kiit-darker/50 flex flex-col">
                  <div className="p-3 border-b border-white/10 flex items-center justify-between bg-kiit-darker/80">
                    <h3 className="text-white font-semibold">Faculty Chat</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowChat(false)}
                      className="text-gray-400 hover:text-white lg:hidden"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <ChatSystem />
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      <NotificationSystem />
      
      {selectedFaculty && (
        <FacultyDetails 
          faculty={selectedFaculty} 
          onClose={() => setSelectedFaculty(null)}
        />
      )}
    </div>
  );
};

export default Index;
