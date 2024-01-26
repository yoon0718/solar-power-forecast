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

    // 날짜와 지역을 기준으로 데이터를 가져오는 코드
    public List<Map<String,Object>> select(
        String loc,
        String date
    ) {
        // 날짜까지만 있는 값을 시간을 추가하여 DB와 동기화
        String start = date + "0000";
        String end = date + "2300";

        // 쿼리대로 해당 지역의 00시~23시 사이의 데이터를 가져온다
        return jt.queryForList(String.format("select * from generate_data WHERE LOC = '%s' AND TM BETWEEN %s AND %s",loc,start,end));
    }

    // 위와 내용은 같지만 해당일의 발전량 최대치를 가져온다.
    // row 수가 달라서 한번에 가져올 수 없기 때문에 따로 있다.
    public List<Map<String, Object>> selectMax(
        String loc,
        String date
    ){
        String start = date + "0000";
        String end = date + "2300";
        return jt.queryForList(String.format("select MAX(`value`) as Max from generate_data WHERE LOC = '%s' AND TM BETWEEN %s AND %s",loc,start,end));
    }
}
