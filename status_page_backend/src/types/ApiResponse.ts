import UptimeMonitor from "./UptimeMonitor";

export default interface ApiResponse {
  overAllStatus: number;
  statusPageName: string;
  monitors: UptimeMonitor[];
}
