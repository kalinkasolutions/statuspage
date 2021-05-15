export default interface UptimeRobotMonitor {
  friendly_name: string;
  url: string;
  interval: number;
  status: number;
  custom_uptime_ratio: string;
  custom_uptime_ranges: string;
  custom_down_durations: string;
}
