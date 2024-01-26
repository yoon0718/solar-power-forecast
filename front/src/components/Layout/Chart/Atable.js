import axios from 'axios';
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';

export default function Atable(props) {
  const columns = [
    {
      name: '지역',
      selector: (row) => row.LOC,

      width: '130px',
      center: true
    },
    {
      name: '시간',
      selector: (row) => {
        const timeString = String(row.TM);
        const hour = timeString.substr(-4, 2);
        const minute = timeString.substr(-2);
        return `${hour}:${minute}`;
      },
      sortable: true,
      width: '100px',
      center: true
    },
    {
      name: '발전량 (Wh)',
      selector: (row) => Math.round(row.value),
      sortable: true,
      width: '150px',
      // center: true
      right: true
    }
  ];

  const conditionalRowStyles = [
    {
      when: (row) => row,
      style: {
        '&:hover': {
          color: 'orange',
          cursor: 'pointer'
        }
      }
    }
  ];

  const customStyles = {
    headCells: {
      style: {}
    },
    cells: {}
  };

  const fetData = async () => {
    try {
      let url = '';
      if (props.selectedDate <= '20230531') {
        url = `http://10.10.21.86:8080/locgendata?loc=${props.location}&date=${props.selectedDate}`;
      } else {
        url = `http://10.10.21.86:8000/xgb/?loc=${props.location}&date=${props.selectedDate}`;
      }
      axios
        .post(url)
        .then((res) => setTestData(res.data))
        .catch((err) => console.log(err));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetData(props.location, props.selectedDate);
  }, [props.location, props.selectedDate]);

  const [TestData, setTestData] = useState([]);

  return (
    <div className="Atable" style={{ textAlign: 'center' }}>
      <DataTable
        title="시간별 전력생산량"
        columns={columns}
        data={TestData.slice(0, -1)}
        defaultSortFieldId
        pagination
        highlightOnHover
        customStyles={customStyles}
        conditionalRowStyles={conditionalRowStyles}
      />
    </div>
  );
}
