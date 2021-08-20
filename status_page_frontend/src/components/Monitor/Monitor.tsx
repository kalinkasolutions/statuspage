import RangeItems from "../RangeItem/RangeItems";
import { getCurrentStatus, getCurrentStatusText, getStatusColor } from "../../Util/StatusHelper"
import "./Monitor.css";
import UptimeMonitor from "../../types/UptimeMonitor";

interface MonitorProps {
  item: UptimeMonitor;
}

const Monitor: React.FC<MonitorProps> = (props) => {

  const { item } = props;

  return (
    <div className="monitor">
      <div>{item.friendly_name}</div>
      <div className="uptime">
        <div className="marginRight" style={getStatusColor(item.custom_uptime_ratio, "color")}>{item.custom_uptime_ratio.toFixed(2)}%</div>
        <RangeItems uptimeRanges={item.custom_uptime_ranges} />
        <div className="currentStatus paddingLeft" style={getCurrentStatus(item.status, "backgroundColor")}></div>
        <div className="marginLeft" style={getCurrentStatus(item.status, "color")}>{getCurrentStatusText(item.status)}</div>
      </div>
    </div>
  )
}

export default Monitor;