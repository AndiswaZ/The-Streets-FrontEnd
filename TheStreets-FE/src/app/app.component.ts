import { Component, OnInit, Inject, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FormsModule } from '@angular/forms';
import { DevUserService } from './core/dev-user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet, HeaderComponent, FormsModule],
  template: `
    <app-header *ngIf="showHeader" [hasPosts]="hasPosts"> </app-header>

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
  private platformId = inject(PLATFORM_ID);
  hasPosts = false;
  showHeader = true;
  ngOnInit() {
    //LOGIN CHECK
    const user = this.dev.get();

    if (!user) {
      this.router.navigate(['/login']);
    }

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentUrl = this.router.url;

        this.showHeader =
          !event.urlAfterRedirects.startsWith('/login') &&
          !event.urlAfterRedirects.startsWith('/register');
      }
    });

    if (isPlatformBrowser(this.platformId)) {
      setInterval(() => {
        this.hasPosts = document.body.getAttribute('data-has-posts') === '1';
      }, 200);
    }
  }
}
