import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  user = JSON.parse(sessionStorage.getItem('Authenticated_user'));
  group = sessionStorage.getItem('Group');
  channelList = [];
  newChannel = "";
  createChannel = false;
  admin = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    if (this.user.ofGroupAdminRole == true) {
      this.admin = !this.admin;
    }
  }

  showCreateChannel() {
    this.createChannel = !this.createChannel;
  }

  create() {
    this.channelList.push(this.newChannel);
    this.newChannel = "";
    let groupObj = {
      group: this.group,
      channels: this.channelList
    };

    console.log(groupObj);

    let data = JSON.stringify(groupObj);

    this.authService.createChannel(data).subscribe((response) => {
      console.log('response: ', response);

    }, (error) => {
      console.log('error: ', error);
    });

  }

}
