from django.shortcuts import render
from .models import MeanWeather
from xgboost import XGBRegressor
import pandas as pd

# Create your views here.
def xgb_predict(request):
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
    input_data_raw = MeanWeather.objects.filter(loc=location, tm__lte=end_tm, tm__gte=start_tm)
    input_data = input_data_raw.filter(ss__gt=0)
    model = XGBRegressor()
    model.load_model(f'./XGB_model/models/{model_dict[location]}.json')
    refined_data = pd.DataFrame(input_data.values())[["ws","ta","td","hm","pv","vs","ss","si","ts"]]
    data = {"result":model.predict(refined_data)}
    
    return render(request, "screen.html", data)