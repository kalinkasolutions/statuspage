import { getStatusColor } from "../../Util/StatusHelper";
import "./RangeItems.css";

interface RangeItemProps {
  uptimeRanges: number[];
}

const RangeItems: React.FC<RangeItemProps> = (props) => {

  const { uptimeRanges } = props;

  return (
    <div className="rangeContainer">
      {
        uptimeRanges.map((ur, i) => (
          <div className="rangeItem" style={getStatusColor(ur, "backgroundColor")} key={`ri_${i}`} title={`${ur}%`}></div>
        ))
      }
    </div>
  )
}

export default RangeItems;