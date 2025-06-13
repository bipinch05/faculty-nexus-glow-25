
import React, { useState, useEffect } from 'react';
import { X, Star, MessageCircle, TrendingUp } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

interface Notification {
  id: string;
  type: 'rating' | 'comment' | 'trending';
  title: string;
  message: string;
  facultyName: string;
  timestamp: Date;
  isNew: boolean;
}

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [visibleNotifications, setVisibleNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Simulate real-time notifications
    const notificationTemplates = [
      {
        type: 'rating' as const,
        title: 'New Rating Added',
        message: 'received a 5-star review for excellent teaching!',
        facultyName: 'Dr. Arvind Singh'
      },
      {
        type: 'comment' as const,
        title: 'New Comment',
        message: 'has a new comment: "Great explanation of algorithms!"',
        facultyName: 'Prof. Rajesh Kumar'
      },
      {
        type: 'trending' as const,
        title: 'Trending Faculty',
        message: 'is trending with 15+ reviews today!',
        facultyName: 'Dr. Neha Agarwal'
      }
    ];

    const interval = setInterval(() => {
      const randomTemplate = notificationTemplates[Math.floor(Math.random() * notificationTemplates.length)];
      const newNotification: Notification = {
        id: Date.now().toString(),
        ...randomTemplate,
        timestamp: new Date(),
        isNew: true
      };

      setNotifications(prev => [newNotification, ...prev.slice(0, 9)]);
      setVisibleNotifications(prev => [newNotification, ...prev.slice(0, 2)]);

      // Auto-hide after 5 seconds
      setTimeout(() => {
        setVisibleNotifications(prev => prev.filter(n => n.id !== newNotification.id));
      }, 5000);
    }, 8000); // New notification every 8 seconds

    return () => clearInterval(interval);
  }, []);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'rating':
        return <Star className="w-4 h-4 text-kiit-orange" />;
      case 'comment':
        return <MessageCircle className="w-4 h-4 text-kiit-blue" />;
      case 'trending':
        return <TrendingUp className="w-4 h-4 text-kiit-green" />;
      default:
        return <Star className="w-4 h-4 text-kiit-blue" />;
    }
  };

  const dismissNotification = (id: string) => {
    setVisibleNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2 w-80">
      {visibleNotifications.map((notification, index) => (
        <Card 
          key={notification.id}
          className="glass-dark border-white/20 animate-slide-in transform transition-all duration-300"
          style={{ 
            animationDelay: `${index * 100}ms`,
            transform: `translateY(${index * 10}px)` 
          }}
        >
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                {getNotificationIcon(notification.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-white truncate">
                    {notification.title}
                  </h4>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-4 h-4 text-gray-400 hover:text-white flex-shrink-0 ml-2"
                    onClick={() => dismissNotification(notification.id)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
                
                <p className="text-xs text-gray-300 mt-1">
                  <span className="text-kiit-blue font-medium">{notification.facultyName}</span>{' '}
                  {notification.message}
                </p>
                
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-400">
                    {notification.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                  
                  {notification.isNew && (
                    <span className="text-xs bg-kiit-green/20 text-kiit-green px-2 py-1 rounded-full animate-pulse">
                      New
                    </span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default NotificationSystem;
