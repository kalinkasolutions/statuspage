import UptimeRatio from "../../types/UptimeRatio";
import { getStatusColor } from "../../Util/StatusHelper";
import "./RangeItems.css";

interface RangeItemProps {
  uptimeRanges: UptimeRatio[];
}


const RangeItems: React.FC<RangeItemProps> = (props) => {

  const { uptimeRanges } = props;
  const getTitle = (ur: UptimeRatio, index: number): string => {
    if (index + 1 === uptimeRanges.length) {
      return `${new Date(ur.dateTime).toLocaleString()} - ${ur.ratio}%`;
    }
    return `${new Date(ur.dateTime).toLocaleDateString()} - ${ur.ratio}%`
  }

  return (
    <div className="rangeContainer">
      {
        uptimeRanges.map((ur, i) => (
          <div className="rangeItem" style={getStatusColor(ur.ratio, "backgroundColor")} key={`ri_${i}`} title={getTitle(ur, i)}></div>
        ))
      }
    </div>
  )
}

export default RangeItems;