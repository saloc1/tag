import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Line } from './line';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  public getLineGeometry(line: string): Observable<any> {
    return this.httpClient.get<any>(`https://data.mobilites-m.fr/api/lines/json?types=ligne&codes=${line}`)
  }

  public getLines(network: string): Observable<Line[]> {
    return this.httpClient.get<Line[]>(`https://data.mobilites-m.fr/api/routers/default/index/routes?reseaux=${network}`)
  }
  public getLine(line: string): Observable<Line> {
    return this.httpClient.get<Line>(`https://data.mobilites-m.fr/api/routers/default/index/routes?codes=${line}`)
  }
}
