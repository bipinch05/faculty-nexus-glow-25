
import React, { useState, useRef, useEffect } from 'react';
import { Send, Smile, AtSign, Search, Reply, MoreVertical, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';

interface Message {
  id: string;
  user: string;
  content: string;
  timestamp: Date;
  mentions?: string[];
  replyTo?: string;
  avatar?: string;
}

interface FacultyMention {
  name: string;
  subject: string;
  rating: number;
  department: string;
  sections: string[];
  tags: string[];
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
      replyTo: '1'
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
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [selectedMention, setSelectedMention] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const facultyList: FacultyMention[] = [
    { 
      name: 'Dr. Arvind Singh', 
      subject: 'Data Structures', 
      rating: 4.8,
      department: 'Computer Science & Engineering',
      sections: ['CSE 2A', 'CSE 2B'],
      tags: ['Strict', 'Helpful', 'Best for Notes']
    },
    { 
      name: 'Prof. Rajesh Kumar', 
      subject: 'Algorithm Design', 
      rating: 4.5,
      department: 'Computer Science & Engineering',
      sections: ['CSE 3A', 'CSE 3C'],
      tags: ['Friendly', 'Experienced']
    },
    { 
      name: 'Dr. Sita Devi', 
      subject: 'Database Systems', 
      rating: 4.7,
      department: 'Computer Science & Engineering',
      sections: ['CSE 4A', 'CSE 4B'],
      tags: ['Helpful', 'Friendly']
    }
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
      mentions: mentions.length > 0 ? mentions : undefined,
      replyTo: replyingTo || undefined
    };
    
    setMessages(prev => [...prev, message]);
    setNewMessage('');
    setReplyingTo(null);
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
        const facultyName = part.substring(1);
        return (
          <span 
            key={index} 
            className="text-kiit-blue font-semibold cursor-pointer hover:text-kiit-cyan transition-colors hover:underline"
            onClick={() => setSelectedMention(facultyName)}
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  const getReplyToMessage = (messageId: string) => {
    return messages.find(msg => msg.id === messageId);
  };

  const FacultyMentionCard = ({ facultyName }: { facultyName: string }) => {
    const faculty = facultyList.find(f => f.name === facultyName);
    if (!faculty) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <Card className="glass-dark border-white/20 max-w-md w-full animate-scale-in">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg text-gradient">{faculty.name}</CardTitle>
                <p className="text-sm text-gray-400">{faculty.department}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedMention(null)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="border-kiit-blue/30 text-kiit-blue">
                {faculty.subject}
              </Badge>
              <div className="flex items-center space-x-1">
                <span className="text-kiit-orange">★</span>
                <span className="text-white font-semibold">{faculty.rating}</span>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">Sections</h4>
              <div className="flex flex-wrap gap-1">
                {faculty.sections.map((section, index) => (
                  <Badge key={index} variant="secondary" className="text-xs bg-white/10 text-gray-300">
                    {section}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">Tags</h4>
              <div className="flex flex-wrap gap-1">
                {faculty.tags.map((tag, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="text-xs bg-kiit-blue/20 text-kiit-blue border-kiit-blue/30"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <>
      <Card className="glass border-white/10 h-full flex flex-col max-h-[calc(100vh-8rem)]">
        <CardHeader className="pb-3 border-b border-white/10 flex-shrink-0">
          <CardTitle className="text-gradient flex items-center space-x-2">
            <span>Global Faculty Chat</span>
            <div className="w-2 h-2 bg-kiit-green rounded-full animate-pulse"></div>
            <Badge className="bg-kiit-blue/20 text-kiit-blue border-kiit-blue/30 ml-auto">
              {messages.length} messages
            </Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0 min-h-0">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => {
                const replyToMsg = message.replyTo ? getReplyToMessage(message.replyTo) : null;
                
                return (
                  <div key={message.id} className="group animate-fade-in">
                    <div className="flex space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-kiit-blue to-kiit-purple flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                        {message.user[0]}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-white font-medium text-sm">{message.user}</span>
                          <span className="text-gray-400 text-xs">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-white"
                            onClick={() => setReplyingTo(message.id)}
                          >
                            <Reply className="w-3 h-3" />
                          </Button>
                        </div>
                        
                        {replyToMsg && (
                          <div className="mb-2 p-2 bg-white/5 rounded border-l-2 border-kiit-blue/50">
                            <div className="text-xs text-gray-400 mb-1">Replying to {replyToMsg.user}</div>
                            <div className="text-xs text-gray-300 truncate">{replyToMsg.content}</div>
                          </div>
                        )}
                        
                        <div className="bg-white/5 rounded-lg p-3 border border-white/10 hover:bg-white/10 transition-colors">
                          <p className="text-gray-300 text-sm leading-relaxed break-words">
                            {formatMessageWithMentions(message.content)}
                          </p>
                          
                          {message.mentions && message.mentions.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {message.mentions.map((mention, index) => (
                                <Badge 
                                  key={index} 
                                  className="bg-kiit-blue/20 text-kiit-blue border-kiit-blue/30 text-xs cursor-pointer hover:bg-kiit-blue/30 transition-colors"
                                  onClick={() => setSelectedMention(mention)}
                                >
                                  @{mention}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {showMentionPopup && (
            <div className="absolute bottom-20 left-4 right-4 z-40">
              <Card className="glass-dark border-white/20 animate-slide-up">
                <CardContent className="p-2">
                  <div className="text-xs text-gray-400 mb-2 px-2 flex items-center space-x-1">
                    <AtSign className="w-3 h-3" />
                    <span>Select a faculty to mention:</span>
                  </div>
                  <ScrollArea className="max-h-40">
                    <div className="space-y-1">
                      {filteredFaculties.map((faculty) => (
                        <button
                          key={faculty.name}
                          onClick={() => insertMention(faculty.name)}
                          className="w-full text-left p-2 rounded hover:bg-white/10 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div className="min-w-0 flex-1">
                              <div className="text-white text-sm font-medium truncate">{faculty.name}</div>
                              <div className="text-gray-400 text-xs truncate">{faculty.subject} • {faculty.department}</div>
                            </div>
                            <div className="flex items-center space-x-1 ml-2">
                              <span className="text-kiit-orange text-xs">★</span>
                              <span className="text-white text-xs">{faculty.rating}</span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="p-4 border-t border-white/10 flex-shrink-0">
            {replyingTo && (
              <div className="mb-2 p-2 bg-kiit-blue/10 rounded border border-kiit-blue/30 flex items-center justify-between">
                <div className="text-sm text-kiit-blue">
                  Replying to {getReplyToMessage(replyingTo)?.user}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setReplyingTo(null)}
                  className="w-6 h-6 text-kiit-blue hover:text-white"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            )}
            
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
                className="btn-gradient px-4"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedMention && <FacultyMentionCard facultyName={selectedMention} />}
    </>
  );
};

export default ChatSystem;
