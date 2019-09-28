import { Component, OnInit, Input } from '@angular/core';
import { GroupService } from './../services/group.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {

  assis = false;
  admin = false;
  sadmin = false;
  @Input() channel = "";
  userList = [];
  user = JSON.parse(sessionStorage.getItem('Authenticated_user'));
  pictureURL = "";
  group = sessionStorage.getItem('Group');
  allUsers:any = [];
  channelList = [];
  messages = [];
  

  userManagement = false;


  constructor(private groupService: GroupService, private authService: AuthService) { }

  ngOnInit() {
    let storageJson = sessionStorage.getItem('Users');
    this.userList = JSON.parse(storageJson);

    if (this.user.ofGroupAdminRole == true) {
      this.admin = !this.admin;
    }
    if (this.user.username == 'super') {
      this.sadmin = !this.sadmin;
      this.assis = !this.assis;
    }

    if (this.user.ofGroupAsissRole == true) {
      this.assis = !this.assis;
    }

    this.channelList = this.user.groupChannels;
    this.channel = JSON.parse(sessionStorage.getItem('Channel'));
    this.authService.getAllUsers().subscribe((response) => {
      this.allUsers = response;
      console.log(this.allUsers);
    });

    var post = {
      user: this.user._id
    };
    let data = JSON.stringify(post);
    this.authService.getImage(data).subscribe((response) => {
      this.pictureURL = response["picture"];
      console.log(this.pictureURL);
    });
  }

  showUsers() {
    //show/hide the user table
    this.userManagement = !this.userManagement;
  }

  addUserToChannel(id:any) {
    //create post object
    let post = {
      user: id,
      channel: this.channel,
      group: this.group
    }

    //use group service to send new user to api, add channel to their channel array
    this.groupService.addUtoChannel(post).subscribe((response) => {
      console.log('response: ', response);
    }, (error) => {
      console.log('error: ', error);
    });
    this.showUsers();
  }

  removeUserFromChannel(id) {
    //create post object
    let post = {
      user: id,
      channel: this.channel,
      group: this.group
    }

    //use group service to send user to be removed from channel to the api
    this.groupService.removeUFromChannel(post).subscribe((response) => {
      console.log('response: ', response);
    }, (error) => {
      console.log('error: ', error);
    });
    this.showUsers();
  }

  linkImg(fileName) {
    return `http://localhost:3000/${fileName}`;
  }

}
