import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from 'firebase/auth';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './navbar.component.html',
  styleUrls: [ './navbar.component.scss' ]
})
export class NavbarComponent implements OnInit {
  navBackground: any;
  loggedIn = false;
  @HostListener('document:scroll') scrollover () {

    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      this.navBackground = {
        'background-color': '#0e0e0ede'
      }
    } else {
      this.navBackground = {}
    }
  }


  constructor (private userService: UserService, private router: Router) { }

  ngOnInit (): void {
    this.userService.authState.subscribe((user: User | null) => {
      this.loggedIn = !!user;
    });
  }

  onClick () {
    this.userService.logout()
      .then(() => {
        this.router.navigate([ '/login' ]);
      })
      .catch(error => console.log(error));
  }
}
