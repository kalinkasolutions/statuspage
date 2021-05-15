import { useEffect, useState } from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
import Monitor from './components/Monitor/Monitor';
import ApiResponse from './types/ApiResponse';
import { getCurrentOverallStatus, getOverallStatusPostText, getOverallStatusPreText } from './Util/StatusHelper';

const App = () => {

  const BASE_URL = "http://localhost:3000";
  const [data, setData] = useState<ApiResponse>({ overAllStatus: 1, statusPageName: "", monitors: [] });

  const getData = async () => {
    const fetchedItems = await fetch(`${BASE_URL}/uptimerobot/stats`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(json => json.json());
    setData(fetchedItems);
  };

  useEffect(() => {
    getData();
  }, []);


  return (
    <>
      <div className="app">
        <header>
          <h1>{data.statusPageName}</h1>
        </header>
        <div className="overallStatusWrapper card">
          <div className="overallStatus" style={getCurrentOverallStatus(data.overAllStatus, "backgroundColor")}></div>
          <h1 className="overallStatusText">
            <span>{getOverallStatusPreText(data.overAllStatus)}</span>
            <span style={getCurrentOverallStatus(data.overAllStatus, "color")}>{getOverallStatusPostText(data.overAllStatus)}</span>
          </h1>
        </div>
        <div className="cardTitle">
          <h2>Uptime <span className="timePeriodHeader">Last 90 days</span></h2>
        </div>
        <div className="monitorWrapper card cardMargin">
          {data.monitors.map((d, i) => (
            <Monitor item={d} key={`mo_${i}`} />
          ))}
        </div>
      </div>
      <div className="footerWrapper">
        <Footer monitors={data.monitors}></Footer>
      </div>
    </>
  );
}

export default App;
