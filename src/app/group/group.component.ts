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
  userToRemove = "";
  createChannel = false;
  removeChannel = false;
  removeUser = false;
  createUser = false;
  admin = false;
  sadmin = false;
  assis = false;
  activeCss = [];
  currentCss = "";
  

  uusername = "";
  uemail = "";
  ugroupAdmin = false;
  ugroupAssis = false;
  ugroupList = [];
  ugroupChannels = {};
  uadminGroupList = [];

  constructor(private authService: AuthService, private groupService: GroupService) { }

  ngOnInit() {
    let storageJson = sessionStorage.getItem('Users');
    this.userList = JSON.parse(storageJson);

    if (this.user.ofGroupAdminRole == true) {
      this.admin = !this.admin;
    }
    if(this.user.username== 'super') {
      this.sadmin = !this.sadmin;
      this.assis = !this.assis;
    }

    if(this.user.ofGroupAsissRole == true) {
      this.assis = !this.assis;
    }

    let data = JSON.stringify({ group: this.group});

    this.channelList = this.user.groupChannels;
    this.activeCss = this.channelList;
  }

  showCreateChannel() {
    this.createChannel = !this.createChannel;
    if(this.createUser == true) {
      this.createUser = false;
    } else if (this.removeChannel == true) {
      this.removeChannel = false;
    } else if (this.removeUser == true) {
      this.removeUser = false;
    }
  }

  showRemoveChannel() {
    this.removeChannel = !this.removeChannel;
    if (this.createUser == true) {
      this.createUser = false;
    } else if (this.createChannel == true) {
      this.createChannel = false;
    } else if (this.removeUser == true) {
      this.removeUser = false;
    }
  }

  showCreateUser() {
    this.createUser = !this.createUser;
    if (this.createChannel == true) {
      this.createChannel = false;
    } else if (this.removeChannel == true) {
      this.removeChannel = false;
    } else if (this.removeUser == true) {
      this.removeUser = false;
    }
  }

  showRemoveUser() {
    this.removeUser = !this.removeUser;
    if (this.createUser == true) {
      this.createUser = false;
    } else if (this.removeChannel == true) {
      this.removeChannel = false;
    } else if(this.createChannel == true) {
      this.createChannel = false;
    }
  }

  addU() {
    let user = {
      username: this.uusername,
      email: this.uemail,
      groupAdmin: this.ugroupAdmin,
      groupAssis: this.ugroupAssis,
      groupList: this.ugroupList,
      adminGroupList: this.uadminGroupList,
      groupChannels: this.ugroupChannels
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

  removeU() {
    console.log(this.userToRemove);
    this.authService.removeUser(JSON.parse("{\"remove\": \"" + this.userToRemove + "\", \"user\": \"" + this.user.username + "\" }")).subscribe((response) => {
      console.log(response);
    });
  }

  resetFields() {
    this.uusername = "";
    this.uemail = "";
    this.ugroupAdmin = false;
  }

  activateLiCss(i) {
    // let count = 0;
    // let nextAct;
    // let prevAct;

    // for(let channel of this.activeCss) {
      
    //   if (channel === 'active') {
    //     prevAct = count;
    //   }
    //   if (channel === i) {
    //     nextAct = count;
    //     this.currentCss = channel;
    //   }
    //   count++;
    // }
    // this.activeCss[nextAct] = "active";
    // console.log(this.activeCss);
  }

  createC() {
    let groupObj = {
      group: this.group,
      channel: this.newChannel,
      user: this.user.username
    };
    this.newChannel = "";

    let data = JSON.stringify(groupObj);

    this.authService.createChannel(data).subscribe((response) => {
      console.log('response: ', response);
      sessionStorage.setItem('Authenticated_user', JSON.stringify(response));
      this.user = JSON.parse(sessionStorage.getItem('Authenticated_user'));
      this.channelList = this.user.groupChannels;
    }, (error) => {
      console.log('error: ', error);
    });
  }
  
  removeC() {
    this.groupService.removeChannel(JSON.parse("{\"channel\": \"" + this.channelToRemove + "\", \"user\": \"" + this.user.username + "\" }")).subscribe((response) => {
      console.log('response: ', response);
      sessionStorage.setItem('Authenticated_user', JSON.stringify(response));
      this.user = JSON.parse(sessionStorage.getItem('Authenticated_user'));
      this.channelList = this.user.groupChannels;
    }, (error) => {
      console.log('error: ', error);
    });
  }
    
}
