
import React, { useState } from 'react';
import { X, Star, ThumbsUp, ThumbsDown, MessageCircle, Calendar, Book, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface FacultyDetailsProps {
  faculty: any;
  onClose: () => void;
}

const FacultyDetails = ({ faculty, onClose }: FacultyDetailsProps) => {
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [reviews, setReviews] = useState([
    {
      id: '1',
      author: 'Rahul Kumar',
      rating: 5,
      comment: 'Excellent professor! Explains Data Structures concepts very clearly. His teaching methodology is outstanding.',
      date: '12/06/2025',
      likes: 15,
      dislikes: 1,
      avatar: 'R'
    },
    {
      id: '2',
      author: 'Priya Sharma',
      rating: 4,
      comment: 'Good teacher but quite strict about attendance. Make sure you don\'t miss classes.',
      date: '11/06/2025',
      likes: 8,
      dislikes: 2,
      avatar: 'P'
    },
    {
      id: '3',
      author: 'Amit Singh',
      rating: 5,
      comment: 'Amazing explanations and very helpful during doubt sessions. Highly recommend!',
      date: '10/06/2025',
      likes: 12,
      dislikes: 0,
      avatar: 'A'
    }
  ]);

  const handleSubmitReview = () => {
    if (newReview.trim()) {
      const review = {
        id: Date.now().toString(),
        author: 'You',
        rating: newRating,
        comment: newReview,
        date: new Date().toLocaleDateString(),
        likes: 0,
        dislikes: 0,
        avatar: 'Y'
      };
      setReviews([review, ...reviews]);
      setNewReview('');
      setNewRating(5);
    }
  };

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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-kiit-darker border border-white/20 rounded-2xl w-full max-w-4xl h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-white/10 bg-gradient-to-r from-kiit-blue/10 to-kiit-purple/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-kiit-blue to-kiit-purple rounded-full flex items-center justify-center text-white text-xl font-bold">
                {faculty.name.split(' ').map((n: string) => n[0]).join('')}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gradient">{faculty.name}</h2>
                <p className="text-gray-300">{faculty.department}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-white font-semibold">{faculty.rating}</span>
                    <span className="text-gray-400">({reviews.length} reviews)</span>
                  </div>
                  <div className="flex items-center space-x-1 text-green-400">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{faculty.likes}</span>
                  </div>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto custom-scrollbar">
            <div className="p-6 space-y-6">
              {/* Faculty Information */}
              <Card className="glass border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Book className="w-5 h-5 text-kiit-blue" />
                    <span>Faculty Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-2 flex items-center space-x-2">
                        <Book className="w-4 h-4" />
                        <span>Subjects</span>
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {faculty.subjects.map((subject: string, index: number) => (
                          <Badge key={index} className="bg-kiit-blue/20 text-kiit-blue border-kiit-blue/30">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-2 flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span>Sections</span>
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {faculty.sections.map((section: string, index: number) => (
                          <Badge key={index} variant="outline" className="border-white/30 text-gray-300">
                            {section}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {faculty.tags.map((tag: string, index: number) => (
                        <Badge key={index} variant="outline" className={getTagColor(tag)}>
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Add Review */}
              <Card className="glass border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Add Your Review</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-300">Rating:</span>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 cursor-pointer ${
                            star <= newRating ? 'text-yellow-400 fill-current' : 'text-gray-600'
                          }`}
                          onClick={() => setNewRating(star)}
                        />
                      ))}
                    </div>
                  </div>
                  <Textarea
                    placeholder="Share your experience with this faculty..."
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    className="glass border-white/20 text-white placeholder-gray-400"
                  />
                  <Button onClick={handleSubmitReview} className="btn-gradient">
                    Submit Review
                  </Button>
                </CardContent>
              </Card>

              {/* Reviews */}
              <Card className="glass border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <MessageCircle className="w-5 h-5 text-kiit-purple" />
                    <span>Reviews & Comments</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-kiit-blue rounded-full flex items-center justify-center text-white font-semibold">
                            {review.avatar}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <h4 className="text-white font-semibold">{review.author}</h4>
                                <div className="flex space-x-1">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                      key={star}
                                      className={`w-4 h-4 ${
                                        star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <span className="text-gray-400 text-sm flex items-center space-x-1">
                                <Calendar className="w-3 h-3" />
                                <span>{review.date}</span>
                              </span>
                            </div>
                            <p className="text-gray-300 mb-3">{review.comment}</p>
                            <div className="flex items-center space-x-4">
                              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-green-400">
                                <ThumbsUp className="w-4 h-4 mr-1" />
                                {review.likes}
                              </Button>
                              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400">
                                <ThumbsDown className="w-4 h-4 mr-1" />
                                {review.dislikes}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDetails;
