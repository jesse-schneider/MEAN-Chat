import { Component, OnInit, Input } from '@angular/core';
import { GroupService } from './../services/group.service';

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
  group = sessionStorage.getItem('Group');
  channelList = [];

  userToRemove = "";
  userToAdd = "";
  controls = false;
  createUser = false;
  removeUser = false;

  constructor(private groupService: GroupService) { }

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
  }

  showControls() {
    this.controls = !this.controls;
    if (this.removeUser == true) {
      this.removeUser = false;
    }
    if (this.createUser == true) {
      this.createUser = false;
    }
  }
  showCreateUser() {
    this.createUser = !this.createUser;
    if (this.removeUser == true) {
      this.removeUser = false;
    }
  }

  showRemoveUser() {
    this.removeUser = !this.removeUser;
    if (this.createUser == true) {
      this.createUser = false;
    }
  }

  addUserToChannel() {
    let post = {
      user: this.userToAdd,
      channel: this.channel,
      group: this.group
    }

    this.groupService.addUtoChannel(post).subscribe((response) => {
      console.log('response: ', response);
    }, (error) => {
      console.log('error: ', error);
    });

  }

  removeUserFromChannel() {
    let post = {
      user: this.userToRemove,
      channel: this.channel,
      group: this.group
    }

    this.groupService.addUtoChannel(post).subscribe((response) => {
      console.log('response: ', response);
    }, (error) => {
      console.log('error: ', error);
    });

  }

}
