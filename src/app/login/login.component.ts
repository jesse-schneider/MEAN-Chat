import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = "";

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  login(){
    let user = {
      username: this.username
    }

    let data = JSON.stringify(user);

    this.authService.login(data).subscribe((response) => {
      console.log('response from the post is ', response);
      let storageJson = "";
      storageJson = JSON.stringify(response[0]);
      if(response[0].username == 'super')
      {
        let storageList = JSON.stringify(response);
        sessionStorage.setItem("Users", storageList);
      }
      sessionStorage.setItem("Authenticated_user", storageJson);
      this.router.navigateByUrl('home');
    }, (error) => {
      console.log('error during post was', error);
    });
  }
}
