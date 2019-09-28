import { Component, OnInit } from '@angular/core';
import { GroupService } from './../services/group.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user = JSON.parse(sessionStorage.getItem('Authenticated_user'));
  groups = [];
  newGroup = "";
  groupToRemove = "";
  createGroup = false;
  admin = false;
  loggedIn = false;
  

  constructor(private router: Router, private groupService: GroupService) { }

  ngOnInit() {
    //on init, check for logged in user, and if found, check if they are an admin
    if (sessionStorage.getItem('Authenticated_user') == null) {
      return this.router.navigateByUrl('');
    } else {
      this.loggedIn = true;
    }
    if (this.user.ofGroupAdminRole == true) {
      this.admin = !this.admin;
    }
  }

  //function to show the create group button
  showCreateGroup() {
    this.createGroup = !this.createGroup;
  }

  //store the selected group as a variable in the session storage
  selectGroup(group) {
    sessionStorage.setItem('Group', group);
  }

  //function to send a request to api to create a new group
  create(){
    //create post object
    let post = {
      newGroup: this.newGroup,
      id: this.user._id,
    };
    //stringify post object
    let data = JSON.stringify(post);

    //make request using group service
    this.groupService.createGroup(data).subscribe((response) => {
      console.log('response: ', response);

      //since authenticated user has list of groups, update the session storage to show the new group
      sessionStorage.setItem('Authenticated_user', JSON.stringify(response));
      this.user = JSON.parse(sessionStorage.getItem('Authenticated_user'));
    }, (error) => {
        console.log('error: ', error);
    });
    //reset string back to empty
    this.newGroup = "";
    }

    remove(i) {
      //create post object
      let post = {
        group: i,
        id: this.user._id
      };
      //stringify the post
      let data = JSON.stringify(post);

      //use group service to send the group to remove to api 
      if (confirm("Do you really want to remove this group?")) {
      this.groupService.removeGroup(data).subscribe((response) => {
        console.log('response: ', response);

        //since authenticated user has list of groups, update the session storage to show the removed group
        sessionStorage.setItem('Authenticated_user', JSON.stringify(response));
        this.user = JSON.parse(sessionStorage.getItem('Authenticated_user'));
      }, (error) => {
        console.log('error: ', error);
      });
      //reset string back to empty
      this.groupToRemove = "";
    }
  }

}
