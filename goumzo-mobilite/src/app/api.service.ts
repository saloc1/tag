import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cluster } from './cluster';
import { Line } from './line';
import { RealTime } from './real-time';
import { Stop } from './stop';

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

  public getStops(line: String): Observable<Stop[]> {
    return this.httpClient.get<Stop[]>(`https://data.mobilites-m.fr/api/routers/default/index/routes/${line}/stops`)
  }

  public getClusters(line: String): Observable<Cluster[]> {
    return this.httpClient.get<Cluster[]>(`https://data.mobilites-m.fr/api/routers/default/index/routes/${line}/clusters`)
  }

  public getTimes(line: string, cluster: string): Observable<RealTime[]> {
    return this.httpClient.get<RealTime[]>(`https://data.mobilites-m.fr/api/routers/default/index/clusters/${cluster}/stoptimes?route=${line}`)
  }
}
