
import axios from 'axios';
import type { User, Album, Photo, Post, Comment } from '../types';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const fetchUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>('/users');
  return response.data;
};

export const fetchUser = async (id: number): Promise<User> => {
  const response = await api.get<User>(`/users/${id}`);
  return response.data;
};

export const fetchAlbums = async (): Promise<Album[]> => {
  const response = await api.get<Album[]>('/albums');
  return response.data;
};

export const fetchPhotos = async (): Promise<Photo[]> => {
  const response = await api.get<Photo[]>('/photos');
  return response.data;
};

export const fetchPhotosByAlbum = async (albumId: number): Promise<Photo[]> => {
  const response = await api.get<Photo[]>(`/photos?albumId=${albumId}`);
  return response.data;
};

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await api.get<Post[]>('/posts');
  return response.data;
};

export const fetchComments = async (postId: number): Promise<Comment[]> => {
  const response = await api.get<Comment[]>(`/comments?postId=${postId}`);
  return response.data;
};
