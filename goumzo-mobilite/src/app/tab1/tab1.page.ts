import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
    constructor() {}
  public data = ['Amsterdam', 'Buenos Aires', 'Cairo', 'Geneva', 'Hong Kong', 'Istanbul', 'London', 'Madrid', 'New York', 'Panama City'];
  public results = [...this.data];

  handleChange(event:any) {
    if (event.target.value != "") {
      const query = event.target.value.toLowerCase();
      this.results = this.data.filter(d => d.toLowerCase().indexOf(query) > -1);
    } else {
      this.results = [];
    }
  }


}
