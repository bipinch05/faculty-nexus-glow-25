
import React, { useState, useRef, useEffect } from 'react';
import { Send, Smile, AtSign, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface Message {
  id: string;
  user: string;
  content: string;
  timestamp: Date;
  mentions?: string[];
}

interface FacultyMention {
  name: string;
  subject: string;
  rating: number;
}

const ChatSystem = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      user: 'Rahul Kumar',
      content: 'Hey guys, what do you think about @Dr. Arvind Singh for Data Structures?',
      timestamp: new Date(Date.now() - 120000),
      mentions: ['Dr. Arvind Singh']
    },
    {
      id: '2',
      user: 'Priya Sharma',
      content: 'He\'s really good! Explains concepts clearly. Just took his exam last week.',
      timestamp: new Date(Date.now() - 60000),
    },
    {
      id: '3',
      user: 'Amit Singh',
      content: '@Dr. Arvind Singh is strict about attendance though. But his notes are amazing!',
      timestamp: new Date(Date.now() - 30000),
      mentions: ['Dr. Arvind Singh']
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [showMentionPopup, setShowMentionPopup] = useState(false);
  const [mentionSearch, setMentionSearch] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const facultyList: FacultyMention[] = [
    { name: 'Dr. Arvind Singh', subject: 'Data Structures', rating: 4.8 },
    { name: 'Prof. Rajesh Kumar', subject: 'Algorithm Design', rating: 4.5 },
    { name: 'Dr. Sita Devi', subject: 'Database Systems', rating: 4.7 },
    { name: 'Prof. Manoj Gupta', subject: 'Computer Networks', rating: 4.3 },
    { name: 'Dr. Neha Agarwal', subject: 'Machine Learning', rating: 4.9 },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const position = e.target.selectionStart || 0;
    setNewMessage(value);
    setCursorPosition(position);

    // Check for @ mentions
    const beforeCursor = value.substring(0, position);
    const mentionMatch = beforeCursor.match(/@(\w*)$/);
    
    if (mentionMatch) {
      setMentionSearch(mentionMatch[1]);
      setShowMentionPopup(true);
    } else {
      setShowMentionPopup(false);
    }
  };

  const insertMention = (facultyName: string) => {
    const beforeCursor = newMessage.substring(0, cursorPosition);
    const afterCursor = newMessage.substring(cursorPosition);
    const beforeMention = beforeCursor.replace(/@\w*$/, '');
    const newValue = beforeMention + `@${facultyName} ` + afterCursor;
    
    setNewMessage(newValue);
    setShowMentionPopup(false);
    
    setTimeout(() => {
      inputRef.current?.focus();
      const newPosition = beforeMention.length + facultyName.length + 2;
      inputRef.current?.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    const mentions = Array.from(newMessage.matchAll(/@([^@\s]+)/g)).map(match => match[1]);
    
    const message: Message = {
      id: Date.now().toString(),
      user: 'You',
      content: newMessage,
      timestamp: new Date(),
      mentions: mentions.length > 0 ? mentions : undefined
    };
    
    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const filteredFaculties = facultyList.filter(faculty =>
    faculty.name.toLowerCase().includes(mentionSearch.toLowerCase())
  );

  const formatMessageWithMentions = (content: string) => {
    return content.split(/(@[^@\s]+)/g).map((part, index) => {
      if (part.startsWith('@')) {
        return (
          <span key={index} className="text-kiit-blue font-semibold cursor-pointer hover:text-kiit-cyan transition-colors">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <Card className="glass border-white/10 h-full flex flex-col">
      <CardHeader className="pb-3 border-b border-white/10">
        <CardTitle className="text-gradient flex items-center space-x-2">
          <span>Global Faculty Chat</span>
          <div className="w-2 h-2 bg-kiit-green rounded-full animate-pulse"></div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="group">
              <div className="flex space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-kiit-blue to-kiit-purple flex items-center justify-center text-white text-sm font-semibold">
                  {message.user[0]}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-medium text-sm">{message.user}</span>
                    <span className="text-gray-400 text-xs">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  
                  <div className="mt-1">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {formatMessageWithMentions(message.content)}
                    </p>
                    
                    {message.mentions && message.mentions.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {message.mentions.map((mention, index) => (
                          <Badge key={index} className="bg-kiit-blue/20 text-kiit-blue border-kiit-blue/30 text-xs">
                            @{mention}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {showMentionPopup && (
          <div className="absolute bottom-20 left-4 right-4 z-50">
            <Card className="glass-dark border-white/20">
              <CardContent className="p-2">
                <div className="text-xs text-gray-400 mb-2 px-2">Select a faculty to mention:</div>
                <div className="space-y-1 max-h-40 overflow-y-auto">
                  {filteredFaculties.map((faculty) => (
                    <button
                      key={faculty.name}
                      onClick={() => insertMention(faculty.name)}
                      className="w-full text-left p-2 rounded hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-white text-sm font-medium">{faculty.name}</div>
                          <div className="text-gray-400 text-xs">{faculty.subject}</div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-kiit-orange text-xs">★</span>
                          <span className="text-white text-xs">{faculty.rating}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="p-4 border-t border-white/10">
          <div className="flex space-x-2">
            <div className="flex-1 relative">
              <Input
                ref={inputRef}
                value={newMessage}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Type @ to mention a faculty..."
                className="glass border-white/20 text-white placeholder-gray-400 pr-20"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-6 h-6 text-gray-400 hover:text-white"
                >
                  <Smile className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-6 h-6 text-gray-400 hover:text-white"
                >
                  <AtSign className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <Button
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              className="btn-gradient"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatSystem;
