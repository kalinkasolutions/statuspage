import UptimeRatio from "./UptimeRatio";

export default interface UptimeMonitor {
  friendly_name: string;
  url: string;
  interval: number;
  status: number;
  custom_uptime_ratio: number;
  custom_uptime_ranges: UptimeRatio[];
  custom_down_durations: number;
}
