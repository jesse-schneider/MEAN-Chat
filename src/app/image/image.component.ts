import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
const URL = 'http://localhost:3000/api/uploadimage';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  //create new fileUploader
  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });
  user = JSON.parse(sessionStorage.getItem('Authenticated_user'));
  picture = "";
  pictureURL = "";
  



  constructor(private authService: AuthService, private http: HttpClient, private el: ElementRef, private router: Router) { }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => { console.log("ImageUpload:uploaded:", item, status, response); }
    var str = this.user.profilePicLocation.split('\\');
    this.picture = str[4];
    this.pictureURL = `assets/img/${this.picture}`;
    console.log(this.pictureURL);
}

  upload() {
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
    let fileCount: number = inputEl.files.length;
    let formData = new FormData();
    formData.append('user', this.user._id);
    if (fileCount > 0) {
      formData.append('photo', inputEl.files.item(0));
      this.http.post('http://localhost:3000/api/uploadimage', formData).subscribe((response) => {
        console.log(response);
        sessionStorage.setItem('Authenticated_user', JSON.stringify(response));
        var str = this.user.profilePicLocation.split('\\');
        this.picture = str[4];
        this.pictureURL = `assets/img/${this.picture}`;
        alert("success");
        window.location.replace('image');
      });
    }
  }

}
