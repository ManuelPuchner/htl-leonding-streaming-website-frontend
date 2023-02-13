import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  fileName = '';
  returnedPath: string = '';

  constructor(private http: HttpClient) {}

  onFileSelected(event: any, imageURL: Observable<string>) {

      const file:File = event.target.files[0];

      if (file) {

          this.fileName = file.name;

          const formData = new FormData();

          formData.append("image", file);

          const upload$ = this.http.post("/image", formData);

          upload$.subscribe((data: any) => {
              this.returnedPath = "/api/image/" + data.path.filename;
              console.log(this.returnedPath);
          });
          
      }

      return this.returnedPath;
  }

  //get image from server
  getImage(returnedPath: string) {
      return this.http.get(returnedPath);
  }
}

