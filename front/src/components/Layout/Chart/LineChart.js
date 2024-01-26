import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import axios from 'axios';
import zoomPlugin from 'chartjs-plugin-zoom';
Chart.register(zoomPlugin);

const LineChart = (props) => {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    const fetchData = async () => {
      try {
        const response = await axios.post(
          `http://10.10.21.86:8080/locweatherdata?loc=${props.location}&date=${props.selectedDate}`
        );
        const data = response.data;

        createChart(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const createChart = (data) => {
      const labels = data.map((item) => (item.TM % 10000) / 100); // x 축 데이터 (TM 필드)
      const wsValues = data.map((item) => item.WS); //y축들
      const ssValues = data.map((item) => item.SS);
      const siValues = data.map((item) => item.SI);
      const hmValues = data.map((item) => item.HM / 10);
      const pvValues = data.map((item) => item.PV);
      const tsValues = data.map((item) => item.TS);
      const taValues = data.map((item) => item.TA);
      const tdValues = data.map((item) => item.TD);
      const vsValues = data.map((item) => item.VS / 100);

      Chart.register(...registerables);

      let tempChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: '기온 (°C)',
              data: taValues,
              backgroundColor: 'red',
              borderColor: 'rgba(255, 0, 0,0.3)',
              pointRadius: 4.7
            },
            {
              label: '이슬점온도 (°C)',
              data: tdValues,
              backgroundColor: 'rgba(43, 240, 100,0.3)',
              borderColor: 'rgba(43, 240, 100,0.3)',
              pointRadius: 4.7
            },
            {
              label: '풍속 (m/s)',
              data: wsValues,
              backgroundColor: 'black',
              borderColor: 'rgba(0, 0, 0,0.3)',
              pointRadius: 4.7
            },
            {
              label: '일조량 (hr)',
              data: ssValues,
              backgroundColor: 'orange',
              borderColor: 'rgba(255, 165, 0,0.5)',
              pointRadius: 4.7
            },
            {
              label: '일사량 (MJ/m²)',
              data: siValues,
              backgroundColor: 'rgba(165, 42, 42,0.8)',
              borderColor: 'rgba(165, 42, 42,0.8)',
              pointRadius: 4.7
            },
            {
              label: '상대습도 (‰) (천분율)',
              data: hmValues,
              backgroundColor: 'green',
              borderColor: 'rgba(0, 128, 0,0.3)',
              pointRadius: 4.7
            },
            {
              label: '수증기압 (hPa)',
              data: pvValues,
              backgroundColor: 'blue',
              borderColor: 'rgba(0, 0, 255,0.5)',
              pointRadius: 4.7
            },
            {
              label: '지면 온도 (°C)',
              data: tsValues,
              backgroundColor: 'darkblue',
              borderColor: 'rgba(0, 0, 139,0.3)',
              pointRadius: 4.7
            },
            {
              label: '시정 (1km)',
              data: vsValues,
              backgroundColor: 'purple',
              borderColor: 'rgba(128, 0, 128, 0.3)',
              pointRadius: 4.7
            }
          ]
        },
        options: {
          plugins: {
            zoom: {
              zoom: {
                wheel: {
                  enabled: true
                },
                pinch: {
                  enabled: true
                },
                mode: 'xy'
              }
            },
            title: {
              display: true,
              response: false
            },
            legend: {
              labels: {
                font: {
                  size: 13
                }
              }
            }
          },
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: '시간'
                // font: { size: 20, weight: 'bold' }
              },
              ticks: {
                font: {
                  size: 15
                }
              }
            },
            y: {
              beginAtZero: true,
              display: true,
              title: {
                display: true
              },
              ticks: {
                font: {
                  size: 15
                }
              }
            }
          }
        }
      });

      setChartInstance(tempChartInstance);
    };

    const destroyChart = () => {
      if (chartInstance) {
        chartInstance.destroy();
        setChartInstance(null);
      }
    };

    destroyChart();
    fetchData();

    return () => {
      destroyChart();
    };
  }, [props.location, props.selectedDate]);

  return (
    <div className="BARChart">
      <canvas ref={chartRef} />
    </div>
  );
};

export default LineChart;
