import { Component, OnInit, Input } from '@angular/core';

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
  controls = false;

  constructor() { }

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
  }

}
