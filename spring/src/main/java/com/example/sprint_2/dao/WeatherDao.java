package com.example.sprint_2.dao;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class WeatherDao {
    @Autowired
    JdbcTemplate jt;

    public List<Map<String, Object>> selectWeather(){
        return jt.queryForList("SELECT * FROM weather_data");
    }

    public List<Map<String, Object>> selectbyloc(String loc, String start, String end){
        return jt.queryForList(String.format("SELECT * FROM weather_data Where LOC = '%s' AND TM BETWEEN %s AND %s", loc, start, end));
    }
}
