import { CSSProperties } from "react";

export enum Status {
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

export function getStatusColor(
  urPercentage: number,
  propertyName: "backgroundColor" | "color"
): CSSProperties {
  const style: CSSProperties = {};
  if (Number(urPercentage) === 0) {
    style[propertyName] = "lightgrey";
  } else if (Number(urPercentage) >= 90) {
    style[propertyName] = "#3BD671";
  } else if (Number(urPercentage) < 50) {
    style[propertyName] = "rgb(255, 0, 0)";
  } else {
    style[propertyName] = "rgb(255, 165, 0)";
  }
  return style;
}

export function getCurrentStatus(
  status: Status,
  propertyName: "backgroundColor" | "color"
): CSSProperties {
  const style: CSSProperties = {};
  switch (status) {
    case Status.Paused:
    case Status.NotCheckedYet:
      style[propertyName] = "lightgrey";
      break;
    case Status.Up:
      style[propertyName] = "#3BD671";
      break;
    case Status.Down:
      style[propertyName] = "rgb(255, 0, 0)";
      break;
    case Status.SeemsDown:
      style[propertyName] = "rgb(255, 165, 0)";
      break;
  }
  return style;
}

export function getOverallStatusPreText(status: OverallStatus): string {
  switch (status) {
    case OverallStatus.Down:
    case OverallStatus.Up:
      return "All systems ";
    case OverallStatus.SomeDown:
      return "Some systems ";
  }
}

export function getOverallStatusPostText(status: OverallStatus): string {
  switch (status) {
    case OverallStatus.Down:
      return "down";
    case OverallStatus.Up:
    case OverallStatus.SomeDown:
      return "operational";
  }
}

export function getCurrentOverallStatus(
  status: OverallStatus,
  propertyName: "backgroundColor" | "color"
): CSSProperties {
  const style: CSSProperties = {};
  switch (status) {
    case OverallStatus.Up:
      style[propertyName] = "#3BD671";
      break;
    case OverallStatus.Down:
      style[propertyName] = "rgb(255, 0, 0)";
      break;
    case OverallStatus.SomeDown:
      style[propertyName] = "rgb(255, 165, 0)";
      break;
  }
  return style;
}

export function getOverallStatusPostColor(status: OverallStatus): string {
  switch (status) {
    case OverallStatus.Down:
      return "down";
    case OverallStatus.Up:
    case OverallStatus.SomeDown:
      return "operational";
  }
}

export function getCurrentStatusText(status: Status): string {
  switch (status) {
    case Status.Paused:
      return "Paused";
    case Status.NotCheckedYet:
      return "Not checked";
    case Status.Up:
      return "Up";
    case Status.Down:
      return "Down";
    case Status.SeemsDown:
      return "Seems Down";
  }
}
