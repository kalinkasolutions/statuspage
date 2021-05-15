import { Router, Request, Response } from "express";
import config from "../../config";
import request from "request";
import ApiResponse from "../../types/ApiResponse";
import UptimeRobotResponse from "../../types/UptimeRobotResponse";
import UptimeRobotMonitor from "../../types/UptimeRobotMonitor";

enum Status {
  Paused = 0,
  NotCheckedYet = 1,
  Up = 2,
  SeemsDown = 8,
  Down = 9,
}

export enum OverallStatus {
  Up = 1,
  SomeDown = 2,
  Down = 3,
}

const getCustomUptimeRanges = () => {
  var ranges = [];
  for (var i = 90; i >= 0; i--) {
    var current = new Date();
    current.setHours(0);
    current.setMinutes(0);
    current.setSeconds(0);
    current.setMilliseconds(0);
    current.setDate(current.getDate() - i);
    var start = new Date(current);
    start.setDate(start.getDate() - 1);
    var end = new Date(current);
    ranges.push(`${start.getTime() / 1000}_${end.getTime() / 1000}`);
  }
  return ranges.join("-");
};

const getOverallStatus = (monitors: UptimeRobotMonitor[]): OverallStatus => {
  monitors = monitors.filter(
    (m) => m.status !== Status.Paused && m.status !== Status.NotCheckedYet
  );
  const up = monitors.filter((m) => m.status === Status.Up).length;
  const down = monitors.filter(
    (m) => m.status === Status.Down || m.status === Status.SeemsDown
  ).length;
  if (down === 0 && up > 0) {
    return OverallStatus.Up;
  } else if (down > 0 && up > 0) {
    return OverallStatus.SomeDown;
  }
  return OverallStatus.Down;
};

const options = {
  method: "POST",
  url: "https://api.uptimerobot.com/v2/getMonitors",
  headers: {
    "cache-control": "no-cache",
    "content-type": "application/json",
  },
  form: {
    api_key: config().uptimeRobotReadonlyKey,
    custom_uptime_ranges: getCustomUptimeRanges(),
    custom_uptime_ratios: 90,
    format: "json",
  },
};

export default Router().get(
  "/stats",
  async (req: Request, res: Response<ApiResponse>): Promise<void> => {
    try {
      const body = await getUptemeRobotMonitors();
      const response: ApiResponse = {
        overAllStatus: getOverallStatus(body.monitors),
        statusPageName: config().pageName,
        monitors: body.monitors.map((m) => ({
          custom_down_durations: Number(m.custom_down_durations),
          custom_uptime_ranges: m.custom_uptime_ranges
            .split("-")
            .map((ur) => Number(ur)),
          custom_uptime_ratio: Number(m.custom_uptime_ratio),
          friendly_name: m.friendly_name,
          interval: m.interval,
          status: m.status,
          url: m.url,
        })),
      };
      res.send(response);
    } catch (e) {
      res.sendStatus(503);
    }
  }
);

const getUptemeRobotMonitors = async (): Promise<UptimeRobotResponse> => {
  return new Promise((res, rej) => {
    request(options, (error, response, body) => {
      if (error) {
        console.log(error);
        rej(error);
      }
      res(JSON.parse(body));
    });
  });
};
