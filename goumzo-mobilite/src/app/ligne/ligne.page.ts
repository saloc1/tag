import { Component, OnInit } from '@angular/core';
import { Cluster } from '../cluster';
import { ApiService } from '../api.service';
import { Line } from '../line';
import { Stop } from '../stop';
import { RealTime } from '../real-time';
import { format, relative } from 'path';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ligne',
  templateUrl: './ligne.page.html',
  styleUrls: ['./ligne.page.scss'],
})
export class LignePage implements OnInit {
  lineId: string = "";
  clusters: Cluster[] = [];

  constructor(private api: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.lineId = params["lineId"]
    });

    this.api.getClusters(this.lineId).subscribe((data:any) => {
      data.forEach((cluster: Cluster) => {
        cluster.stopTimes = [];
        this.api.getTimes(this.lineId, cluster.code).subscribe((data:RealTime[]) => {
          data.forEach((realTime: RealTime) => {
            realTime.times.forEach((time) => {
              time.relativeTime = (time.scheduledArrival + time.serviceDay) - (Date.now()/1000);
              if(time.relativeTime < 60){
                time.formattedTime = "< 1 min";
              } else {
                time.formattedTime = `${Math.round(time.relativeTime/60)} min`
              }
            })
            cluster.stopTimes.push(realTime);
          })
          console.log(cluster.stopTimes);
        })
        this.clusters.push(cluster);
      })
    })
    console.log(this.clusters)
  }

}
