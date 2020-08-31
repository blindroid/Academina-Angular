import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';
import { SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    private toggleButton: any;
    private sidebarVisible: boolean;
    @Input() emailUser: string;
    public localId: string;

    constructor(public location: Location, private element: ElementRef, private auth: AuthService, private router: Router) {
        this.sidebarVisible = false;
    }

    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];

        this.localId = localStorage.getItem('localId');
        this.emailUser = localStorage.getItem('email');
    }
 

    salir() {
        this.auth.logout();
        this.emailUser = null;
        this.router.navigateByUrl('/home');
    }

    ngOnChanges(changes: SimpleChanges) {
        this.emailUser = localStorage.getItem('email');
      }
      
    
}
