import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface PostResponse {
  id: number;
  message: string;
  createdByUserId: string;
  createdByDisplayName: string;
  createdAt: string; // ISO
  updatedAt?: string | null; // ISO
  likeCount: number;
  commentCount: number;
}

export interface PostCreateRequest {
  message: string;
}
export interface PostUpdateRequest {
  message: string;
}

export interface Comment {
  id: number;
  postId: number;
  userId: string;
  userDisplayName: string;
  message: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class PostsService {
  private base = environment.apiBase + '/thestreets';

  constructor(private http: HttpClient) {}

  greeting() {
    return this.http.get(this.base, { responseType: 'text' });
  }

  listPosts() {
    return this.http.get<PostResponse[]>(`${this.base}/posts`);
  }

  getPost(id: number) {
    return this.http.get<PostResponse>(`${this.base}/${id}`);
  }

  createPost(body: PostCreateRequest) {
    return this.http.post<PostResponse>(this.base, body);
  }

  updatePost(id: number, body: PostUpdateRequest) {
    return this.http.put<PostResponse>(`${this.base}/${id}`, body);
  }

  deletePost(id: number) {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

  like(id: number) {
    return this.http.post<{ postId: number; likes: number }>(
      `${this.base}/${id}/like`,
      {},
    );
  }

  unlike(id: number) {
    return this.http.delete<{ postId: number; likes: number }>(
      `${this.base}/${id}/like`,
    );
  }

  likeCount(id: number) {
    return this.http.get<{ postId: number; likes: number }>(
      `${this.base}/${id}/likes/count`,
    );
  }

  listComments(postId: number) {
    return this.http.get<Comment[]>(`${this.base}/${postId}/comments`);
  }

  addComment(postId: number, message: string) {
    return this.http.post<Comment>(`${this.base}/${postId}/comments`, {
      message,
    });
  }

  deleteComment(postId: number, commentId: number) {
    return this.http.delete<void>(
      `${this.base}/${postId}/comments/${commentId}`,
    );
  }
}
``;
