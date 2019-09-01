import { Component, OnInit } from '@angular/core';
import { GroupService } from './../services/group.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user = JSON.parse(sessionStorage.getItem('Authenticated_user'));
  groupList = this.user.groupList;
  newGroup = "";
  groupToRemove = "";
  createGroup = false;
  removeGroup = false;
  admin = false;
  

  constructor(private groupService: GroupService) { }

  ngOnInit() {
    if (this.user.ofGroupAdminRole == true)
    {
      this.admin = !this.admin;
    }
  }

  showCreateGroup() {
    this.createGroup = !this.createGroup;
    if (this.removeGroup == true) {
      this.removeGroup = false;
    }
  }
  showRemoveGroup() {
    this.removeGroup = !this.removeGroup;
    if(this.createGroup == true) {
      this.createGroup = false;
    }
  }

  selectGroup(group) {
    sessionStorage.setItem('Group', group);
  }

  create(){
    this.user.adminGroupList.push(this.newGroup);
    this.user.groupList.push(this.newGroup);
    this.newGroup = "";

    let data = JSON.stringify(this.user);

    this.groupService.createGroup(data).subscribe((response) => {
      console.log('response: ', response);
      sessionStorage.setItem('Authenticated_user', data);
    }, (error) => {
        console.log('error: ', error);
    });
    }

    remove() {
      let post = {
        group: this.groupToRemove,
        user: this.user.username
      };

      this.groupService.removeGroup(JSON.stringify(post)).subscribe((response) => {
        console.log('response: ', response);
        sessionStorage.setItem('Authenticated_user', JSON.stringify(response));
        this.user = JSON.parse(sessionStorage.getItem('Authenticated_user'));
        this.groupList = this.user.groupList;

      }, (error) => {
        console.log('error: ', error);
      });
    }

}
