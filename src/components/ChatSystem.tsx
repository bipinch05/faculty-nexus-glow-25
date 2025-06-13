
import React, { useState, useRef, useEffect } from 'react';
import { Send, Smile, Paperclip, Search, Filter, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import FacultyMentionCard from './FacultyMentionCard';

interface Message {
  id: string;
  user: string;
  content: string;
  timestamp: Date;
  avatar: string;
  replyTo?: string;
  mentionedFaculty?: any;
}

const ChatSystem = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      user: 'Rahul Kumar',
      content: 'Hey everyone! What do you think about @Dr. Neha Agarwal for Machine Learning?',
      timestamp: new Date(Date.now() - 300000),
      avatar: 'RK',
      mentionedFaculty: {
        id: '5',
        name: 'Dr. Neha Agarwal',
        subjects: ['Machine Learning', 'Artificial Intelligence'],
        sections: ['CSE 4A', 'CSE 4D'],
        rating: 4.9,
        likes: 145,
        tags: ['Friendly', 'Helpful', 'Best for Notes'],
        department: 'Computer Science & Engineering'
      }
    },
    {
      id: '2',
      user: 'Priya Sharma',
      content: 'She\'s amazing! Best teacher for ML concepts.',
      timestamp: new Date(Date.now() - 240000),
      avatar: 'PS',
      replyTo: '1'
    },
    {
      id: '3',
      user: 'Amit Singh',
      content: 'Anyone knows about @Prof. Rajesh Kumar? How is he for Algorithm Design?',
      timestamp: new Date(Date.now() - 180000),
      avatar: 'AS',
      mentionedFaculty: {
        id: '2',
        name: 'Prof. Rajesh Kumar',
        subjects: ['Algorithm Design', 'Competitive Programming'],
        sections: ['CSE 3A', 'CSE 3C'],
        rating: 4.5,
        likes: 95,
        tags: ['Friendly', 'Experienced'],
        department: 'Computer Science & Engineering'
      }
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSection, setFilterSection] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const mockFaculties = [
    {
      id: '1',
      name: 'Dr. Arvind Singh',
      subjects: ['Data Structures', 'Algorithms'],
      sections: ['CSE 2A', 'CSE 2B'],
      rating: 4.8,
      likes: 120,
      tags: ['Strict', 'Helpful', 'Best for Notes'],
      department: 'Computer Science & Engineering'
    },
    {
      id: '2',
      name: 'Prof. Rajesh Kumar',
      subjects: ['Algorithm Design', 'Competitive Programming'],
      sections: ['CSE 3A', 'CSE 3C'],
      rating: 4.5,
      likes: 95,
      tags: ['Friendly', 'Experienced'],
      department: 'Computer Science & Engineering'
    },
    {
      id: '5',
      name: 'Dr. Neha Agarwal',
      subjects: ['Machine Learning', 'Artificial Intelligence'],
      sections: ['CSE 4A', 'CSE 4D'],
      rating: 4.9,
      likes: 145,
      tags: ['Friendly', 'Helpful', 'Best for Notes'],
      department: 'Computer Science & Engineering'
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (value: string) => {
    setNewMessage(value);
    
    // Check for @ mentions
    const atIndex = value.lastIndexOf('@');
    if (atIndex !== -1 && atIndex === value.length - 1) {
      setShowSuggestions(true);
      setSuggestions(mockFaculties);
    } else if (atIndex !== -1) {
      const searchTerm = value.substring(atIndex + 1);
      if (searchTerm.length > 0) {
        const filtered = mockFaculties.filter(faculty =>
          faculty.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSuggestions(filtered);
        setShowSuggestions(filtered.length > 0);
      } else {
        setSuggestions(mockFaculties);
        setShowSuggestions(true);
      }
    } else {
      setShowSuggestions(false);
    }
  };

  const handleFacultySelect = (faculty: any) => {
    const atIndex = newMessage.lastIndexOf('@');
    const beforeAt = newMessage.substring(0, atIndex);
    setNewMessage(beforeAt + `@${faculty.name} `);
    setShowSuggestions(false);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Check for faculty mentions
      const mentionPattern = /@([^@\s]+(?:\s+[^@\s]+)*)/g;
      const mentions = newMessage.match(mentionPattern);
      let mentionedFaculty = null;

      if (mentions) {
        const facultyName = mentions[0].substring(1); // Remove @
        mentionedFaculty = mockFaculties.find(f => f.name.includes(facultyName));
      }

      const message: Message = {
        id: Date.now().toString(),
        user: 'You',
        content: newMessage,
        timestamp: new Date(),
        avatar: 'YU',
        replyTo: replyingTo || undefined,
        mentionedFaculty
      };

      setMessages([...messages, message]);
      setNewMessage('');
      setReplyingTo(null);
    }
  };

  const filteredMessages = messages.filter(msg => {
    const matchesSearch = searchQuery === '' || 
      msg.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.user.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSection = filterSection === '' || 
      (msg.mentionedFaculty && msg.mentionedFaculty.sections.includes(filterSection));
    
    return matchesSearch && matchesSection;
  });

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="h-full flex flex-col bg-kiit-darker/30">
      {/* Chat Header with Filters */}
      <div className="p-4 border-b border-white/10 bg-kiit-darker/50 backdrop-blur-md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-kiit-blue" />
            <h3 className="text-white font-semibold">Faculty Discussion</h3>
            <Badge className="bg-kiit-green/20 text-kiit-green">
              {messages.length} messages
            </Badge>
          </div>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 glass border-white/20 text-white placeholder-gray-400 text-sm"
            />
          </div>
          <Select value={filterSection} onValueChange={setFilterSection}>
            <SelectTrigger className="w-32 glass border-white/20 text-white">
              <SelectValue placeholder="Section" />
            </SelectTrigger>
            <SelectContent className="glass border-white/20">
              <SelectItem value="">All</SelectItem>
              <SelectItem value="CSE 2A">CSE 2A</SelectItem>
              <SelectItem value="CSE 2B">CSE 2B</SelectItem>
              <SelectItem value="CSE 3A">CSE 3A</SelectItem>
              <SelectItem value="CSE 3C">CSE 3C</SelectItem>
              <SelectItem value="CSE 4A">CSE 4A</SelectItem>
              <SelectItem value="CSE 4D">CSE 4D</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {filteredMessages.map((message) => (
          <div key={message.id} className="animate-fade-in">
            {message.replyTo && (
              <div className="ml-12 mb-1">
                <div className="text-xs text-gray-500 bg-white/5 rounded px-2 py-1 inline-block">
                  Replying to: {messages.find(m => m.id === message.replyTo)?.content.substring(0, 50)}...
                </div>
              </div>
            )}
            
            <div className="flex space-x-3 group">
              <div className="w-8 h-8 bg-gradient-to-br from-kiit-blue to-kiit-purple rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {message.avatar}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-white font-medium text-sm">{message.user}</span>
                  <span className="text-gray-400 text-xs">{formatTime(message.timestamp)}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setReplyingTo(message.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-white px-2 py-1 h-6 text-xs"
                  >
                    Reply
                  </Button>
                </div>
                
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <p className="text-gray-300 text-sm leading-relaxed">{message.content}</p>
                  
                  {message.mentionedFaculty && (
                    <FacultyMentionCard faculty={message.mentionedFaculty} />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Faculty Suggestions */}
      {showSuggestions && (
        <div className="border-t border-white/10 p-2 bg-kiit-darker/80 backdrop-blur-md">
          <div className="text-xs text-gray-400 mb-2">Select a faculty to mention:</div>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {suggestions.map((faculty) => (
              <Button
                key={faculty.id}
                variant="ghost"
                className="w-full justify-start text-left p-2 h-auto hover:bg-white/10"
                onClick={() => handleFacultySelect(faculty)}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-kiit-blue rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {faculty.name.split(' ').map((n: string) => n[0]).join('')}
                  </div>
                  <div>
                    <div className="text-white text-sm">{faculty.name}</div>
                    <div className="text-gray-400 text-xs">{faculty.subjects.join(', ')}</div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Reply Indicator */}
      {replyingTo && (
        <div className="px-4 py-2 bg-kiit-blue/10 border-t border-kiit-blue/30">
          <div className="flex items-center justify-between">
            <span className="text-kiit-blue text-sm">
              Replying to: {messages.find(m => m.id === replyingTo)?.content.substring(0, 50)}...
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setReplyingTo(null)}
              className="text-gray-400 hover:text-white"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Message Input */}
      <div className="p-4 border-t border-white/10 bg-kiit-darker/50 backdrop-blur-md">
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <Input
              placeholder="Type a message... (use @ to mention faculty)"
              value={newMessage}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="glass border-white/20 text-white placeholder-gray-400 pr-20"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
              <Button variant="ghost" size="icon" className="w-8 h-8 text-gray-400 hover:text-white">
                <Smile className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="w-8 h-8 text-gray-400 hover:text-white">
                <Paperclip className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <Button onClick={handleSendMessage} className="btn-gradient">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatSystem;
