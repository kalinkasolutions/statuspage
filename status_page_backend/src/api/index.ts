import { Router } from "express";
import uptimeRobot from "./uptimeRobot";

export default Router().use("/uptimerobot", uptimeRobot);
