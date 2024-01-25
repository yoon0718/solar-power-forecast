package com.example.sprint_2.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.example.sprint_2.dao.GeneratorDao;
import com.example.sprint_2.dao.WeatherDao;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@CrossOrigin(origins = "*")
public class GenerateDataInfoController {
    @Autowired
    GeneratorDao generatorDao;
    @Autowired
    WeatherDao weatherDao;

    // 수집한 발전량 데이터 POST매핑
    @PostMapping("/locgendata")
    public List<Map<String,Object>> locGenerate(
        @RequestParam String loc,
        @RequestParam String date
    ) {
        // JDBC를 통해 데이터를 가져온다
        List<Map<String,Object>> data = generatorDao.select(loc,date);
        // 데이터 끝에 그래프를 정돈하기 위한 최대값을 붙여서 보내준다
        data.add(generatorDao.selectMax(loc, date).get(0));
        return data;
    }

    // 날씨 데이터 POST 매핑
    @PostMapping("/locweatherdata")
    public List<Map<String,Object>> locWeather(
        @RequestParam String loc,
        @RequestParam String date
        ) {
            //받은 날짜에 시간영역을 추가하여 인덱싱을 위한 기준으로 만든다.
            String start = date + "0000";
            String end = date + "2300";

            // 지역, 날짜를 기준으로 하여 데이터를 가져와 보내준다.
            return weatherDao.selectbyloc(loc,start,end);
    }
    
    
    
}
