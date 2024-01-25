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

    // 해당지역의 해당일의 00시부터 23시까지의 데이터를 가져온다.
    public List<Map<String, Object>> selectbyloc(String loc, String start, String end){
        return jt.queryForList(String.format("SELECT * FROM mean_weather WHERE LOC = '%s' AND TM BETWEEN %s AND %s", loc, start, end));
    }
    
}
