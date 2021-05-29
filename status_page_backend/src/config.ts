import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  uptimeRobotReadonlyKey: string;
  pageName: string;
}

const config = (): EnvConfig => {
  return {
    uptimeRobotReadonlyKey: process.env.UPTIME_ROBOT_READONLY_KEY,
    pageName: process.env.PAGE_NAME,
  };
};

export default config;
