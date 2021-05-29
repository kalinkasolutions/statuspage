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

const getCustomUptimeRanges = (requestDate: Date) => {
  const ranges = [];
  for (let i = 90; i >= 0; i--) {
    const current = new Date(requestDate);
    current.setDate(current.getDate() - i);
    const start = new Date(current);
    start.setDate(start.getDate() - 1);
    const end = new Date(current);
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

const getOptions = (requestDate: Date) => {
  return {
    method: "POST",
    url: "https://api.uptimerobot.com/v2/getMonitors",
    headers: {
      "cache-control": "no-cache",
      "content-type": "application/json",
    },
    form: {
      api_key: config().uptimeRobotReadonlyKey,
      custom_uptime_ranges: getCustomUptimeRanges(requestDate),
      custom_uptime_ratios: 90,
      format: "json",
    },
  };
};

export default Router().get(
  "/stats",
  async (req: Request, res: Response<ApiResponse>): Promise<void> => {
    try {
      const requestDate = new Date();
      const body = await getUptemeRobotMonitors(requestDate);
      const response: ApiResponse = {
        overAllStatus: getOverallStatus(body.monitors),
        statusPageName: config().pageName,
        monitors: body.monitors.map((m) => ({
          custom_down_durations: Number(m.custom_down_durations),
          custom_uptime_ranges: m.custom_uptime_ranges
            .split("-")
            .map((ur, i) => {
              const date = new Date(requestDate);
              date.setDate(date.getDate() + i - 90);
              return {
                ratio: Number(ur),
                dateTime: date.toISOString(),
              };
            }),
          custom_uptime_ratio: Number(Number(m.custom_uptime_ratio).toFixed(2)),
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

const getUptemeRobotMonitors = async (
  requestDate: Date
): Promise<UptimeRobotResponse> => {
  return new Promise((res, rej) => {
    request(getOptions(requestDate), (error, response, body) => {
      if (error) {
        console.log(error);
        rej(error);
      }
      res(JSON.parse(body));
    });
  });
};
