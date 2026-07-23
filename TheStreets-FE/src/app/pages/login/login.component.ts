import { Component, inject } from '@angular/core';
import { Router , RouterModule } from '@angular/router';
import { DevUserService } from '../../core/dev-user.service';
import { AuthService } from '../../core/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private dev = inject(DevUserService);
  private router = inject(Router);
  private auth = inject(AuthService);

  user = {
    id: '',
    password: '',
  };

  login() {

  this.auth.login({
    userId: this.user.id,
    password: this.user.password
  })
  .subscribe({
    next: (result: any) => {

      this.dev.set({
        id: result.userId,
        name: result.displayName,
        role: result.role
      });

      this.router.navigate(['/']);
    },

    error: () => {
      alert('Invalid credentials ❌');
    }
  });
}
}
