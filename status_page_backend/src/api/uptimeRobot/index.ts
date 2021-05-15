import { Router } from "express";
import uptimeRobot from "./uptimeRobot";

export default Router().get("/stats", uptimeRobot);
