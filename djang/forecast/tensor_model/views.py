from django.shortcuts import render
from .models import MeanWeather
import tensorflow.keras.models as models
import numpy as np
import pandas as pd

#cors Error를 방지하기 위한 데코레이터 import
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

#Json형태로 response해주기 위한 클래스 import
from django.http.response import JsonResponse

# Create your views here.

#model을 읽어오는 것을 함수화 한 것
def read_model(model_name):
    model = models.load_model(f'./tensor_model/models/{model_name}.h5')
    return model

#cors Error를 방지하기 위해 데코레이터를 달았다
@method_decorator(csrf_exempt, name="data_sheet")
def tensor_predict(request):
    #query를 받기 위한 코드
    location = request.GET.get("loc")
    date = request.GET.get("date")
    
    # 쿼리로 받은 주소를 모델 파일명으로 변환하기 위한 딕셔너리
    # 한글 파일명은 오류가 난다.
    model_dict = {
        "강원": "Gangwon_model",
        "경기": "Gyeonggi_model",
        "경남": "Gyeongnam_model",
        "경북": "Gyeongbuk_model",
        "광주": "Gwangju_model",
        "대구": "Deagu_model",
        "대전": "Deajeon_model",
        "부산": "Busan_model",
        "서울": "Seoul_model",
        "세종": "Sejong_model",
        "울산": "Ulsan_model",
        "인천": "Incheon_model",
        "전남": "Jeonnam_model",
        "전북": "Jeonbuk_model",
        "제주": "Jeju_model",
        "충남": "Chungnam_model",
        "충북": "Chungbuk_model"
    }
    
    # 요청받은 날짜의 시간범위 설정
    date = int(date+"0000")
    start_tm = date
    end_tm = date+2300
    
    # db에서 데이터 로드해오기
    # 아래의 filter문은 아래의 쿼리문과 같다
    # SELECT * FROM mean_weather WHERE LOC=입력받은지역 AND TM <= end_tm AND TM >= start_tm    #end_tm과 start_tm은 위에서 지정한 값
    input_data_raw = MeanWeather.objects.filter(loc=location, tm__lte=end_tm, tm__gte=start_tm)
    # 객체에서 값 꺼내기
    input_data_raw_list=input_data_raw.values_list()
    # 아래와 내용이 같지만 위의 객체에서 한번 더 골라낸다.
    # SELECT * FROM mean_weather WHERE LOC=입력받은지역 AND TM <= end_tm AND TM > start_tm AND SS > 0
    input_data = input_data_raw.filter(ss__gt=0)
    # 객체에서 값 꺼내기
    input_data_list = input_data.values_list()
    
    # 가져온 데이터가 있는지 확인
    if input_data_raw.count() > 0:
        model = read_model(model_dict[location])
        # 모델 학습때와 모양을 맞추기 위해서 컬럼을 골라낸다.
        refined_data = pd.DataFrame(input_data.values())[["wd","ss","si","hm","pv","ts","vs"]]
        # 골라낸 데이터를 이용하여 예측
        predict_value=model.predict(refined_data)
    else:
        # 가져온 데이터가 없다면 예측값을 모두 0으로 설정
        input_data_raw_list=np.zeros((24,))
        # 따라서 예측값도 0으로 설정
        predict_value=np.zeros((1,))
        
    #묶기 위한 시간대 준비
    timeline=range(start_tm, end_tm+100, 100)
    
    # 리턴용 데이터 준비
    value=[]
    cnt=0
    
    # 예측값에 구멍이 있는지 없는지 확인하여 구멍은 0으로 채워주기
    for val in input_data_raw_list:
        if val not in input_data_list:
            value.append(0)
        else:
            value.append(predict_value[cnt][0])
            cnt += 1
            
    # 프론트에서 사용하는 데이터 형식에 맞춰 json 형태로 준비
    result = [{"LOC":location,"TM":time, "value":float(val)} for time, val in zip(timeline,value)]
    result.append({"Max":float(predict_value.max())})

    # json 형태로 결과 리턴
    return JsonResponse(result,safe=False)
