
import { useState, useEffect } from 'react';
import { fetchPosts, fetchUsers } from '../services/api';
import type { PostWithUser } from '../types';


export const usePosts = () => {
  const [posts, setPosts] = useState<PostWithUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const [postsData, usersData] = await Promise.all([
          fetchPosts(),
          fetchUsers()
        ]);

        const postsWithUsers = postsData.map(post => ({
          ...post,
          user: usersData.find(user => user.id === post.userId)!
        }));

        setPosts(postsWithUsers);
      } catch (err) {
        setError('Failed to fetch posts');
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  return { posts, loading, error };
};
