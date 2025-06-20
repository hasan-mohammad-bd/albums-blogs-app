
import { useState, useEffect } from 'react';

export const useLikes = () => {
  const [likes, setLikes] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const savedLikes = localStorage.getItem('postLikes');
    if (savedLikes) {
      setLikes(JSON.parse(savedLikes));
    }
  }, []);

  const toggleLike = (postId: number) => {
    const newLikes = {
      ...likes,
      [postId]: !likes[postId]
    };
    setLikes(newLikes);
    localStorage.setItem('postLikes', JSON.stringify(newLikes));
  };

  return { likes, toggleLike };
};
