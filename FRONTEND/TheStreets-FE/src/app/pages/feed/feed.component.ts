import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PostsService, PostResponse } from '../../core/posts.service';
import { TimeAgoPipe } from '../../shared/time-ago.pipe';
import { DevUserService } from '../../core/dev-user.service';

type UI_Post = PostResponse & {
  _liked?: boolean; // animation
  liked?: boolean; // REAL state ✅
};

@Component({
  standalone: true,
  selector: 'app-feed',
  imports: [CommonModule, RouterLink, TimeAgoPipe],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  private api = inject(PostsService);
  private dev = inject(DevUserService);

  loading = false;
  posts: UI_Post[] = [];

  me = this.dev.get();

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;

    this.api.listPosts().subscribe({
      next: (res) => {
        this.posts = res;
        this.loading = false;

        // ✅ tell app whether posts exist
        document.body.setAttribute(
          'data-has-posts',
          res.length > 0 ? '1' : '0',
        );
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  canEdit(p: PostResponse) {
    return this.me?.id === p.createdByUserId;
  }

  canDelete(p: PostResponse) {
    return this.me?.id === p.createdByUserId || this.me?.role === 'SuperAdmin';
  }

  toggleLike(p: UI_Post) {
    if (p.liked) {
      // 💔 UNLIKE
      this.api.unlike(p.id).subscribe(({ likes }) => {
        p.likeCount = likes;
        p.liked = false;

        // animation
        p._liked = true;
        setTimeout(() => (p._liked = false), 300);
      });
    } else {
      // ❤️ LIKE
      this.api.like(p.id).subscribe(({ likes }) => {
        p.likeCount = likes;
        p.liked = true;

        // animation
        p._liked = true;
        setTimeout(() => (p._liked = false), 300);
      });
    }
  }

  delete(p: PostResponse) {
    if (!this.canDelete(p)) return;
    if (!confirm('Delete this post?')) return;
    this.api.deletePost(p.id).subscribe(() => this.load());
  }
}
