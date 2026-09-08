import { Component } from '@angular/core';
import { BreadcrumbItem, BreadcrumbComponent } from '../shared/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-grids',
  standalone: true,
  imports: [BreadcrumbComponent],
  templateUrl: './grids.component.html',
  styleUrl: './grids.component.css',
})
export class GridsComponent {
  breadcrumb: BreadcrumbItem[] = [
    {
      text: 'Grids',
      isLink: false,
      routerLink: '',
      iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M7.61917 2.5H4.0475C3.19284 2.5 2.5 3.19284 2.5 4.0475V7.61917C2.5 8.47383 3.19284 9.16667 4.0475 9.16667H7.61917C8.47383 9.16667 9.16667 8.47383 9.16667 7.61917V4.0475C9.16667 3.19284 8.47383 2.5 7.61917 2.5Z" fill="currentColor"/>
                    <path d="M15.9525 2.5H12.3808C11.5262 2.5 10.8333 3.19284 10.8333 4.0475V7.61917C10.8333 8.47383 11.5262 9.16667 12.3808 9.16667H15.9525C16.8072 9.16667 17.5 8.47383 17.5 7.61917V4.0475C17.5 3.19284 16.8072 2.5 15.9525 2.5Z" fill="currentColor"/>
                    <path d="M7.61917 10.8333H4.0475C3.19284 10.8333 2.5 11.5262 2.5 12.3808V15.9525C2.5 16.8072 3.19284 17.5 4.0475 17.5H7.61917C8.47383 17.5 9.16667 16.8072 9.16667 15.9525V12.3808C9.16667 11.5262 8.47383 10.8333 7.61917 10.8333Z" fill="currentColor"/>
                    <path d="M15.9525 10.8333H12.3808C11.5262 10.8333 10.8333 11.5262 10.8333 12.3808V15.9525C10.8333 16.8072 11.5262 17.5 12.3808 17.5H15.9525C16.8072 17.5 17.5 16.8072 17.5 15.9525V12.3808C17.5 11.5262 16.8072 10.8333 15.9525 10.8333Z" fill="currentColor"/>
                  </svg>`,
    },
  ];
}
