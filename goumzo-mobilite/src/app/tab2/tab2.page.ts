import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Line } from '../line';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  lines: Line[] = [];

  ionViewDidEnter(){
    this.api.getLines("FLEXO").subscribe((data:any) => {
      data.forEach((line: Line) => {
        this.lines.push(line);
      })
      console.log(this.lines)
    })
  }

  constructor(private api: ApiService) {}

}
