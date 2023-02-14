import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  @Output()
  imageUrlEvent = new EventEmitter<string>();

  fileName = '';
  returnedPath: string = '';

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {

      const file:File = event.target.files[0];

      if (file) {

          this.fileName = file.name;

          const formData = new FormData();

          formData.append("image", file);

          const upload$ = this.http.post("/image", formData);

          upload$.subscribe((data: any) => {
              this.returnedPath = "/api/image/" + data.path.filename;
              // console.log(this.returnedPath);

              this.imageUrlEvent.emit(this.returnedPath);
          });
          
      }
  }

  //get image from server
  getImage(returnedPath: string) {
      return this.http.get(returnedPath);
  }
}

