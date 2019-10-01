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
  //create new fileUploader object
  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });
  user = JSON.parse(sessionStorage.getItem('Authenticated_user'));
  picture:any = "";
  pictureURL:any = "";
  loggedIn = false;
  

  constructor(private authService: AuthService, private http: HttpClient, private el: ElementRef, private router: Router) { }

  ngOnInit() {
    //on init, check for logged in user, and if found, check if they are an admin
    if (sessionStorage.getItem('Authenticated_user') == null) {
      return this.router.navigateByUrl('');
    } else {
      this.loggedIn = true;
    }

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => { console.log("ImageUpload:uploaded:", item, status, response); }
    var post = {
      user: this.user._id
    };
    let data = JSON.stringify(post);
    this.authService.getImage(data).subscribe((response) => {
      this.pictureURL = response["picture"];
    });
}

  upload() {
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
    let fileCount: number = inputEl.files.length;
    let formData = new FormData();
    formData.append('user', this.user._id);
    if (fileCount > 0) {
      formData.append('photo', inputEl.files.item(0));

      this.authService.uploadImage(formData).subscribe((response) => {
        sessionStorage.setItem('Authenticated_user', JSON.stringify(response));
        alert("success");
        this.ngOnInit();
      });
    }
  }

  linkImg(fileName) {
    return `http://localhost:3000/${fileName}`;
  }

}
