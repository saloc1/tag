import { Component } from '@angular/core';
import { Cluster } from '../cluster';
import * as L from 'leaflet';
import { ApiService } from '../api.service';
import { Line } from '../line';
import { Stop } from '../stop';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  map!: L.Map;
  networks: string = "TRAM,CHRONO,FLEXO,PROXIMO";
  lines: Line[] = [];
  displayTram: boolean = true;
  displayChrono: boolean = true;
  displayFlexo: boolean = true;
  displayProximo: boolean = true;

  constructor(private api: ApiService) { }

  ionViewDidEnter(){
    this.map = L.map('map').setView([45.192655, 5.718039], 30);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright%22%3EOpenStreetMap</a> contributors'
    }).addTo(this.map);


    this.displayLines();

  }

  toggleTram(){
    this.lines.forEach(element => {
      if(element.mode == "TRAM"){
        if(this.displayTram){
          element.polyline.setStyle({opacity: 0})
        } else {
          element.polyline.setStyle({opacity: 100})
        }
      }
    });
    this.displayTram = !this.displayTram;
  }

  toggleChrono(){
    this.lines.forEach(element => {
      if(element.type == "CHRONO"){
        if(this.displayChrono){
          element.polyline.setStyle({opacity: 0})
        } else {
          element.polyline.setStyle({opacity: 100})
        }
      }
    });
    this.displayChrono = !this.displayChrono;
  }

  toggleProximo(){
    this.lines.forEach(element => {
      if(element.type == "PROXIMO"){
        if(this.displayProximo){
          element.polyline.setStyle({opacity: 0})
        } else {
          element.polyline.setStyle({opacity: 100})
        }
      }
    });
    this.displayProximo = !this.displayProximo;
  }

  toggleFlexo(){
    this.lines.forEach(element => {
      if(element.type == "FLEXO"){
        if(this.displayFlexo){
          element.polyline.setStyle({opacity: 0})
        } else {
          element.polyline.setStyle({opacity: 100})
        }
      }
    });
    this.displayFlexo = !this.displayFlexo;
  }


  
  displayLines(){
    this.api.getLines(this.networks).subscribe((data:any) => {
      console.log(data);
      data.forEach((line: Line) => {

        //console.log(line.id.split(":")[0] + "_" + line.id.split(":")[1])

        this.api.getLineGeometry(line.id.split(":")[0] + "_" + line.id.split(":")[1]).subscribe((data:any) => {
          data.features[0].geometry.coordinates[0].forEach((element: any[]) => {
            element.reverse();
          });

          var polylinePoints = L.polyline(
            data.features[0].geometry.coordinates[0],
            {color: `#${line.color}`}
          ).addTo(this.map);
          line.polyline = polylinePoints;
          console.log(line.polyline)
        })
        if(line.mode == "TRAM"){
          this.api.getClusters(line.id).subscribe((data:any) => {
            line.clusters = data;
            line.clusters.forEach((cluster: Cluster) => {
              L.marker([cluster.lat, cluster.lon]).addTo(this.map);
          })
            console.log(line.stops);
          })
        }


        this.lines.push(line);
      })
    })
  }
}
