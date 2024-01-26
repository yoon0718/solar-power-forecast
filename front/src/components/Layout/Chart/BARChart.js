import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import axios from 'axios';
import zoomPlugin from 'chartjs-plugin-zoom';
Chart.register(zoomPlugin);

const BARChart = (props) => {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    const fetchData = async () => {
      try {
        let url = '';
        if (props.selectedDate <= '20230531') {
          url = `http://10.10.21.86:8080/locgendata?loc=${props.location}&date=${props.selectedDate}`;
        } else {
          url = `http://10.10.21.86:8000/xgb/?loc=${props.location}&date=${props.selectedDate}`;
        }
        const response = await axios.post(url);
        const data = response.data;
        const max = data.pop();
        console.log(response);
        createChart(data, max.Max);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const createChart = (data, max) => {
      const labels = data.map((item) => (item.TM % 10000) / 100); // x 축 데이터 (TM 필드)
      const values = data.map((item) => item.value); // y 축 데이터 (value 필드)

      let max_value = max - (max % 10 ** Math.floor(Math.log10(max))) + 10 ** Math.floor(Math.log10(max));

      Chart.register(...registerables);

      let tempChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: '전력생산량(Wh)',
              data: values,

              backgroundColor: '#86B6F6'
            }
          ]
        },
        options: {
          plugins: {
            title: {
              display: true
            },
            zoom: {
              zoom: {
                wheel: {
                  enabled: true
                },
                pinch: {
                  enabled: true
                },
                mode: 'xy',
                drag: {
                  enabled: true
                }
              }
            },
            legend: {
              labels: {
                font: {
                  size: 15
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
              max: max_value,
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

export default BARChart;
