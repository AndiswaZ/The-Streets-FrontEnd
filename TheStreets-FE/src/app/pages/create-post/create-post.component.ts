import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PostsService } from '../../core/posts.service';

@Component({
  standalone: true,
  selector: 'app-create-post',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent {
  private api = inject(PostsService);
  private router = inject(Router);

  message = '';

  submit() {
    const msg = this.message.trim();
    if (!msg) return;

    this.api.createPost({ message: msg }).subscribe({
      next: (post) => {
        this.message = '';
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
        alert('Failed to post');
      },
    });
  }
}
