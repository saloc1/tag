import { Cluster } from "./cluster";
import { Stop } from "./stop";

export interface Line {
    id: string;
    shortName: string;
    longName: string;
    color: string;
    textColor: string;
    mode: string;
    type: string;
    polyline: any;
    stops: Stop[];
    clusters: Cluster[];
}
