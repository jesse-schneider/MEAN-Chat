import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  username = "";
  email = "";
  groupAdmin = false;
  groupList = [];
  adminGroupList = [];
  userList= [];
  create = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    let storageJson = sessionStorage.getItem('Users');
    this.userList = JSON.parse(storageJson);
  }

  createUser() {
    let user = {
      username: this.username,
      email: this.email,
      groupAdmin: this.groupAdmin,
      groupList: this.groupList,
      adminGroupList: this.adminGroupList
    }

    let data = JSON.stringify(user);

    this.authService.createUser(data).subscribe((response) => {
      console.log('response: ', response);
      this.userList.push(response);
      sessionStorage.setItem('Users', JSON.stringify(this.userList));
      this.resetFields();
      this.swapView();
    }, (error) => {
      console.log("error during user creation: ", error);
    });
  }

  resetFields(){
    this.username = "";
    this.email = "";
    this.groupAdmin = false;
  }

  swapView(){
    this.create = !this.create;
  }

  
}
