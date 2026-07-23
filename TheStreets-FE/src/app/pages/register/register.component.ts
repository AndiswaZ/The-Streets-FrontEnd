import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  user = {
    userId: '',
    displayName: '',
    password: '',
  };

  register() {
    this.auth.register(this.user).subscribe({
      next: () => {
        alert('Registration successful 🎉');

        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);

        alert('Registration failed ❌');
      },
    });
  }
}
