import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  fileName = '';
  returnedPath: object = {};

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {

      const file:File = event.target.files[0];

      if (file) {

          this.fileName = file.name;

          const formData = new FormData();

          formData.append("image", file);

          const upload$ = this.http.post("/image", formData);

          upload$.subscribe((data: any) => {
              this.returnedPath = data.path;
              console.log(this.returnedPath);
              
          });
          
      }
  }
}

