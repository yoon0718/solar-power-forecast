from django.shortcuts import render
from .models import MeanWeather
import tensorflow.keras.models as models
import numpy as np
import pandas as pd
from time import time

# Create your views here.
def read_model(model_name):
    model = models.load_model(f'./tensor_model/models/{model_name}.h5')
    return model

def tensor_predict(request):
    location = request.GET.get("loc")
    date = request.GET.get("date")
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
    
    date = int(date+"0000")
    start_tm = date
    end_tm = date+2300
    model = read_model(model_dict[location])
    input_data_raw = MeanWeather.objects.filter(loc=location, tm__lte=end_tm, tm__gte=start_tm)
    input_data = input_data_raw.filter(ss__gt=0)
    refined_data = pd.DataFrame(input_data.values())[["wd","ss","si","hm","pv","ts","vs"]]
    input_data_raw_list=input_data_raw.values_list()
    input_data_list = input_data.values_list()
    predict_value=model.predict(refined_data)
    
    value=[]
    cnt=0
    for val in input_data_raw_list:
        if val not in input_data_list:
            value.append(0)
        else:
            value.append(predict_value[cnt][0])
            cnt += 1
            
    data = {"result":value}
    
    return render(request,"screen.html",data)
