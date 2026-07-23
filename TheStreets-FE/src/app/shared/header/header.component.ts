import { Component, inject, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DevUserService, DevUser } from '../../core/dev-user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() hasPosts = false;

  private dev = inject(DevUserService);
  private router = inject(Router);

  user = this.dev.get() ?? {
    id: '',
    name: '',
    role: 'User',
  };

  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  goToProfile() {
    this.menuOpen = false;
    this.router.navigate(['/profile']);
  }

  logout() {
    this.dev.clear();
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    const saved = this.dev.get();
    if (saved) {
      this.user = saved;
    }
  }

  save() {
    this.dev.set(this.user as DevUser);
    this.router.navigateByUrl('/');
  }
}
