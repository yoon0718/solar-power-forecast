import axios from 'axios';
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';

export default function Btable(props) {
  const columns = [
    {
      name: '지역',
      selector: (row) => row.LOC,
      width: '80px'
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
      width: '100px'
    },
    {
      name: '풍향',
      selector: (row) => row.WD,
      sortable: true,
      width: '90px'
    },
    {
      name: '풍속',
      selector: (row) => row.WS,
      sortable: true,
      width: '90px'
    },
    {
      name: '현지기압',
      selector: (row) => row.PA,
      sortable: true,
      width: '120px'
    },
    {
      name: '해면기압',
      selector: (row) => row.PS,
      sortable: true,
      width: '120px'
    },
    {
      name: '기온',
      selector: (row) => row.TA,
      sortable: true,
      width: '90px'
    },
    {
      name: '이슬점온도',
      selector: (row) => row.TD,
      sortable: true,
      width: '130px'
    },

    {
      name: '수증기압',
      selector: (row) => row.PV,
      sortable: true,
      width: '120px'
    },
    {
      name: '일강수량',
      selector: (row) => row.RN_DAY,
      sortable: true,
      width: '120px'
    },
    {
      name: '적설량',
      selector: (row) => row.SD_TOT,
      sortable: true,
      width: '100px'
    },
    {
      name: '전운량',
      selector: (row) => row.CA_TOT,
      sortable: true,
      width: '100px'
    },
    {
      name: '중하층운량',
      selector: (row) => row.CA_MID,
      sortable: true,
      width: '140px'
    },
    {
      name: '시야거리',
      selector: (row) => row.VS,
      sortable: true,
      width: '120px'
    },
    {
      name: '일조량',
      selector: (row) => row.SS,
      sortable: true,
      width: '100px'
    },
    {
      name: '일사량',
      selector: (row) => row.SI,
      sortable: true,
      width: '100px'
    },
    {
      name: '지면온도',
      selector: (row) => row.TS,
      sortable: true,
      width: '120px'
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

  useEffect(() => {
    const fetData = async () => {
      axios
        .post(`http://10.10.21.86:8080/locweatherdata?loc=${props.location}&date=${props.selectedDate}`)
        .then((res) => setTestData(res.data))
        .catch((err) => console.log(err));
    };
    fetData();
  }, [props.location, props.selectedDate]);

  const [TestData, setTestData] = useState([]);

  return (
    <div className="Btable" style={{ textAlign: 'center' }}>
      <DataTable
        title="날씨 데이터 "
        columns={columns}
        data={TestData}
        defaultSortFieldId
        pagination
        highlightOnHover
        conditionalRowStyles={conditionalRowStyles}
      />
    </div>
  );
}
