
import { useState, useEffect } from 'react';
import { fetchAlbums, fetchUsers } from '../services/api';
import type { AlbumWithUser } from '../types';

export const useAlbums = () => {
  const [albums, setAlbums] = useState<AlbumWithUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAlbums = async () => {
      try {
        setLoading(true);
        const [albumsData, usersData] = await Promise.all([
          fetchAlbums(),
          fetchUsers()
        ]);

        const albumsWithUsers = albumsData.map(album => ({
          ...album,
          user: usersData.find(user => user.id === album.userId)!
        }));

        setAlbums(albumsWithUsers);
      } catch (err) {
        setError('Failed to fetch albums');
        console.error('Error fetching albums:', err);
      } finally {
        setLoading(false);
      }
    };

    loadAlbums();
  }, []);

  return { albums, loading, error };
};
