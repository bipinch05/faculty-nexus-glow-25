
import React from 'react';
import { Star, Users, Book } from 'lucide-react';
import { Badge } from './ui/badge';

interface FacultyMentionCardProps {
  faculty: {
    id: string;
    name: string;
    subjects: string[];
    sections: string[];
    rating: number;
    likes: number;
    tags: string[];
    department: string;
  };
}

const FacultyMentionCard = ({ faculty }: FacultyMentionCardProps) => {
  const getTagColor = (tag: string) => {
    const colors = {
      'Strict': 'bg-red-500/20 text-red-400 border-red-500/30',
      'Friendly': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Helpful': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Best for Notes': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'Experienced': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    };
    return colors[tag as keyof typeof colors] || 'bg-gray-600/20 text-gray-300 border-gray-600/30';
  };

  return (
    <div className="bg-kiit-darker/80 border border-white/20 rounded-lg p-3 my-2 backdrop-blur-md">
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-kiit-blue to-kiit-purple rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
          {faculty.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-white font-semibold text-sm truncate">{faculty.name}</h4>
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
              <span className="text-white text-xs font-semibold">{faculty.rating}</span>
            </div>
          </div>
          <p className="text-gray-400 text-xs mb-2">{faculty.department}</p>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Book className="w-3 h-3 text-kiit-blue" />
              <div className="flex flex-wrap gap-1">
                {faculty.subjects.slice(0, 2).map((subject, index) => (
                  <Badge key={index} className="bg-kiit-blue/20 text-kiit-blue text-xs px-1 py-0 h-4">
                    {subject}
                  </Badge>
                ))}
                {faculty.subjects.length > 2 && (
                  <span className="text-gray-400 text-xs">+{faculty.subjects.length - 2}</span>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Users className="w-3 h-3 text-gray-400" />
              <div className="flex flex-wrap gap-1">
                {faculty.sections.slice(0, 3).map((section, index) => (
                  <Badge key={index} variant="outline" className="border-white/30 text-gray-300 text-xs px-1 py-0 h-4">
                    {section}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1">
              {faculty.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="outline" className={`${getTagColor(tag)} text-xs px-1 py-0 h-4`}>
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyMentionCard;
