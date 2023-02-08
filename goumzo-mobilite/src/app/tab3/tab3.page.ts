import { Component } from '@angular/core';
import * as L from 'leaflet';
import { ApiService } from '../api.service';
import { Line } from '../line';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  map!: L.Map;

  constructor(private api: ApiService) { }

  ionViewDidEnter(){
    this.map = L.map('map').setView([45.192655, 5.718039], 30);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright%22%3EOpenStreetMap</a> contributors'
    }).addTo(this.map);


    this.api.getLines("TRAM").subscribe((data:any) => {
      console.log(data);
      data.forEach((line: Line) => {

        //console.log(line.id.split(":")[0] + "_" + line.id.split(":")[1])

        this.api.getLineGeometry(line.id.split(":")[0] + "_" + line.id.split(":")[1]).subscribe((data:any) => {
          data.features[0].geometry.coordinates[0].forEach((element: any[]) => {
            element.reverse();
          });

          console.log(line.color)
          var polylinePoints = L.polyline(
            data.features[0].geometry.coordinates[0],
            {color: `#${line.color}`}
          ).addTo(this.map);
        })
      })
    })




    
    console.log("ok")
  }
  

}
