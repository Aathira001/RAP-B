import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { throwError } from 'rxjs';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent {
  status: "initial" | "uploading" | "success" | "fail" = "initial";
  files: File[] = [];

  constructor(private http: HttpClient, private fileUpload: FileUploadService) {}

  ngOnInit(): void {}

  onChange(event: any) {
    const files = event.target.files;

    if (files.length) {
      this.status = "initial";
      this.files = files;
    }
  }

  onUpload() {
    this.status = "uploading";
    if (this.files.length) {
      const formData = new FormData();

      [...this.files].forEach((file) => {
        formData.append("file", file, file.name);
      });

      this.fileUpload.uploadFiles(formData).subscribe(res => {
        console.log(res)
        this.status = "success";
      }, (err) => {
        this.status = "fail";
        console.log(err)
      })
    }
  }
}