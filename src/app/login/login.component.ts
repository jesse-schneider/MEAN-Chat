import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = "";
  password = "";

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  login(){
    let user = {
      email: this.email,
      password: this.password
    }
    let data = JSON.stringify(user);

    this.authService.login(data).subscribe((response) => {
      console.log('response from the post is ', response);
      let storageJson = JSON.stringify(response);
      sessionStorage.setItem("Authenticated_user", storageJson);
      this.router.navigateByUrl('home');
    }, (error) => {
      console.log('error during post was', error);
    });
  }

}
