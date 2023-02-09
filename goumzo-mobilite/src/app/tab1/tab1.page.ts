import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { OnChanges, Input } from '@angular/core';

interface ApiResponse {
  type: string;
  features: Array<{
    type: string;
    properties: {
      LIBELLE: string;
    };
    geometry: {
      coordinates: number[][][];
    };
  }>;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  coordinates: { [key: string]: number[][][] } = {};
  constructor(private http: HttpClient) {

    const favoritesFromStorage = localStorage.getItem('favorites');
    try {
      this.favorites = favoritesFromStorage ? JSON.parse(favoritesFromStorage) : [];
    } catch (error) {
      console.error(error);
      this.favorites = [];
    }
  }

  public autoFilled: boolean = true;
  public results: string[] = [];
  public StartResults: string[] = [];
  public EndResults: string[] = [];
  public favorites: any[] = [];
  public selectedFavorites: string[] = [];
  public selectedResult: string = '';
  public endPoint: string = '';
  public startPoint: string = '';
  public showSearchList: boolean = true;
  public showEndList: boolean = true;
  public showStartList: boolean = true;

  handleChange(event: any) {
    if (event.target.value !== '') {
      const query = encodeURIComponent(event.target.value);
      const apiUrl = `https://data.mobilites-m.fr/api/findType/json?types=arret&query=${query}`;

      this.http.get<ApiResponse>(apiUrl).subscribe(data => {
        this.results = Array.from(new Set(data.features.map(feature => feature.properties.LIBELLE)));
        data.features.forEach(feature => {
          this.coordinates[feature.properties.LIBELLE] = feature.geometry.coordinates;
        });
      });
    } else {
      this.results = [];
      this.showSearchList = true;
      this.showEndList = true;
    }
    this.autoFilled = false;
  }

  handleChangeStart(event: any) {
    if (event.target.value !== '') {
      const query = encodeURIComponent(event.target.value);
      const apiUrl = `https://data.mobilites-m.fr/api/findType/json?types=arret&query=${query}`;

      this.http.get<ApiResponse>(apiUrl).subscribe(data => {
        this.StartResults = Array.from(new Set(data.features.map(feature => feature.properties.LIBELLE)));
        data.features.forEach(feature => {
          this.coordinates[feature.properties.LIBELLE] = feature.geometry.coordinates;
        });
      });
    } else {
      this.StartResults = [];
      this.showStartList = true;
    }
  }

  handleChangeEnd(event: any) {
    if (event.target.value !== '') {
      const query = encodeURIComponent(event.target.value);
      const apiUrl = `https://data.mobilites-m.fr/api/findType/json?types=arret&query=${query}`;

      this.http.get<ApiResponse>(apiUrl).subscribe(data => {
        this.EndResults = Array.from(new Set(data.features.map(feature => feature.properties.LIBELLE)));
        data.features.forEach(feature => {
          this.coordinates[feature.properties.LIBELLE] = feature.geometry.coordinates;
        });
      });
    } else {
      this.EndResults = [];
      this.showEndList = true;
    }
  }

  selectResult(result: string) {
    this.selectedResult = result;
    this.showSearchList = false;
    this.showEndList = false;
  }

  selectStartResult(result: string) {
    this.startPoint = result;
    this.showStartList = false;
    this.showEndList = false;
  }

  debug() {
    let startCoordinates = null;
    let endCoordinates = null;

    for (let key in this.coordinates) {
      if (key === this.endPoint) {
        endCoordinates = this.coordinates[key];
      }
      if (key === this.startPoint) {
        startCoordinates = this.coordinates[key];
      }
    }

    console.log('startPoint: ', this.startPoint);
    console.log('endPoint: ', this.endPoint);
    console.log('startCoordinates: ', startCoordinates);
    console.log('endCoordinates: ', endCoordinates);
  }

  addToFavorites() {
    const existing = this.favorites.filter(f => f.startPoint === this.startPoint && f.endPoint === this.endPoint);
    if (existing.length === 0) {
      this.favorites.push({
        startPoint: this.startPoint,
        endPoint: this.endPoint
      });
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }
  }

  removeFromFavorites(favorite: string) {
    const index = this.favorites.indexOf(favorite);
    if (index !== -1) {
      this.favorites.splice(index, 1);
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }
  }

  setSelectedFavorites() {
    localStorage.setItem('favorites', JSON.stringify(this.selectedFavorites));
  }

  displayFavorites() {
    let favorites = localStorage.getItem('favorites');
    this.selectedFavorites = favorites ? JSON.parse(favorites) : [];
  }

}
