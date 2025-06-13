
import React, { useState } from 'react';
import { Star, Heart, MessageCircle, ThumbsUp, ThumbsDown, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader } from './ui/card';

interface FacultyCardProps {
  faculty: {
    id: string;
    name: string;
    subjects: string[];
    sections: string[];
    rating: number;
    likes: number;
    dislikes: number;
    tags: string[];
    department: string;
    image?: string;
    topComment?: string;
    sentiment?: 'positive' | 'neutral' | 'negative';
    isNew?: boolean;
  };
  onViewDetails: (faculty: any) => void;
}

const FacultyCard = ({ faculty, onViewDetails }: FacultyCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [localLikes, setLocalLikes] = useState(faculty.likes);
  
  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLocalLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const getSentimentColor = (sentiment?: string) => {
    switch (sentiment) {
      case 'positive': return 'text-kiit-green';
      case 'negative': return 'text-kiit-red';
      default: return 'text-kiit-orange';
    }
  };

  const getTagColor = (tag: string) => {
    const colors = {
      'Strict': 'bg-kiit-red/20 text-kiit-red border-kiit-red/30',
      'Friendly': 'bg-kiit-green/20 text-kiit-green border-kiit-green/30',
      'Helpful': 'bg-kiit-blue/20 text-kiit-blue border-kiit-blue/30',
      'Best for Notes': 'bg-kiit-purple/20 text-kiit-purple border-kiit-purple/30',
      'Experienced': 'bg-kiit-cyan/20 text-kiit-cyan border-kiit-cyan/30',
    };
    return colors[tag as keyof typeof colors] || 'bg-gray-600/20 text-gray-300 border-gray-600/30';
  };

  return (
    <Card 
      className="glass border-white/10 card-hover cursor-pointer group relative overflow-hidden animate-fade-in"
      onClick={() => onViewDetails(faculty)}
    >
      {faculty.isNew && (
        <div className="absolute top-2 right-2 z-10">
          <Badge className="bg-kiit-green animate-pulse">NEW</Badge>
        </div>
      )}
      
      <div className="absolute inset-0 bg-gradient-to-br from-kiit-blue/5 to-kiit-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white group-hover:text-gradient transition-all duration-300">
              {faculty.name}
            </h3>
            <p className="text-sm text-gray-400">{faculty.department}</p>
          </div>
          
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-kiit-orange fill-current" />
            <span className="text-white font-semibold">{faculty.rating}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-2">Subjects & Sections</h4>
          <div className="flex flex-wrap gap-1 mb-2">
            {faculty.subjects.map((subject, index) => (
              <Badge key={index} variant="outline" className="text-xs border-kiit-blue/30 text-kiit-blue">
                {subject}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-1">
            {faculty.sections.map((section, index) => (
              <Badge key={index} variant="secondary" className="text-xs bg-white/10 text-gray-300">
                {section}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {faculty.tags.map((tag, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className={`text-xs ${getTagColor(tag)}`}
            >
              {tag}
            </Badge>
          ))}
        </div>

        {faculty.topComment && (
          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
            <p className="text-sm text-gray-300 italic">"{faculty.topComment}"</p>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center space-x-1 ${isLiked ? 'text-kiit-red' : 'text-gray-400'} hover:text-kiit-red`}
              onClick={handleLike}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              <span>{localLikes}</span>
            </Button>
            
            <div className="flex items-center space-x-1 text-gray-400">
              <MessageCircle className="w-4 h-4" />
              <span>{Math.floor(Math.random() * 50) + 10}</span>
            </div>
          </div>

          {faculty.sentiment && (
            <div className={`flex items-center space-x-1 ${getSentimentColor(faculty.sentiment)}`}>
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs font-medium capitalize">{faculty.sentiment}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FacultyCard;
