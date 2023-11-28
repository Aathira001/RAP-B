import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export class fileDTO {
  name: string | undefined;
  size: any;
}

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  apiURL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public uploadFiles(files: any) {
    return this.http.post(this.apiURL + 'upload/', files)
  }

  public getFiles(): Observable<any> {
    return this.http.get(this.apiURL + 'getfiledetails/')
  }
}
