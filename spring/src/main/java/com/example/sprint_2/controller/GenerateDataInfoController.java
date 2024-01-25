package com.example.sprint_2.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.example.sprint_2.dao.GeneratorDao;
import com.example.sprint_2.dao.WeatherDao;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
public class GenerateDataInfoController {
    @Autowired
    GeneratorDao generatorDao;
    @Autowired
    WeatherDao weatherDao;

    @GetMapping("/gendata")
    public List<Map<String,Object>> test() {
        return generatorDao.select();
    }

    @GetMapping("/weatherdata")
    public List<Map<String,Object>> weatherAll() {
        return weatherDao.selectWeather();
    }

    @GetMapping("/locweatherdata")
    public List<Map<String,Object>> locWeather(
        @RequestParam String loc,
        @RequestParam String start,
        @RequestParam String end
        ) {
        return weatherDao.selectbyloc(loc,start,end);
    }
    
    
    
}
