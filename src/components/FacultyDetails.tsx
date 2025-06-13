
import React, { useState } from 'react';
import { Star, Heart, MessageCircle, ThumbsUp, ThumbsDown, X, Send, TrendingUp, Calendar, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';

interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  timestamp: Date;
  likes: number;
  dislikes: number;
  isLiked?: boolean;
  isDisliked?: boolean;
}

interface FacultyDetailsProps {
  faculty: any;
  onClose: () => void;
}

const FacultyDetails = ({ faculty, onClose }: FacultyDetailsProps) => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      user: 'Rahul Kumar',
      rating: 5,
      comment: 'Excellent professor! Explains Data Structures concepts very clearly. His teaching methodology is outstanding.',
      timestamp: new Date(Date.now() - 86400000),
      likes: 15,
      dislikes: 1
    },
    {
      id: '2',
      user: 'Priya Sharma',
      rating: 4,
      comment: 'Good teacher but quite strict about attendance. Make sure you don\'t miss classes.',
      timestamp: new Date(Date.now() - 172800000),
      likes: 8,
      dislikes: 2
    },
    {
      id: '3',
      user: 'Amit Singh',
      rating: 5,
      comment: 'Best faculty for algorithms! His notes are comprehensive and very helpful for exams.',
      timestamp: new Date(Date.now() - 259200000),
      likes: 12,
      dislikes: 0
    }
  ]);

  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const handleReviewSubmit = () => {
    if (!newReview.trim()) return;

    const review: Review = {
      id: Date.now().toString(),
      user: 'You',
      rating: newRating,
      comment: newReview,
      timestamp: new Date(),
      likes: 0,
      dislikes: 0
    };

    setReviews(prev => [review, ...prev]);
    setNewReview('');
    setNewRating(5);
    setShowReviewForm(false);
  };

  const handleReviewAction = (reviewId: string, action: 'like' | 'dislike') => {
    setReviews(prev => prev.map(review => {
      if (review.id === reviewId) {
        if (action === 'like') {
          return {
            ...review,
            likes: review.isLiked ? review.likes - 1 : review.likes + 1,
            dislikes: review.isDisliked ? review.dislikes - 1 : review.dislikes,
            isLiked: !review.isLiked,
            isDisliked: false
          };
        } else {
          return {
            ...review,
            dislikes: review.isDisliked ? review.dislikes - 1 : review.dislikes + 1,
            likes: review.isLiked ? review.likes - 1 : review.likes,
            isDisliked: !review.isDisliked,
            isLiked: false
          };
        }
      }
      return review;
    }));
  };

  const sentimentData = {
    positive: 75,
    neutral: 20,
    negative: 5
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <Card className="glass-dark border-white/20 h-full flex flex-col">
          <CardHeader className="border-b border-white/10 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-kiit-blue to-kiit-purple flex items-center justify-center text-white text-2xl font-bold">
                  {faculty.name.split(' ').map((n: string) => n[0]).join('')}
                </div>
                <div>
                  <CardTitle className="text-2xl text-gradient">{faculty.name}</CardTitle>
                  <p className="text-gray-400">{faculty.department}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-1">
                      <Star className="w-5 h-5 text-kiit-orange fill-current" />
                      <span className="text-white font-semibold text-lg">{faculty.rating}</span>
                      <span className="text-gray-400">({reviews.length} reviews)</span>
                    </div>
                    <div className="flex items-center space-x-1 text-kiit-green">
                      <Heart className="w-4 h-4" />
                      <span>{faculty.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>
          </CardHeader>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Faculty Info */}
                <Card className="glass border-white/10">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold text-white mb-4">Faculty Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-300 mb-2">Subjects</h4>
                        <div className="flex flex-wrap gap-2">
                          {faculty.subjects.map((subject: string, index: number) => (
                            <Badge key={index} className="bg-kiit-blue/20 text-kiit-blue border-kiit-blue/30">
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-300 mb-2">Sections</h4>
                        <div className="flex flex-wrap gap-2">
                          {faculty.sections.map((section: string, index: number) => (
                            <Badge key={index} variant="outline" className="border-gray-600 text-gray-300">
                              {section}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {faculty.tags.map((tag: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Reviews Section */}
                <Card className="glass border-white/10">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white">Reviews & Comments</CardTitle>
                      <Button
                        onClick={() => setShowReviewForm(!showReviewForm)}
                        className="btn-gradient"
                      >
                        Add Review
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {showReviewForm && (
                      <Card className="glass-dark border-white/10">
                        <CardContent className="p-4 space-y-4">
                          <div>
                            <label className="text-sm font-medium text-gray-300 mb-2 block">
                              Rating
                            </label>
                            <div className="flex space-x-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  onClick={() => setNewRating(star)}
                                  className={`w-6 h-6 ${star <= newRating ? 'text-kiit-orange' : 'text-gray-600'}`}
                                >
                                  <Star className="w-full h-full fill-current" />
                                </button>
                              ))}
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-300 mb-2 block">
                              Comment
                            </label>
                            <Textarea
                              value={newReview}
                              onChange={(e) => setNewReview(e.target.value)}
                              placeholder="Share your experience with this faculty..."
                              className="glass border-white/20 text-white placeholder-gray-400"
                            />
                          </div>
                          <div className="flex space-x-2">
                            <Button onClick={handleReviewSubmit} className="btn-gradient">
                              <Send className="w-4 h-4 mr-2" />
                              Submit Review
                            </Button>
                            <Button
                              variant="ghost"
                              onClick={() => setShowReviewForm(false)}
                              className="text-gray-400"
                            >
                              Cancel
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    <div className="space-y-4">
                      {reviews.map((review) => (
                        <Card key={review.id} className="glass-dark border-white/10">
                          <CardContent className="p-4">
                            <div className="flex items-start space-x-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-kiit-blue to-kiit-purple flex items-center justify-center text-white text-sm font-semibold">
                                {review.user[0]}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className="text-white font-medium">{review.user}</span>
                                  <div className="flex items-center space-x-1">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`w-3 h-3 ${i < review.rating ? 'text-kiit-orange fill-current' : 'text-gray-600'}`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-gray-400 text-xs">
                                    {review.timestamp.toLocaleDateString()}
                                  </span>
                                </div>
                                <p className="text-gray-300 text-sm mb-3">{review.comment}</p>
                                <div className="flex items-center space-x-4">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleReviewAction(review.id, 'like')}
                                    className={`flex items-center space-x-1 ${review.isLiked ? 'text-kiit-blue' : 'text-gray-400'}`}
                                  >
                                    <ThumbsUp className="w-3 h-3" />
                                    <span>{review.likes}</span>
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleReviewAction(review.id, 'dislike')}
                                    className={`flex items-center space-x-1 ${review.isDisliked ? 'text-kiit-red' : 'text-gray-400'}`}
                                  >
                                    <ThumbsDown className="w-3 h-3" />
                                    <span>{review.dislikes}</span>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar Stats */}
              <div className="space-y-6">
                {/* Sentiment Analysis */}
                <Card className="glass border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-kiit-green" />
                      <span>Sentiment Analysis</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-kiit-green">Positive</span>
                        <span className="text-white">{sentimentData.positive}%</span>
                      </div>
                      <Progress value={sentimentData.positive} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-kiit-orange">Neutral</span>
                        <span className="text-white">{sentimentData.neutral}%</span>
                      </div>
                      <Progress value={sentimentData.neutral} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-kiit-red">Negative</span>
                        <span className="text-white">{sentimentData.negative}%</span>
                      </div>
                      <Progress value={sentimentData.negative} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card className="glass border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-kiit-blue" />
                        <span className="text-gray-300">Students Taught</span>
                      </div>
                      <span className="text-white font-semibold">240+</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-kiit-purple" />
                        <span className="text-gray-300">Experience</span>
                      </div>
                      <span className="text-white font-semibold">5 years</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <MessageCircle className="w-4 h-4 text-kiit-green" />
                        <span className="text-gray-300">Response Rate</span>
                      </div>
                      <span className="text-white font-semibold">95%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FacultyDetails;
