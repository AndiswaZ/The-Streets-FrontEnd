import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PostsService, PostResponse, Comment } from '../../core/posts.service';
import { TimeAgoPipe } from '../../shared/time-ago.pipe';
import { FormsModule } from '@angular/forms';
import { DevUserService } from '../../core/dev-user.service';
import { ConfirmModalComponent } from '../../shared/confirm-modal/confirm-modal.component';


@Component({
  standalone: true,
  selector: 'app-post-detail',
  imports: [CommonModule, RouterLink, TimeAgoPipe, FormsModule, ConfirmModalComponent],
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {
  liked = false;
  private route = inject(ActivatedRoute);
  private api = inject(PostsService);
  private dev = inject(DevUserService);
  private router = inject(Router);

  id!: number;
  post?: PostResponse;
  comments: Comment[] = [];
  newComment = '';
  me = this.dev.get();

showDeleteModal = false;

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.load();
  }

  load() {
    this.api.getPost(this.id).subscribe((p) => (this.post = p));
    this.api.listComments(this.id).subscribe((cs) => (this.comments = cs));
  }

  canDeletePost() {
    return (
      this.me?.id === this.post?.createdByUserId ||
      this.me?.role === 'SuperAdmin'
    );
  }

  canDeleteComment(c: Comment) {
    return this.me?.id === c.userId || this.me?.role === 'SuperAdmin';
  }

 toggleLike() {
  if (this.liked) {
    this.api.unlike(this.id).subscribe(({ likes }) => {
      if (this.post) {
        this.post.likeCount = likes;
        this.liked = false;
      }
    });
  } else {
    this.api.like(this.id).subscribe(({ likes }) => {
      if (this.post) {
        this.post.likeCount = likes;
        this.liked = true;
      }
    });
  }
}


 addComment() {
  const msg = this.newComment.trim();
  if (!msg) return;

  this.api.addComment(this.id, msg).subscribe({
    next: (comment) => {
      this.comments = [...this.comments, comment]; 
      this.newComment = '';

      if (this.post) {
        this.post.commentCount++; 
      }
    },
    error: (err) => {
      console.error("Comment failed:", err);
      alert("Comment failed ❌");
    }
  });
}


  deleteComment(c: Comment) {
    if (!this.canDeleteComment(c)) return;
    if (!confirm('Delete this comment?')) return;
    this.api.deleteComment(this.id, c.id).subscribe((_) => this.load());
  }

  deletePost() {
  if (!this.post) return;

  this.showDeleteModal = true;
}

confirmDelete() {
  if (!this.post) return;

  this.api.deletePost(this.post.id).subscribe(() => {
    this.router.navigateByUrl('/');
  });

  this.showDeleteModal = false;
}

cancelDelete() {
  this.showDeleteModal = false;
}

}
