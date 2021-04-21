import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Calendare.css';
import calendare from '../../../assets/svgs/calendare.svg';

const daysMap = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

const getDayDetails = args => {
    let date = args.index - args.firstDay;
    let day = args.index % 7;
    let prevMonth = args.month - 1;
    let prevYear = args.year;
    if (prevMonth < 0) {
        prevMonth = 11;
        prevYear--;
    }
    let prevMonthNumberOfDays = getNumberOfDays(prevYear, prevMonth);
    let _date = (date < 0 ? prevMonthNumberOfDays + date : date % args.numberOfDays) + 1;
    let valid = (date >= 0 && date < args.numberOfDays) ? 1 : 0;
    let timestamp = new Date(args.year, args.month, _date).getTime();
    return {
        date: _date,
        day,
        valid,
        timestamp,
        dayString: daysMap[day],
        reminder: args.reminders[timestamp] || null
    }
}

export const getMonthDetails = (year, month, reminders) => {
    let firstDay = (new Date(year, month)).getDay();
    let numberOfDays = getNumberOfDays(year, month);
    let monthArray = [];
    let currentDay = null;
    let index = 0;
    let reminderMap = {};

    for (let idx in reminders) {
        let tempDate = new Date(reminders[idx].timestamp);
        let startOfTheDay = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate()).getTime()
        reminderMap[startOfTheDay] = reminders[idx];
    }

    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 7; col++) {
            currentDay = getDayDetails({
                index,
                numberOfDays,
                firstDay,
                year,
                month,
                reminders: reminderMap
            });
            monthArray.push(currentDay);
            index++;
        }
    }
    return monthArray;
}

export const getNumberOfDays = (year, month) => {
    return 32 - new Date(year, month, 32).getDate();
}

export const validateDate = (year, month, date, hour, minute) => {
    let jsDate = new Date();
    let defaultAsCurrent = true;
    year = parseInt(!year ? jsDate.getFullYear() : (year > 0 === false || year < 1970) ? 1970 : year, 10);
    month = parseInt(Math.max(1, Math.min(12, !month ? defaultAsCurrent ? jsDate.getMonth() + 1 : 1 : month > 0 === false ? 1 : month)), 10);
    let maxDays = getNumberOfDays(year, month - 1);
    date = parseInt(Math.max(1, Math.min(maxDays, !date ? defaultAsCurrent ? jsDate.getDate() : 1 : date > 0 === false ? 1 : date)), 10);
    hour = parseInt(Math.max(0, Math.min(23, !hour ? defaultAsCurrent ? jsDate.getHours() : 0 : hour > 0 === false ? 0 : hour)), 10);
    minute = parseInt(Math.max(0, Math.min(59, !minute ? defaultAsCurrent ? jsDate.getMinutes() : 0 : minute > 0 === false ? 0 : minute)), 10);
    return { year, month, date, hour, minute, yearTemp: year };
}

let oneDay = 60 * 60 * 24 * 1000;
let todayTimestamp = Date.now() - (Date.now() % oneDay) + (new Date().getTimezoneOffset() * 1000 * 60);
let inputRef = React.createRef();

export default class MyCalendare extends Component {

    state = {
        getMonthDetails: []
    }

    constructor(props) {
        super(props);
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth();
        this.state = {
            year,
            month,
            selectedDay: 0,
            monthDetails: this.getMonthDetails(year, month)
        }
    }

    componentDidMount() {
        window.addEventListener('click', this.addBackDrop);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.addBackDrop);
    }

    addBackDrop = e => {
        if (!ReactDOM.findDOMNode(this).contains(e.target)) {
            this.props.setDate(this.props.appoints)
            this.setState({ selectedDay: 0 });
        }
    }


    daysMap = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    monthMap = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

    getDayDetails = args => {
        let date = args.index - args.firstDay;
        let day = args.index % 7;
        let prevMonth = args.month - 1;
        let prevYear = args.year;
        if (prevMonth < 0) {
            prevMonth = 11;
            prevYear--;
        }
        let prevMonthNumberOfDays = this.getNumberOfDays(prevYear, prevMonth);
        let _date = (date < 0 ? prevMonthNumberOfDays + date : date % args.numberOfDays) + 1;
        let month = date < 0 ? -1 : date >= args.numberOfDays ? 1 : 0;
        let timestamp = new Date(args.year, args.month, _date).getTime();
        return {
            date: _date,
            day,
            month,
            timestamp,
            dayString: this.daysMap[day]
        }
    }

    getNumberOfDays = (year, month) => {
        return 40 - new Date(year, month, 40).getDate();
    }

    getMonthDetails = (year, month) => {
        let firstDay = (new Date(year, month)).getDay();
        let numberOfDays = this.getNumberOfDays(year, month);
        let monthArray = [];
        let rows = 6;
        let currentDay = null;
        let index = 0;
        let cols = 7;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                currentDay = this.getDayDetails({
                    index,
                    numberOfDays,
                    firstDay,
                    year,
                    month
                });
                monthArray.push(currentDay);
                index++;
            }
        }
        return monthArray;
    }

    isCurrentDay = day => {
        return day.timestamp === todayTimestamp;
    }

    isSelectedDay = day => {
        return day.timestamp === this.state.selectedDay;
    }

    getDateFromDateString = dateValue => {
        let dateData = dateValue.split('-').map(d => parseInt(d, 10));
        if (dateData.length < 3)
            return null;

        let year = dateData[0];
        let month = dateData[1];
        let date = dateData[2];
        return { year, month, date };
    }

    getMonthStr = month => this.monthMap[Math.max(Math.min(11, month), 0)] || 'Month';

    getDateStringFromTimestamp = timestamp => {
        let dateObject = new Date(timestamp);
        let month = dateObject.getMonth() + 1;
        let date = dateObject.getDate();
        return dateObject.getFullYear() + '-' + (month < 10 ? '0' + month : month) + '-' + (date < 10 ? '0' + date : date);
    }

    setDate = dateData => {
        let selectedDay = new Date(dateData.year, dateData.month - 1, dateData.date).getTime();
        this.setState({ selectedDay })
        if (this.props.onChange) {
            this.props.onChange(selectedDay);
        }
    }

    onDateClick = day => {
        this.setState({ selectedDay: day.timestamp });
        if (this.props.onChange) {
            this.props.onChange(day.timestamp);
        }
        let newData = this.props.appoints.filter((item)=>{
            let currentDate = item.date.date.split('.')
            return day.date === parseInt(currentDate[0]) && new Date(day.timestamp).getMonth()===currentDate[1]-1 &&  new Date(day.timestamp).getFullYear()===parseInt(currentDate[2])
        })
        this.props.setDate(newData)
    }

    setYear = offset => {
        let year = this.state.year + offset;
        let month = this.state.month;
        this.setState({
            year,
            monthDetails: this.getMonthDetails(year, month)
        })
    }

    setMonth = offset => {
        let year = this.state.year;
        let month = this.state.month + offset;
        if (month === -1) {
            month = 11;
            year--;
        } else if (month === 12) {
            month = 0;
            year++;
        }
        this.setState({
            year,
            month,
            monthDetails: this.getMonthDetails(year, month)
        })
    }

    renderCalendar() {
        let dates = this.props.appoints.map((item) => ({ id: item.id, date: item.date.date }))
        let appointsDates = [];
        for (let item in dates) {
            let currentAppoint = dates[item].date.split('.')
            let currentAppointMonth = new Date(currentAppoint[2], currentAppoint[1] - 1, currentAppoint[0]).getMonth()
            let currentAppointDay = parseInt(currentAppoint[0])
            let currentAppointYear = parseInt(currentAppoint[2])
            if (appointsDates.some((item) => item.month === currentAppointMonth && item.day === currentAppointDay && item.year === currentAppointYear)) {
                let index = appointsDates.findIndex((item) => item.month === currentAppointMonth && item.day === currentAppointDay && item.year === currentAppointYear)
                appointsDates[index] = { month: currentAppointMonth, day: currentAppointDay, year: currentAppointYear, count: ++appointsDates[index].count }
            }
            else {
                appointsDates.push({ month: currentAppointMonth, day: currentAppointDay, year: currentAppointYear, count: 1 })
            }
        }

        let days = this.state.monthDetails.map((day, index) => {
            return (

                <div className={'cc-day-container ' + ((day.month !== 0 || (day.timestamp < todayTimestamp)) ? ' disabled' : ' active') +
                    (this.isCurrentDay(day) ? ' highlight' : '') + (this.isSelectedDay(day) ? ' highlight-blue' : '')} key={index} onClick={() => this.onDateClick(day)}>
                    <div className='ccdc-day'>
                        <span>
                            {day.date}
                        </span>
                        {
                            appointsDates.some((item) => (item.month === new Date(day.timestamp).getMonth()+day.month) && item.day === day.date && item.year === new Date(day.timestamp).getFullYear()) &&
                            <div className="appoints">
                                <p>{appointsDates[appointsDates.findIndex((item) => item.month === new Date(day.timestamp).getMonth()+day.month && item.day === day.date && item.year === new Date(day.timestamp).getFullYear())].count}</p>
                            </div>
                        }

                    </div>
                </div>
            )

        })

        return (
            <div className='ccc-container'>
                <div className='ccc-head'>
                    {['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СУБ'].map((d, i) => <div key={i} className='ccch-name'>{d}</div>)}
                </div>
                <div className='ccc-body'>
                    {days}
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className='MyCalendare'>
                <div className='mcdp-container'>
                    <div className='mcdpc-head'>
                        <div className='mcdpch-button'>
                            <div className='mcdpchb-inner' onClick={() => this.setYear(-1)}>
                                <span className='mcdpchbi-left-arrows'></span>
                            </div>
                        </div>
                        <div className='mcdpch-button'>
                            <div className='mcdpchb-inner' onClick={() => this.setMonth(-1)}>
                                <span className='mcdpchbi-left-arrow'></span>
                            </div>
                        </div>
                        <div className='mcdpch-container'>
                            <div className='mcdpchc-month'>{this.getMonthStr(this.state.month) + ", " + this.state.year}</div>
                        </div>
                        <div className='mcdpch-button'>
                            <div className='mcdpchb-inner' onClick={() => this.setMonth(1)}>
                                <span className='mcdpchbi-right-arrow'></span>
                            </div>
                        </div>
                        <div className='mcdpch-button' onClick={() => this.setYear(1)}>
                            <div className='mcdpchb-inner'>
                                <span className='mcdpchbi-right-arrows'></span>
                            </div>
                        </div>
                    </div>
                    <div className='mcdpc-body'>
                        {this.renderCalendar()}
                    </div>
                </div>

            </div>
        )
    }

}

MyCalendare.defaultProps = {
    setDate: () => { }
}