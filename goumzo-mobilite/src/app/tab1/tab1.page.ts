import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
interface ApiResponse {
  type: string;
  features: Array<{
    type: string;
    properties: {
      LIBELLE: string;
      
    };
  }>;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor(private http: HttpClient) {}
  public results: string[] = [];
  public StartResults: string[] = [];
  public selectedResult: string = '';
  public endPoint: string = '';
  public startPoint: string = '';
  public showSearchList: boolean = true;
  public showStartList: boolean = true;

  handleChange(event: any) {
    if (event.target.value !== "") {
      const query = encodeURIComponent(event.target.value);
      const apiUrl = `https://data.mobilites-m.fr/api/findType/json?types=arret&query=${query}`;

      this.http.get<ApiResponse>(apiUrl).subscribe(data => {
        this.results = Array.from(new Set(data.features.map(feature => feature.properties.LIBELLE)));
      });
    } else {
      this.results = [];
      this.showSearchList = true;
    }
  }

  handleChangeStart(event: any) {
    if (event.target.value !== "") {
      const query = encodeURIComponent(event.target.value);
      const apiUrl = `https://data.mobilites-m.fr/api/findType/json?types=arret&query=${query}`;

      this.http.get<ApiResponse>(apiUrl).subscribe(data => {
        this.StartResults = Array.from(new Set(data.features.map(feature => feature.properties.LIBELLE)));
      });
    } else {
      this.StartResults = [];
      this.showStartList = true;
    }
  }

  selectResult(result: string) {
    this.selectedResult = result;
  }

  selectStartResult(result: string) {
    this.selectedResult = result;
  }

  debug() {
    console.log('startPoint: ', this.startPoint);
    console.log('endPoint: ', this.endPoint);
    }
}

