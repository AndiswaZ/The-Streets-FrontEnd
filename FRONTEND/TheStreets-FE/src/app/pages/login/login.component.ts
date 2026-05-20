import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DevUserService } from '../../core/dev-user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private dev = inject(DevUserService);
  private router = inject(Router);

  user = {
    id: '',
    name: '',
    role: 'User' as const,
  };

  login() {
    this.dev.set(this.user);
    this.router.navigate(['/']);
  }
}
