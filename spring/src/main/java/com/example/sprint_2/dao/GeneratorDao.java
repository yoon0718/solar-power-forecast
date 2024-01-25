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

    public List<Map<String,Object>> select() {
        return jt.queryForList("select * from generate_data");
    }
}
