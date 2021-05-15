export default interface UptimeMonitor {
  friendly_name: string;
  url: string;
  interval: number;
  status: number;
  custom_uptime_ratio: number;
  custom_uptime_ranges: number[];
  custom_down_durations: number;
}
