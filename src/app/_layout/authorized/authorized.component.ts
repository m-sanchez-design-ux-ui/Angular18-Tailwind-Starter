import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ElementRef,
  HostListener,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { Globals, ScreenSize } from '../../globals';
import { ConfigService } from '../../shared/config.service';
import { LoadingService } from '../../shared/loading/loading.service';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { FeatherModule } from 'angular-feather';
import { initFlowbite, Drawer } from 'flowbite';
import { SignInService } from '../../auth/services/sign-in.service';
import { Subscription, filter } from 'rxjs';
import { NotificationsComponent } from '../../shared/notifications/notifications.component';
import { NotificationsService } from '../../shared/notifications/notifications.service';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-authorized',
  standalone: true,
  imports: [
    RouterOutlet,
    FeatherModule,
    NotificationsComponent,
    CommonModule,
    RouterModule, // ¡Esto es necesario para que routerLink funcione!
  ],
  templateUrl: './authorized.component.html',
  styleUrl: './authorized.component.css',
})
export class AuthorizedComponent implements OnInit, OnDestroy, AfterViewInit {
  //Notifications length start

  //Case Notifications = 0

  //notifications: any[] = []; // o lo que uses para tus notificaciones

  //Case Notifications > 0
  notifications = [
    { mensaje: 'Se ha generado la notificación número 01. La tarea fue completada' },
    { mensaje: 'Se ha generado la notificación número 02. La tarea fue completada' },
    { mensaje: 'Se ha generado la notificación número 03. La tarea fue completada' },
    { mensaje: 'Se ha generado la notificación número 04. La tarea fue completada' },
    { mensaje: 'Se ha generado la notificación número 05. La tarea fue completada' },
    { mensaje: 'Se ha generado la notificación número 06. La tarea fue completada' },
    { mensaje: 'Se ha generado la notificación número 07. La tarea fue completada' },
    { mensaje: 'Se ha generado la notificación número 08. La tarea fue completada' },
    { mensaje: 'Se ha generado la notificación número 09. La tarea fue completada' },
    { mensaje: 'Se ha generado la notificación número 10. La tarea fue completada' },
    { mensaje: 'Se ha generado la notificación número 11. La tarea fue completada' },
    { mensaje: 'Se ha generado la notificación número 12. La tarea fue completada' },
  ];

  //Function tha delete each notification
  deleteNotification(index: number) {
    this.notifications.splice(index, 1);
  }

  //Notifications length end

  //Styles for Mobile Drawer with tailwind start
  ngAfterViewInit(): void {
    const observer = new MutationObserver(() => {
      const backdrop = document.querySelector('[drawer-backdrop]');
      if (backdrop) {
        backdrop.classList.remove('bg-gray-900/50', 'dark:bg-gray-900/80');
        backdrop.classList.add('bg-black/50', 'backdrop-blur-md'); // Change here the background styles with tailwind classes
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }
  //Styles for Mobile Drawer with tailwind end

  //Clients Selector Start
  selectedOption: SafeHtml | null = null;
  dropdownVisible = false;

  @ViewChild('selectContainer') selectContainer!: ElementRef;

  defaultOption: string = `
    <div class="w-full relative flex items-center gap-2">
      <div class="rounded size-8 bg-gray-200 flex justify-center items-center dark:bg-gray-600">
        <img src="/images/icon-btns/picture.svg" alt="picture icon" class="size-6"/>
      </div>
      <span class="text-xs font-semibold text-gray-500 dark:text-gray-400">Seleccioná una opción</span>
      <img src="/images/icon-btns/chevron-sort-outline.png" alt="chevron icon" class="size-4 absolute right-0"/>
    </div>
  `;

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  selectOption(optionName: string, imageUrl: string) {
    const html = `
    <div class="w-full relative flex items-center gap-2">
      <img src="${imageUrl}" class="rounded size-8 overflow-hidden object-cover"/>
      <span class="text-xs font-semibold text-gray-700 dark:text-white">${optionName}</span>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="fill-none size-4 absolute right-0">
        <path d="M10.6673 6.00004L8.00065 3.33337L5.33398 6.00004M5.33398 10L8.00065 12.6667L10.6673 10" stroke-linecap="round" stroke-linejoin="round" class="stroke-gray-800 dark:stroke-gray-400 group-hover:stroke-primary dark:group-hover:stroke-primary stroke-[1.33333]"/>
      </svg>
    </div>
  `;
    this.selectedOption = this.sanitizer.bypassSecurityTrustHtml(html);
    this.dropdownVisible = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (this.selectContainer && !this.selectContainer.nativeElement.contains(event.target)) {
      this.dropdownVisible = false;
    }
  }
  //Clients Selector End
  public roles!: string[] | string;
  public userName!: string;
  public notifLength!: number;
  data!: any;
  private readonly subscriptions: Subscription[] = [];
  buttons: any = [];
  firstName: string = '';
  lastName: string = '';
  includesAmdin: boolean = false;

  constructor(
    private readonly loadingService: LoadingService,
    public configService: ConfigService,
    public globals: Globals,
    private readonly signInService: SignInService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
    private readonly notification: NotificationsService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    initFlowbite();

    // BUG FIX: on mobile, the sidebar drawer's backdrop (created by
    // Flowbite's own JS) only tracked outside-clicks from the moment it
    // was opened. Navigating via a link *inside* the drawer doesn't
    // reload the page (Angular SPA), so the backdrop was left in a
    // stale state after the route changed, and the drawer stayed open
    // with no way to close it by tapping outside anymore. Explicitly
    // hiding the drawer on every navigation keeps it in sync. Flowbite's
    // Drawer.hide() only affects the mobile (off-canvas) state — the
    // `lg:translate-x-0` utility class keeps it visible on desktop
    // regardless, so this is a no-op there.
    this.subscriptions.push(
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => {
          const sidebarEl = document.getElementById('sidebar-multi-level-sidebar');
          if (sidebarEl) {
            new Drawer(sidebarEl).hide();
          }
        })
    );

    this.roles = this.signInService.getRoles();

    if (typeof this.roles !== 'string') {
      this.roles.forEach((role: string) => {
        if (role.includes('admin')) {
          this.includesAmdin = true;
        }
      });
    }

    //this.getApplicationsData();

    //this.cdr.detectChanges();
  }

  getApplicationsData() {
    // const decodeToken = this.signInService.getDecodedToken();
    // this.data = JSON.parse(decodeToken.applications);
  }

  public onBtnMenuClick() {
    this.globals.collapseMenu(!this.globals.menuCollapsed);
  }

  public onModuleClick() {
    if (this.globals.screenSize === ScreenSize.Small) {
      this.globals.collapseMenu();
    }
  }

  public onLogout() {
    this.subscriptions.push(
      this.signInService.logout().subscribe(() => {
        localStorage.clear();
        this.router.navigateByUrl('/auth/signin');
      })
    );
  }

  public onGoToProfileSummary() {
    this.router.navigateByUrl('/profile');
  }

  public showLoading($event: any) {
    if ($event === true) {
      this.loadingService.show();
    } else {
      this.loadingService.hide();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }

  isDarkMode = false;

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    const html = document.documentElement;

    if (this.isDarkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }
}
