package com.vital.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class TaskDaysEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String tid;

    private Long times;
    private Long seconds;

    private Long measure1;
    private Long measure2;
    private Long measure3;
    private Long measure4;

    public Long getSeconds() {
        return seconds;
    }

    public void setSeconds(Long seconds) {
        this.seconds = seconds;
    }

    public Long getMeasure2() {
        return measure2;
    }

    public void setMeasure2(Long measure2) {
        this.measure2 = measure2;
    }

    public Long getMeasure3() {
        return measure3;
    }

    public void setMeasure3(Long measure3) {
        this.measure3 = measure3;
    }

    public Long getMeasure4() {
        return measure4;
    }

    public void setMeasure4(Long measure4) {
        this.measure4 = measure4;
    }

    public Long getMeasure1() {
        return measure1;
    }

    public void setMeasure1(Long measure1) {
        this.measure1 = measure1;
    }

    public Long getTimes() {
        return times;
    }

    public void setTimes(Long times) {
        this.times = times;
    }

    public String getTid() {
        return tid;
    }

    public void setTid(String tid) {
        this.tid = tid;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
