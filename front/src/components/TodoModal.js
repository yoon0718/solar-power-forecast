import React, { useEffect, useState } from 'react';
import './css/Modal.css';

export default function TodoModal() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  useEffect(() => {
    if (document.querySelector('#detail') === null) {
      document.querySelectorAll('.sc-blmEgr')[1].innerHTML +=
        '<button id="detail" className="btn-modal">용어 설명</button>';
      document.querySelector('#detail').addEventListener('click', toggleModal);
    }
  }, []);

  return (
    <div>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <p>📖 차트</p>
            <p>
              수증기압 : 공기중에 존재하는 수증기의 압력. 수증기압이 높을수록 수증기가 많아지고, 구름이 생성될 수 있다.
            </p>
            <p>시정 : 공기의 혼탁한 정도를 나타내는 척도의 하나로 사용된다. </p>
            <p>
              상대습도: 공기 중에 존재하는 수증기의 양을 공기가 수증기를 최대로 보유할 수 있는 양에 대한 비율로 나타낸
              것. 백분율을 10으로 더 나눠서 천분율로 표기 했다.
            </p>
            <p>📖 표</p>
            <p>해면기압 : 어떤 관측지점에서 관측된 관측소 기압에 해면경정을 하여 얻은 평균해수면 높이에서의 기압</p>

            <p>이슬점온도 : 상대 습도가 100%가 될 때의 온도</p>
            <p>수증기압 : 수증기 분자가 가하는 압력</p>
            <p>전운량 : 모든 구름이 하늘을 덮고 있는 부분에 대한 10분수</p>
            <p>중하층운량 : 해발고도 1,000m~5,000m 사이에 위치한 구름이 하늘을 덮고 있는 구름에 대한 10분수</p>
            <p>일조량 : 일정한 물체나 땅의 겉면에 비치는 태양 광선의 양</p>
            <p>일사량 : 태양으로부터 오는 태양 복사 에너지가 지표에 닿는 양[max=1]</p>
            <p>
              * 해면경정 : 각 지역에서 측정한 기압을 같은 고도에서 측정한 기압으로 환산하여 해면 상의 기압 값으로
              바꾸어주는 것👍
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
