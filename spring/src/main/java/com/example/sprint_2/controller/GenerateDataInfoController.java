package com.example.sprint_2.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.example.sprint_2.dao.GeneratorDao;
import com.example.sprint_2.dao.WeatherDao;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@CrossOrigin(origins = "*")
public class GenerateDataInfoController {
    @Autowired
    GeneratorDao generatorDao;
    @Autowired
    WeatherDao weatherDao;

    @GetMapping("/locgendata")
    public List<Map<String,Object>> locGenerate(
        @RequestParam String loc,
        @RequestParam String date
    ) {
        List<Map<String,Object>> data = generatorDao.select(loc,date);
        data.add(generatorDao.selectMax(loc, date).get(0));
        return data;
    }

    @GetMapping("/locweatherdata")
    public List<Map<String,Object>> locWeather(
        @RequestParam String loc,
        @RequestParam String date
        ) {
            String start = date + "0000";
            String end = date + "2300";
            return weatherDao.selectbyloc(loc,start,end);
    }
    
    
    
}
