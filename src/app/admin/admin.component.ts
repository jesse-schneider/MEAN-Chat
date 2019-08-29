import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  username = "";
  birthdate = "";
  age = "";
  email = "";
  password = "";
  groupAdmin = false;
  userList= [];
  create = false;
  detailsVisible = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    let storageJson = sessionStorage.getItem('Authenticated_user');
    this.userList = JSON.parse(storageJson);
  }

  createUser() {
    let user = {
      username: this.username,
      birthdate: this.birthdate,
      age: this.age,
      email: this.email,
      password: this.password,
      groupAdmin: this.groupAdmin
    }

    let data = JSON.stringify(user);

    this.authService.createUser(data).subscribe((response) => {
      console.log('response: ', response);
      this.userList.push(response);
      sessionStorage.setItem('Authenticated_user', JSON.stringify(this.userList));
      this.resetFields();
      this.swapView();
    }, (error) => {
      console.log("error during user creation: ", error);
    });
  }

  resetFields(){
    this.username = "";
    this.birthdate = "";
    this.age = "";
    this.email = "";
    this.password = "";
    this.groupAdmin = false;
  }

  swapView(){
    this.create = !this.create;
  }

  userDetailsVisible() {
    this.detailsVisible = !this.detailsVisible;
  }

  
}
