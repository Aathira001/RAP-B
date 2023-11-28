import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import { BehaviorSubject, switchMap, throwError } from 'rxjs';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent {
  status: "initial" | "uploading" | "success" | "fail" = "initial";
  files: File[] = [];
  rowData: any[] | undefined;
  columnDefs: ColDef[] | undefined;
  gridOptions: GridOptions | undefined;
  private fileListTrigger = new BehaviorSubject<void|null>(null);

  constructor(private fileUpload: FileUploadService) {}

  ngOnInit(): void {

    this.fileListTrigger.pipe(
      switchMap(() => this.fileUpload.getFiles())).subscribe(res => {
      this.rowData = res['files']
    });
    this.fileListTrigger.next();

    this.columnDefs = [
      { field: 'name', headerName: 'File Name' , resizable: true, filter: 'agTextColumnFilter', sortable: true},
      { field: 'size', headerName: 'File Size' }
    ];

  }

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
        this.fileListTrigger.next();
        console.log(res)
        this.status = "success";
      }, (err) => {
        this.status = "fail";
        console.log(err)
      })
    }
  }
}