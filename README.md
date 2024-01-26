# solar-power-forecast

yoon0718(PL), Jssong-ho, raincross7, portk, azure0321

### Project Introduction
햇살이따땃하조 / This project is Photovoltaic power generation prediction model

### Main Function
1. 기상청 API 및 한국전력거래소 API 연동:
- 기상청 API를 활용하여 지역별 기상 데이터를 수집합니다.
- 한국전력거래소 API를 이용하여 지역별 태양광 발전량 데이터를 획득합니다.
2. 데이터 전처리:
- 수집한 기상 데이터와 태양광 발전량 데이터를 전처리하여 분석에 적합한 형태로 가공합니다.
3. XGBoost 모델 구축:
- XGBoost의 xgbregressor를 활용하여 지역별로 독립적인 발전량 예측 모델을 생성합니다.
- 지역마다 태양광 발전기의 개수와 최대 발전량을 반영하여 정확한 예측을 위해 지역 특성을 고려합니다.
4. 웹 인터페이스 개발:
- Django와 React를 사용하여 웹 페이지를 구축합니다.
- 웹 페이지에서는 한국 지도 이미지를 통해 지역을 선택할 수 있습니다.
선택한 지역과 날짜에 따라 예측된 태양광 발전량을 그래프와 표로 시각화하여 제공합니다.
5. 사용자 편의성:
- 사용자는 지도에서 원하는 지역을 선택하고 날짜를 지정하여 쉽게 데이터를 조회할 수 있습니다.
- 그래프와 표를 통해 시각적으로 데이터를 확인할 수 있어 사용자 편의성을 고려했습니다.

### License
이 프로젝트는 MIT 라이센스에 따라 배포됩니다. 자세한 내용은 [LICENSE](LICENSE)를 참조하세요.

---

💻**Programming Language**
<img src="https://img.shields.io/badge/python-3776AB?style=for-the-badge&logo=python&logoColor=white">
<img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=openjdk&logoColor=white">
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/css3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white">

🪛**Development environment and Tools**
<img src="https://img.shields.io/badge/visualstudiocode-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white">
<img src="https://img.shields.io/badge/anaconda-44A833?style=for-the-badge&logo=anaconda&logoColor=white">

🕸️**Web development and Frameworks**
<img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white">

🌐**Databases**
<img src="https://img.shields.io/badge/mariadb-003545?style=for-the-badge&logo=mariadb&logoColor=white">

🔢**Data analysis library**
<img src="https://img.shields.io/badge/scikitlearn-F7931E?style=for-the-badge&logo=scikitlearn&logoColor=white">
<img src="https://img.shields.io/badge/tensorflow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white">
<img src="https://img.shields.io/badge/keras-D00000?style=for-the-badge&logo=keras&logoColor=white">

⚛️**Library**
<img src="https://img.shields.io/badge/chartdotjs-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white">
