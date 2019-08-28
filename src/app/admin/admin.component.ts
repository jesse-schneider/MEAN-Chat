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

  constructor(private authService: AuthService) { }

  ngOnInit() {
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
    console.log(data);

    this.authService.createUser(data).subscribe((response) => {
      console.log('response: ', response);
    }, (error) => {
      console.log("error during user creation: ", error);
    });
  }

  
}
