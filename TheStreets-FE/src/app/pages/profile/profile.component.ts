import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevUserService } from '../../core/dev-user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

    darkMode = false;

  private dev = inject(DevUserService);

  user = this.dev.get();
ngOnInit() {
  this.darkMode =
    localStorage.getItem('dark-mode') === 'true';

  document.body.classList.toggle(
    'dark-theme',
    this.darkMode
  );
}
toggleDarkMode() {

  this.darkMode = !this.darkMode;

  localStorage.setItem(
    'dark-mode',
    String(this.darkMode)
  );

  document.body.classList.toggle(
    'dark-theme',
    this.darkMode
  );
}
setTheme(theme: string) {

  localStorage.setItem(
    'theme',
    theme
  );

  document.body.className =
    document.body.className
      .replace(/theme-\w+/g, '');

  document.body.classList.add(
    `theme-${theme}`
  );
}
}