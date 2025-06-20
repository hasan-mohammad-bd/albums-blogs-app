
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { usePosts } from '../hooks/usePosts';
import { useLikes } from '../hooks/useLikes';



import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Skeleton } from '../components/ui/skeleton';
import { Button } from '../components/ui/button';

const POSTS_PER_PAGE = 5;

const Blogs: React.FC = () => {
  const { posts, loading, error } = usePosts();
  const { likes, toggleLike } = useLikes();
  const [selectedAuthor, setSelectedAuthor] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const authors = useMemo(() => {
    const uniqueAuthors = Array.from(new Set(posts.map(post => post.user.name)));
    return uniqueAuthors.sort();
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (selectedAuthor === 'all') return posts;
    return posts.filter(post => post.user.name === selectedAuthor);
  }, [posts, selectedAuthor]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedAuthor]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Blogs</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <Skeleton className="h-10 w-full mb-4" />
          </div>
          <div className="lg:w-3/4 space-y-6">
            {[...Array(5)].map((_, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Blogs</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filter */}
        <div className="lg:w-1/4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Filter by Author</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedAuthor} onValueChange={setSelectedAuthor}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Authors</SelectItem>
                  {authors.map((author) => (
                    <SelectItem key={author} value={author}>
                      {author}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        {/* Posts List */}
        <div className="lg:w-3/4">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No posts found</p>
            </div>
          ) : (
            <>
              <div className="space-y-6 mb-8">
                {currentPosts.map((post) => (
                  <Card key={post.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <Link to={`/blogs/${post.id}`}>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2 cursor-pointer hover:text-blue-600">
                              {post.title}
                            </h3>
                          </Link>
                          <p className="text-sm text-gray-600 mb-3">
                            By {post.user.name}
                          </p>
                          <p className="text-gray-700">
                            {post.body.length > 100 
                              ? `${post.body.substring(0, 100)}...` 
                              : post.body
                            }
                          </p>
                        </div>
                        <button
                          onClick={() => toggleLike(post.id)}
                          className={`ml-4 flex items-center space-x-1 px-3 py-1 rounded-full text-sm ${
                            likes[post.id]
                              ? 'bg-red-100 text-red-600'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          <span>{likes[post.id] ? '❤️' : '🤍'}</span>
                          <span>{likes[post.id] ? 'Liked' : 'Like'}</span>
                        </button>
                      </div>
                      <Link to={`/blogs/${post.id}`}>
                        <Button variant="outline" size="sm">
                          Read More
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <span className="text-sm text-gray-700">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blogs;