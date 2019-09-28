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
  password = "";

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  //function to grab login details and query the api
  //if successful, login, else show error message
  login(){
    let user = {
      username: this.username,
      password: this.password
    }

    let data = JSON.stringify(user);
    
    //auth service sends request to node.js api
    this.authService.login(data).subscribe((response) => {
      console.log('response from the post is ', response);
      //if null, no user found
      if(response[0] == null) {
        return alert("Please check you credentials and try again.");
      }

      //save found user object to local session storage
      let storageJson = "";
      storageJson = JSON.stringify(response[0]);
      sessionStorage.setItem("Authenticated_user", storageJson);
      this.router.navigateByUrl('home');
    }, (error) => {
      console.log('error during post was', error);
    });
  }
}
