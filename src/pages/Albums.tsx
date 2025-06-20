import React, { useState } from "react";
import { useAlbums } from "../hooks/useAlbums";
import { fetchPhotosByAlbum } from "../services/api";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Skeleton } from "../components/ui/skeleton";
import type { Photo } from "../types";

const ALBUMS_PER_PAGE = 10;

const Albums: React.FC = () => {
  const { albums, loading, error } = useAlbums();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAlbum, setSelectedAlbum] = useState<number | null>(null);
  const [albumPhotos, setAlbumPhotos] = useState<Photo[]>([]);
  const [loadingPhotos, setLoadingPhotos] = useState(false);

  const totalPages = Math.ceil(albums.length / ALBUMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ALBUMS_PER_PAGE;
  const currentAlbums = albums.slice(startIndex, startIndex + ALBUMS_PER_PAGE);

  const handleAlbumClick = async (albumId: number) => {
    setSelectedAlbum(albumId);
    setLoadingPhotos(true);
    try {
      const photos = await fetchPhotosByAlbum(albumId);
      setAlbumPhotos(photos.slice(0, 5)); // First 5 photos
    } catch (err) {
      console.error("Error fetching photos:", err);
    } finally {
      setLoadingPhotos(false);
    }
  };

  const closeModal = () => {
    setSelectedAlbum(null);
    setAlbumPhotos([]);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Albums</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))}
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Albums</h1>

      {albums.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No albums found</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentAlbums.map((album) => (
              <Card
                key={album.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleAlbumClick(album.id)}
              >
                <CardHeader>
                  <CardTitle className="text-lg">{album.title}</CardTitle>
                  <p className="text-sm text-gray-600">By {album.user.name}</p>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}

      {/* Photo Dialog */}
      <Dialog open={selectedAlbum !== null} onOpenChange={() => closeModal()}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Album Photos</DialogTitle>
          </DialogHeader>
          {loadingPhotos ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="space-y-2">
                  <Skeleton className="w-full h-32 rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {albumPhotos.map((photo) => (
                <div key={photo.id} className="space-y-2">
                  <img
                    src={photo.thumbnailUrl || "/placeholder.png"}
                    alt={photo.title}
                    
                    className="w-full h-32 object-cover rounded-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.png"; // fallback placeholder
                    }}
                  />

                  <h4 className="text-sm font-medium text-gray-900">
                    {photo.title}
                  </h4>
                  <a
                    href={photo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    View full size
                  </a>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Albums;
