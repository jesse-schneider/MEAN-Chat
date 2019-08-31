import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user = JSON.parse(sessionStorage.getItem('Authenticated_user'));
  groupList = this.user.groupList;
  newGroup = "";
  createGroup = false;
  admin = false;
  

  constructor(private authService: AuthService) { }

  ngOnInit() {
    if (this.user.ofGroupAdminRole == true)
    {
      this.admin = !this.admin;
    }
    
  }

  showCreateGroup() {
    this.createGroup = !this.createGroup;
  }

  selectGroup(group) {
    sessionStorage.setItem('Group', group);
  }

  create(){
    this.user.adminGroupList.push(this.newGroup);
    this.user.groupList.push(this.newGroup);
    this.newGroup = "";

    let data = JSON.stringify(this.user);

    this.authService.createGroup(data).subscribe((response) => {
      console.log('response: ', response);
      sessionStorage.setItem('Authenticated_user', data);
    }, (error) => {
        console.log('error: ', error);
    });

    }

}
