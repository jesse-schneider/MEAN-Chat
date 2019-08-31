import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { GroupService } from './../services/group.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  user = JSON.parse(sessionStorage.getItem('Authenticated_user'));
  group = sessionStorage.getItem('Group');
  channelList = [];
  userList = [];
  newChannel = "";
  channelToRemove = "";
  createChannel = false;
  removeChannel = false;
  createUser = false;
  admin = false;
  

  uusername = "";
  uemail = "";
  ugroupAdmin = false;
  ugroupList = [];
  ugroupListChannels = {};
  uadminGroupList = [];

  constructor(private authService: AuthService, private groupService: GroupService) { }

  ngOnInit() {
    let storageJson = sessionStorage.getItem('Users');
    this.userList = JSON.parse(storageJson);

    if (this.user.ofGroupAdminRole == true) {
      this.admin = !this.admin;
    }
    let data = JSON.stringify({ group: this.group});

    this.groupService.getChannels(data).subscribe((res) => {
      this.channelList = [];
      this.channelList = res.channels;
    });
  }

  showCreateChannel() {
    this.createChannel = !this.createChannel;
    if(this.createUser == true) {
      this.createUser = false;
    } else if (this.removeChannel == true) {
      this.removeChannel = false;
    }
  }

  showRemoveChannel() {
    this.removeChannel = !this.removeChannel;
    if (this.createUser == true) {
      this.createUser = false;
    } else if (this.createChannel == true) {
      this.createChannel = false;
    }
  }

  showCreateUser() {
    this.createUser = !this.createUser;
    if (this.createChannel == true) {
      this.createChannel = false;
    } else if (this.removeChannel == true) {
      this.removeChannel = false;
    }
  }

  addUser() {
    let user = {
      username: this.uusername,
      email: this.uemail,
      groupAdmin: this.ugroupAdmin,
      groupList: this.ugroupList,
      adminGroupList: this.uadminGroupList,
      groupListChannels: this.ugroupListChannels
    }
    user.groupList.push(this.group);

    let data = JSON.stringify(user);

    this.authService.createUser(data).subscribe((response) => {
      console.log('response: ', response);
      this.userList.push(response);
      sessionStorage.setItem('Users', JSON.stringify(this.userList));
      this.resetFields();
      this.showCreateUser();
    }, (error) => {
      console.log("error during user creation: ", error);
    });

  }

  resetFields() {
    this.uusername = "";
    this.uemail = "";
    this.ugroupAdmin = false;
  }

  createC() {
    this.channelList.push(this.newChannel);
    this.newChannel = "";
    let groupObj = {
      group: this.group,
      channels: this.channelList
    };

    let data = JSON.stringify(groupObj);

    this.authService.createChannel(data).subscribe((response) => {
      console.log('response: ', response);

    }, (error) => {
      console.log('error: ', error);
    });
  }
  
  removeC() {
    console.log(this.channelToRemove);
    this.channelList.filter((channel) => channel != this.channelToRemove);
    console.log(this.channelList);
  }
    
  }
