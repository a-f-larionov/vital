import React, { useState } from 'react';

//import { DayPilotCalendar } from "@daypilot/daypilot-pro-react";
//import { DayPilotNavigator } from "@daypilot/daypilot-pro-react";
import { DayPilotNavigator } from "daypilot-pro-react";
import { DayPilotCalendar } from "daypilot-pro-react";

import TaskManager from '../managers/TaskManager';
/** 
 *  https://code.daypilot.org/42221/react-weekly-calendar-tutorial
 */


function Calendar({ tasks }) {

    const [startDate, setStartDate] = useState("2025-10-04");

    let tableData = TaskManager.getTable();

    let events = [];
    tasks.map(task => {
        task.metrics.map(metric => {
            metric.tiks.map(tik => {
                if (metric.typeCode !== 'timestamp') return;
                let backColor = "#eee";
                switch (task.title) {
                    case "Piano study": backColor = "#88f"; break;
                    case "Violin study": backColor = "#8ff"; break;
                    case "Синтезатор дорога": backColor = "#8ff"; break;
                    case "Синтезатор игра": backColor = "#48f"; break;
                    case "Прогулка": backColor = "#ff8"; break;
                    case "LeetCode": backColor = "#8f8"; break;
                    case "👨‍💻Проект Life Tracker ": backColor = "#cc99ff"; break;
                    case "🐶Прогулка с Купером": backColor = "#F44"; break;
                    case "🐀Прогулка крыс": backColor = "#F44"; break;
                }
                events.push(
                    {
                        id: tik.id,
                        backColor: backColor,
                        text: task.title,
                        start: new Date((tik.datetime - tik.value + 3 * 60 * 60) * 1000).toISOString(),
                        end: new Date((tik.datetime + 3 * 60 * 60) * 1000).toISOString()
                    });
            })
        })
    })

    const config = {
        locale: "ru-ru",
        viewType: "Week",
        cellDuration: 30,
        cellHeight: 30,
        dayBeginsHour: 6,
        dayEndsHour: 23,
        businessBeginsHour: 7,
        businessEndsHour: 18,
        eventArrangement: "SideBySide",
        timeRangeSelectedHandling: "Enabled",
    };

    let hours = [];
    for (var i = 0; i < 24; i++) {
        hours.push({ hour: i });
    }

    return <div>


        <div style={{ height: '100%', overflow: 'auto', width: '100%' }}>
            <div style={{ height: 300, width: tableData.cols.length * 102 + 50, fontFamily: 'apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>

                {/** header */}

                <div style={{ float: 'left', borderBottom: '1px solid rgb(221,221,221)', borderTop: '1px solid rgb(221,221,221)', fontSize: 13, textAlign: 'center', color: '#333', alignItems: 'center' }}>

                    <div style={{ float: 'left', height: 25, width: 50, borderRight: '1px solid rgb(221,221,221)', background: 'rgb(243, 243, 243)' }}></div>

                    {/** dates! */}
                    {tableData.cols.map((col) => {
                        return <div key={col.datetime} style={{ float: 'left', height: 25, width: 100, borderRight: '1px solid rgb(221,221,221)', background: 'rgb(243, 243, 243)' }}>
                            {col.datetime.toLocaleDateString().replaceAll("/", ".")}
                        </div>;
                    })}

                </div>

                {/** timeline */}
                <div style={{ float: 'none', color: 'rgb(51,51,51)', textAlign: 'right' }}>

                    <div style={{ float: 'left', width: 50, borderRight: '1px solid rgb(221,221,221)' }}>

                        {/**  from 00:00 to 24:00  */}
                        {hours.map(time => {

                            return <div key={time.hour}
                                style={{ height: 50, width: 49, background: 'rgb(243, 243, 243)', borderBottom: '1px solid rgb(221,221,221)', }}>
                                <span style={{ fontSize: 19 }}>{time.hour}</span>
                                <span style={{ fontSize: 10, height: 10, verticalAlign: 'super', paddingRight: 5, paddingLeft: 1 }}>00</span>
                            </div>;
                        })}

                    </div>

                    {/** Cells */}



                    <div style={{ float: 'left', wdith: 100, borderRight: '1px solid rgb(221,221,221)' }}>

                        {tasks.map((task) => {
                            return task.metrics
                                .filter(tik => tik.typeCode === 'timestamp')
                                .map((metric) => {
                                    return metric.tiks
                                        .map((tik) => {

                                            let title = task.title.substring(0,8) ;
                                            let d = new Date(tik.datetime * 1000);
                                            let duration = tik.value / 60 / 1.5;
                                            let backColor;
                                            switch (task.title) {
                                                case "Piano study": backColor = "#88f"; break;
                                                case "Violin study": backColor = "#8ff"; break;
                                                case "Синтезатор дорога": backColor = "#8ff"; break;
                                                case "Синтезатор игра": backColor = "#48f"; break;
                                                case "Прогулка": backColor = "#ff8"; break;
                                                case "LeetCode": backColor = "#8f8"; break;
                                                case "👨‍💻Проект Life Tracker ": backColor = "#cc99ff"; break;
                                                case "🐶Прогулка с Купером": backColor = "#F44"; break;
                                                case "🐀Прогулка крыс": backColor = "#F44"; break;
                                            }
                                            let top = d.getHours() * 51 + d.getMinutes() / 1.1 - duration;
                                            
                                            let left = (d.getDate() - 10) * 100 + (d.getMonth() - 9) * (31 * 100)  +50;
                                            
                                            return <div key={tik.id}
                                                style={{ position: 'relative', left: left, top: top, width: 0, height: 0, fontSize: 10 }}>
                                                <div style={{ width: 90, height: duration, background: backColor, borderRadius: 2 }}>
                                                    {title}
                                                </div>
                                            </div>
                                        })
                                })
                        })}

                    </div>

                    {/** Cells */}
                    {/** from dated .map */}

                    {tableData.cols.map((col) => {
                        return <div style={{ float: 'left', wdith: 100, borderRight: '1px solid rgb(221,221,221)' }}>

                            {hours.map((time) => {
                                return <div key={time.hour} style={{ height: 50, width: 100, background: 'white', borderBottom: '1px solid rgb(221,221,221)' }}>

                                </div>;
                            })}

                        </div>;

                    })}

                </div>

            </div>

        </div >
    </div >
}

export default Calendar;