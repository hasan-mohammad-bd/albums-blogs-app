
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePosts } from '../hooks/usePosts';
import { fetchComments } from '../services/api';

import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';
import type { Comment } from '../types';


const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { posts, loading, error } = usePosts();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);

  const post = posts.find(p => p.id === Number(id));

  useEffect(() => {
    const loadComments = async () => {
      if (post) {
        setLoadingComments(true);
        try {
          const commentsData = await fetchComments(post.id);
          setComments(commentsData);
        } catch (err) {
          console.error('Error fetching comments:', err);
        } finally {
          setLoadingComments(false);
        }
      }
    };

    loadComments();
  }, [post]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-6"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/blogs">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blogs
          </Button>
        </Link>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            {error || 'Blog post not found'}
          </h1>
          <p className="text-gray-600">
            The blog post you're looking for doesn't exist or couldn't be loaded.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/blogs">
        <Button variant="outline" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blogs
        </Button>
      </Link>

      <article className="space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          <p className="text-gray-600">
            By {post.user.name}
          </p>
        </header>

        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed text-lg">
            {post.body}
          </p>
        </div>

        <div className="border-t pt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Comments ({comments.length})
          </h2>
          
          {loadingComments ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="animate-pulse">
                      <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
                      <div className="h-3 bg-gray-300 rounded w-1/3 mb-3"></div>
                      <div className="space-y-2">
                        <div className="h-3 bg-gray-300 rounded"></div>
                        <div className="h-3 bg-gray-300 rounded w-5/6"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => (
                <Card key={comment.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-medium text-gray-900">
                        {comment.name}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {comment.email}
                      </span>
                    </div>
                    <p className="text-gray-700">
                      {comment.body}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;
