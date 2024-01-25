package com.example.sprint_2.dao;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class GeneratorDao {
    @Autowired
    JdbcTemplate jt;

    public List<Map<String,Object>> select(
        String loc,
        String date
    ) {
        String start = date + "0000";
        String end = date + "2300";
        return jt.queryForList(String.format("select * from generate_data WHERE LOC = '%s' AND TM BETWEEN %s AND %s",loc,start,end));
    }

    public List<Map<String, Object>> selectMax(
        String loc,
        String date
    ){
        String start = date + "0000";
        String end = date + "2300";
        return jt.queryForList(String.format("select MAX(`value`) as Max from generate_data WHERE LOC = '%s' AND TM BETWEEN %s AND %s",loc,start,end));
    }
}
