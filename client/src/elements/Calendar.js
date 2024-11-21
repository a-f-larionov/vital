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
    window.tasks = tasks;
    let events = [];
    tasks.map(task => {
        task.metrics.map(metric => {
            metric.tiks.map(tik => {
                if (metric.typeCode !== 'timestamp') return;
                //console.log(tik);
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

    return <div>

        <div>
            <DayPilotNavigator
                onTimeRangeSelected={args => {
                    setStartDate(args.day);
                    console.log("You clicked: " + args.day);
                }}
            />
        </div><div>
            {/* <DayPilotCalendar {...config} startDate={startDate} events={events} /> */}
        </div>

        <div style={{ height: 300, overflow: 'auto', width: 'fit-content', fontFamily: 'apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;' }}>


            {/** header */}
            <div style={{ float: 'left', borderBottom: '1px solid rgb(221,221,221)', borderTop: '1px solid rgb(221,221,221)', fontSize: 13, textAlign: 'center', color: '#333', alignItems: 'center' }}>
                <div style={{ float: 'left', height: 25, width: 50, borderRight: '1px solid rgb(221,221,221)', background: 'rgb(243, 243, 243)' }}></div>
                <div style={{ float: 'left', height: 25, width: 100, borderRight: '1px solid rgb(221,221,221)', background: 'rgb(243, 243, 243)' }}>20.11.24</div>
                <div style={{ float: 'left', height: 25, width: 100, borderRight: '1px solid rgb(221,221,221)', background: 'rgb(243, 243, 243)' }}>21.11.24</div>
                <div style={{ float: 'left', height: 25, width: 100, borderRight: '1px solid rgb(221,221,221)', background: 'rgb(243, 243, 243)' }}>22.11.24</div>
            </div>

            {/** timeline */}
            <div style={{ float: 'none', color: 'rgb(51,51,51)', textAlign: 'right' }}>

                <div style={{ float: 'left', width: 50, borderRight: '1px solid rgb(221,221,221)' }}>

                    <div style={{ height: 50, width: 49, background: 'rgb(243, 243, 243)', borderBottom: '1px solid rgb(221,221,221)', }}>
                        <span style={{ fontSize: 19 }}>18</span>
                        <span style={{ fontSize: 10, height: 10, verticalAlign: 'super', paddingRight: 5, paddingLeft: 1 }}>00</span>
                    </div>
                    <div style={{ height: 50, width: 49, background: 'rgb(243, 243, 243)', borderBottom: '1px solid rgb(221,221,221)', color: 'rgb(51,51,51)', textAlign: 'right' }}>
                        <span style={{ fontSize: 19 }}>19</span>
                        <span style={{ fontSize: 10, height: 10, verticalAlign: 'super', paddingRight: 5, paddingLeft: 1 }}>00</span>
                    </div>
                    <div style={{ height: 50, width: 49, background: 'rgb(243, 243, 243)', borderBottom: '1px solid rgb(221,221,221)', color: 'rgb(51,51,51)', textAlign: 'right' }}>
                        <span style={{ fontSize: 19 }}>20</span>
                        <span style={{ fontSize: 10, height: 10, verticalAlign: 'super', paddingRight: 5, paddingLeft: 1 }}>00</span>
                    </div>
                    <div style={{ height: 50, width: 49, background: 'rgb(243, 243, 243)', borderBottom: '1px solid rgb(221,221,221)', color: 'rgb(51,51,51)', textAlign: 'right' }}>
                        <span style={{ fontSize: 19 }}>21</span>
                        <span style={{ fontSize: 10, height: 10, verticalAlign: 'super', paddingRight: 5, paddingLeft: 1 }}>00</span>
                    </div>


                </div>

                {/** Cells */}
                <div style={{ float: 'left', wdith: 100, borderRight: '1px solid rgb(221,221,221)' }}>


                    <div style={{ position: 'relative', left: 5, top: 5, width: 0, height: 0, fontSize: 10 }}>
                        <div style={{ width: 45, height: 30, background: 'lightgreen', borderRadius: 2 }}>
                            Прогулка 35m
                        </div>
                    </div>
                    <div style={{ position: 'relative', left: 50, top: 5, width: 0, height: 0, fontSize: 10 }}>
                        <div style={{ width: 45, height: 30, background: 'lightyellow', borderRadius: 2 }}>
                            Англи слушать 35m
                        </div>
                    </div>

                    <div style={{ height: 50, width: 100, background: 'white', borderBottom: '1px solid rgb(221,221,221)' }}></div>
                    <div style={{ height: 50, width: 100, background: 'white', borderBottom: '1px solid rgb(221,221,221)' }}></div>
                    <div style={{ height: 50, width: 100, background: 'white', borderBottom: '1px solid rgb(221,221,221)' }}></div>
                    <div style={{ height: 50, width: 100, background: 'white', borderBottom: '1px solid rgb(221,221,221)' }}></div>


                </div>
                <div style={{ float: 'left', wdith: 100, borderRight: '1px solid rgb(221,221,221)' }}>


                    <div style={{ height: 50, width: 100, background: 'white', borderBottom: '1px solid rgb(221,221,221)' }}></div>
                    <div style={{ height: 50, width: 100, background: 'white', borderBottom: '1px solid rgb(221,221,221)' }}></div>
                    <div style={{ height: 50, width: 100, background: 'white', borderBottom: '1px solid rgb(221,221,221)' }}></div>
                    <div style={{ height: 50, width: 100, background: 'white', borderBottom: '1px solid rgb(221,221,221)' }}></div>

                </div>

                <div style={{ float: 'left', wdith: 100, borderRight: '1px solid rgb(221,221,221)' }}>

                    <div style={{ height: 50, width: 100, background: 'white', borderBottom: '1px solid rgb(221,221,221)' }}></div>
                    <div style={{ height: 50, width: 100, background: 'white', borderBottom: '1px solid rgb(221,221,221)' }}></div>
                    <div style={{ height: 50, width: 100, background: 'white', borderBottom: '1px solid rgb(221,221,221)' }}></div>
                    <div style={{ height: 50, width: 100, background: 'white', borderBottom: '1px solid rgb(221,221,221)' }}></div>

                </div>

            </div>

        </div>

    </div >
}

export default Calendar;