import { Component, OnInit, Inject, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FormsModule } from '@angular/forms';
import { DevUserService } from './core/dev-user.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FormsModule],
  template: `
    <app-header [hasPosts]="hasPosts"></app-header>
    <main class="container">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [
    `
      .container {
        max-width: 820px;
        margin: 24px auto;
        padding: 0 12px;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
private dev = inject(DevUserService);
private router = inject(Router);
  hasPosts = false;

  ngOnInit() {
  // LOGIN CHECK
  const user = this.dev.get();
  if (!user) {
    this.router.navigate(['/login']);
  }

  setInterval(() => {
    this.hasPosts =
      document.body.getAttribute('data-has-posts') === '1';
  }, 200);
}

}
