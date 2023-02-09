import { RealTime } from "./real-time";
import { Time } from "./time";

export interface Cluster {
    id: string;
    code: string;
    name: string;
    lat: number;
    lon: number;
    stopTimes: RealTime[];
}
