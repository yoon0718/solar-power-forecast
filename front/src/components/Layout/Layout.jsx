import Header from './Header/Header';
import Map from './Map/Map';
import Footer from './Footer/Footer';
import Atable from './Chart/Atable';
import BARChart from './Chart/BARChart';
import Btable from './Chart/Btable';
import MapPicker from '../MapPicker';
import DatePicker from '../DatePicker';
import { useState } from 'react';
import TodoModal from '../TodoModal';
import LineChart from './Chart/LineChart';
import video from '../../../src/back.mp4';
import '../css/chartbtn.css';

const Layout = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(
    `${today.getFullYear()}${
      (today.getMonth() + 1).toString().length < 2 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1
    }${today.getDate()}`
  );
  const [location, setLocation] = useState('서울');
  const [chartType, setChartType] = useState('line');
  const handleChartTypeChange = (chartType) => {
    setChartType(chartType);
  };

  return (
    <div className="layout">
      <div className="backpic">
        <video autoPlay loop muted className="video">
          <source src={video} type="video/mp4" />
        </video>
        <Header />
        <div className="content">
          <div className="MPM">
            <div className="MD">
              <MapPicker location={location} selectedDate={selectedDate} setLocation={setLocation} />
              <DatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            </div>
            <Map />
          </div>
          <div className="chart_btn">
            <button onClick={() => handleChartTypeChange('line')}>line</button>
            <button onClick={() => handleChartTypeChange('bar')}>bar</button>
          </div>
          {chartType === 'line' ? (
            <LineChart selectedDate={selectedDate} location={location} />
          ) : (
            <BARChart selectedDate={selectedDate} location={location} />
          )}
        </div>
        <div className="Table_content">
          <Atable selectedDate={selectedDate} location={location} />
          <div className="BTM">
            <Btable selectedDate={selectedDate} location={location} />
            <TodoModal />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
