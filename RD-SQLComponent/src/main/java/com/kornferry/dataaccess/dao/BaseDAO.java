package com.kornferry.dataaccess.dao;

import java.util.List;
import java.util.Map;

import com.kornferry.dataaccess.dto.BaseDO;

public interface BaseDAO {

    void create(BaseDO baseDO);

    public void create(List<BaseDO> list) ;

    BaseDO findById(Class<? extends BaseDO> theClass, Integer id) ;

    BaseDO findByParam(Class<BaseDO> theClass, String queryName, Map<String, Object> params) ;

    public List<BaseDO> findRecords(String queryName, Map<String, Object> params) ;

    public List<BaseDO> update(List<BaseDO> list) ;

    public BaseDO updateRecord(BaseDO baseDO) ;

}
