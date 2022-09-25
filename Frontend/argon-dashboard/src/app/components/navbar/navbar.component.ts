import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, IUser } from '../../layouts/auth-layout/service/auth.service';
import { UserService } from '../../layouts/admin-layout/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  currentUser: Partial<IUser> = {}
  constructor(location: Location,
    private element: ElementRef,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    ) {
    this.location = location;
  }

  ngOnInit() {
    this.userService.getProfile().subscribe(response => {
      console.log(`response : `, response);
      this.currentUser = response?.data;
      this.userService.currentUser = response?.data;
    }, (error) => {
      console.log("error: ", error);
    });
    this.listTitles = ROUTES.filter(listTitle => listTitle);

    console.log(`this.currentUser : `, this.currentUser)
  }
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }

  logout() {
    this.authService.doLogout();
    this.router.navigate(['/','login']);
  }

}
