import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  collapsed = true;
  admin = false;
  loggedin = false;
  user = { username: "" };

  constructor(private authService: AuthService) {
  }

  toggleCollapsed()
  {
    this.collapsed = !this.collapsed;
  }


  logout() {
    sessionStorage.clear();
  }

  ngOnInit() {
  }

}
