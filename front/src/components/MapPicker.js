import React, { useEffect, useState } from 'react';

export default function MapPicker(props) {
  useEffect(() => {
    const handleClick = (event) => {
      const clickedPath = event.target.getAttribute('name');
      sessionStorage.setItem('location', clickedPath);
      props.setLocation(clickedPath);
    };

    const mapPaths = document.querySelectorAll('path');
    mapPaths.forEach((path) => {
      path.addEventListener('click', handleClick);
    });

    return () => {
      mapPaths.forEach((path) => {
        path.removeEventListener('click', handleClick);
      });
    };
  }, []);

  return (
    <div className="MapPicker">
      <p>지역 : {props.location}</p>
      <p>날짜 : {props.selectedDate}</p>
    </div>
  );
}
