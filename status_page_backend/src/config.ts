import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  uptimeRobotReadonlyKey: string;
  pageName: string;
  url: string;
}

const config = (): EnvConfig => {
  return {
    uptimeRobotReadonlyKey: process.env.UPTIME_ROBOT_READONLY_KEY,
    pageName: process.env.PAGE_NAME,
    url: process.env.URL,
  };
};

export default config;
