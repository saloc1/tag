import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Line } from '../line';
import { Cluster } from '../cluster';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tramLines: Line[] = [];
  chronoLines: Line[] = [];
  flexoLines: Line[] = [];
  proximoLines: Line[] = [];

  ngOnInit(){
    this.api.getLines("TRAM").subscribe((data:any) => {
      data.forEach((line: Line) => {
        this.tramLines.push(line);
      })
    })

    this.api.getLines("CHRONO").subscribe((data:any) => {
      data.forEach((line: Line) => {
        this.chronoLines.push(line);
      })
    })
    
    this.api.getLines("PROXIMO").subscribe((data:any) => {
      data.forEach((line: Line) => {
        this.proximoLines.push(line);
      })
    })

    this.api.getLines("FLEXO").subscribe((data:any) => {
      data.forEach((line: Line) => {
        this.flexoLines.push(line);
      })
    })
  }

  lineDetails(event: { target: any; srcElement: any; currentTarget: any; }){
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
    console.log(value);
    this.navController.navigateForward("ligne", {
      queryParams:{
        lineId: value
      }
    });
  }

  constructor(private api: ApiService, private navController: NavController) {}

}
