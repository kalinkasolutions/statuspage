import UptimeMonitor from "../../types/UptimeMonitor";
import { getCurrentStatus, Status } from "../../Util/StatusHelper";
import "./Footer.css"

interface FooterProps {
  monitors: UptimeMonitor[];
}

const Footer: React.FC<FooterProps> = props => {

  const { monitors } = props;

  return (
    <footer>
      <div><span>Total </span><span>{monitors.length}</span></div>
      <div><span>Up </span><span style={getCurrentStatus(Status.Up, "color")}>{monitors.filter(m => m.status === Status.Up).length}</span></div>
      <div><span>Down </span><span style={getCurrentStatus(Status.Down, "color")}>{monitors.filter(m => m.status === Status.Down).length}</span></div>
      <div><span>Paused </span><span style={getCurrentStatus(Status.Paused, "color")}>{monitors.filter(m => m.status === Status.Paused).length}</span></div>
    </footer>
  )
}
export default Footer