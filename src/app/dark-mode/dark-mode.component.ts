import { Component } from '@angular/core';
import { BreadcrumbItem, BreadcrumbComponent } from '../shared/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-dark-mode',
  standalone: true,
  imports: [BreadcrumbComponent],
  templateUrl: './dark-mode.component.html',
  styleUrl: './dark-mode.component.css',
})
export class DarkModeComponent {
  breadcrumb: BreadcrumbItem[] = [
    {
      text: 'Dark mode demo',
      isLink: false,
      routerLink: '',
      iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M16.5206 14.3435C15.5954 14.3215 14.6835 14.11 13.837 13.721C12.9905 13.3321 12.226 12.7733 11.5874 12.0768C10.9487 11.3803 10.4484 10.5596 10.115 9.66176C9.78165 8.76392 9.62176 7.80652 9.64452 6.84434C9.67063 5.89087 9.87786 4.95219 10.2543 4.08236C10.6307 3.21253 11.1688 2.42875 11.8377 1.77615C11.494 1.71863 11.1471 1.68384 10.7992 1.67199C9.74292 1.63255 8.68957 1.81087 7.69984 2.19668C6.71011 2.58249 5.80357 3.16817 5.03244 3.91998C4.26131 4.67178 3.64084 5.57485 3.20677 6.57715C2.7727 7.57945 2.53362 8.66118 2.5033 9.76C2.47298 10.8588 2.65201 11.953 3.03009 12.9796C3.40817 14.0061 3.97782 14.9447 4.70622 15.7413C5.43462 16.5378 6.30738 17.1766 7.2742 17.6208C8.24103 18.0651 9.28281 18.3059 10.3395 18.3295C11.7694 18.3739 13.185 18.0239 14.4427 17.315C15.7003 16.6062 16.7552 15.5637 17.5 14.2935C17.175 14.3338 16.8478 14.3505 16.5206 14.3435Z" fill="currentColor"/>
                </svg>`,
    },
  ];

  toggleDarkMode(isDark: boolean) {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }
}
