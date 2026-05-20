import { Routes } from '@angular/router';
import { FeedComponent } from './pages/feed/feed.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: FeedComponent },
  { path: 'create', component: CreatePostComponent },
  { path: 'post/:id', component: PostDetailComponent },
  { path: '**', redirectTo: '' },
];
