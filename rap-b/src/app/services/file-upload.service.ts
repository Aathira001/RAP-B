import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  apiURL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public uploadFiles(files: any) {
    return this.http.post(this.apiURL + 'upload/', files)
  }
}
