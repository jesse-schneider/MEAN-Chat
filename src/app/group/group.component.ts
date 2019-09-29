import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { GroupService } from './../services/group.service';
import { SocketService } from './../services/socket.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  user = JSON.parse(sessionStorage.getItem('Authenticated_user'));
  group = sessionStorage.getItem('Group');
  channel = "";
  channelList = [];
  allUsers:any = [];
  newChannel = "";
  createChannel = false;
  removeChannel = false;
  removeUser = false;
  createUser = false;
  admin = false;
  sadmin = false;
  assis = false;
  channelObj = {};

  uusername = "";
  uemail = "";
  upassword: "";
  ugroupAdmin = false;
  ugroupAssis = false;
  ugroupList = [];
  ugroupChannels = [];
  uadminGroupList = [];

  messages = [];

  constructor(private authService: AuthService, private groupService: GroupService, private socketService: SocketService, private router: Router) { }

  

  ngOnInit() {
    //on init, check user roles, and grab user's channels to put into channels list array
    if (this.user.ofGroupAdminRole === true) {
      this.admin = !this.admin;
    }
    if(this.user.username === 'super') {
      this.sadmin = !this.sadmin;
      this.assis = !this.assis;
    }

    if(this.user.ofGroupAsissRole === true) {
      this.assis = !this.assis;
    }

    for (let i in this.user.groupChannels) {
      var str = this.user.groupChannels[i].split('-');
      if(str[0] != this.group) {
        continue;
      } else {
        this.channelList.push(this.user.groupChannels[i]);
      }
    }

    this.authService.getAllUsers().subscribe((response) => {
      this.allUsers = response;
    });

    this.channel = this.channelList[0];
    sessionStorage.setItem('Channel', JSON.stringify(this.channel));

    var channelPost = { channel: this.channel };
    this.groupService.getOneChannel(JSON.stringify(channelPost)).subscribe((response) => {
      this.channelObj = response;
      sessionStorage.setItem('ChannelObj', JSON.stringify(this.channelObj));
    });
    this.initIoConnection();
  }

  showCreateChannel() {
    //visiblity of the create channel elements
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
    //visiblity of the remove channel elements
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
    //visiblity of the create user elements
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
    //visiblity of the remove user elements
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
    //new user object
    let user = {
      username: this.uusername,
      email: this.uemail,
      password: this.upassword,
      groupAdmin: this.ugroupAdmin,
      groupAssis: this.ugroupAssis,
      groupList: this.ugroupList,
      adminGroupList: this.uadminGroupList,
      groupChannels: this.ugroupChannels,
      profilePicLocation: "img\default-avatar.jpg"
    }
    user.groupList.push(this.group);

    let data = JSON.stringify(user);

    //send request to api to add a new user, and have them automatically added to this current group
    this.authService.createUser(data).subscribe((response) => {
      console.log('response: ', response);
      this.allUsers.push(response);
      sessionStorage.setItem('Users', JSON.stringify(this.allUsers));
      this.resetFields();
      this.showCreateUser();
    }, (error) => {
      console.log("error during user creation: ", error);
    });
  }

  removeU(i) {
    //create post object
    let post = {
      user: i
    };
    let data = JSON.stringify(post);

    //send user id to be deleted
    this.authService.removeUser(data).subscribe((response) => {
      console.log(response);
      //get updated user list back and update local session storage
      this.authService.getAllUsers().subscribe((response) => {
        this.allUsers = response;
        sessionStorage.setItem('Users', JSON.stringify(this.allUsers));
        console.log(this.allUsers);
      });
    });
    this.showRemoveUser();
  }

  resetFields() {
    this.uusername = "";
    this.uemail = "";
    this.ugroupAdmin = false;
  }

  selectChannel(i) {
    this.channel = i;
    this.messages = [];
    sessionStorage.setItem('Channel', JSON.stringify(this.channel));
    var channelPost = { channel: this.channel };

    this.groupService.getOneChannel(JSON.stringify(channelPost)).subscribe((response) => {
      this.channelObj = response;
      sessionStorage.setItem('ChannelObj', JSON.stringify(this.channelObj));

        this.messages = this.channelObj["messages"];
        this.socketService.joinChannel({ user: this.user.username, channel: this.channel });
    });
  }

  createC() {
    //create post object
    let post = {
      group: this.group,
      channel: this.newChannel,
      user: this.user._id,
      messages: []
    };

    let data = JSON.stringify(post);

    //send request containing new channel to be created in current group
    this.groupService.createChannel(data).subscribe((response) => {
      console.log('response: ', response);
      sessionStorage.setItem('Authenticated_user', JSON.stringify(response));
      this.user = JSON.parse(sessionStorage.getItem('Authenticated_user'));
      this.channelList = [];
      for (let i in this.user.groupChannels) {
        var str = this.user.groupChannels[i].split('-');
        if (str[0] != this.group) {
          continue;
        } else {
          this.channelList.push(this.user.groupChannels[i]);
        }
      }
    }, (error) => {
      console.log('error: ', error);
    });
    this.newChannel = "";
  }
  
  removeC(i) {
    //create post object
    let post = {
      group: this.group,
      channel: i,
      user: this.user._id
    };

      let data = JSON.stringify(post);

    //send request with group service to remove channel from current group
    this.groupService.removeChannel(data).subscribe((response) => {
      console.log('response: ', response);
      sessionStorage.setItem('Authenticated_user', JSON.stringify(response));
      this.user = JSON.parse(sessionStorage.getItem('Authenticated_user'));
      this.channelList = [];
      for (let i in this.user.groupChannels) {
        var str = this.user.groupChannels[i].split('-');
        if (str[0] != this.group) {
          continue;
        } else {
          this.channelList.push(this.user.groupChannels[i]);
        }
      }
    }, (error) => {
      console.log('error: ', error);
    });
  }

  initIoConnection() {
    this.socketService.initSocket();
  }
  
}
