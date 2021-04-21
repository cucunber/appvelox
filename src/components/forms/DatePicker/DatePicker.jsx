import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './DatePicker.css';
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

export default class MyDatePicker extends Component {

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
            selectedDay: todayTimestamp,
            monthDetails: this.getMonthDetails(year, month)
        }
    }

    componentDidMount() {
        window.addEventListener('click', this.addBackDrop);
        this.setDateToInput(this.state.selectedDay);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.addBackDrop);
    }

    addBackDrop = e => {
        if (this.state.showDatePicker && !ReactDOM.findDOMNode(this).contains(e.target)) {
            this.showDatePicker(false);
        }
    }

    showDatePicker = (showDatePicker = true) => {
        this.setState({ showDatePicker })
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

    updateDateFromInput = () => {
        console.log(this.props)
        let dateValue = inputRef.current.value;
        let dateData = this.getDateFromDateString(dateValue);
        if (dateData !== null) {
            this.setDate(dateData);
            this.setState({
                year: dateData.year,
                month: dateData.month - 1,
                monthDetails: this.getMonthDetails(dateData.year, dateData.month - 1)
            })
        }
        
        this.props.setDate(dateValue);
    }

    setDateToInput = (timestamp) => {
        let dateString = this.getDateStringFromTimestamp(timestamp);
        inputRef.current.value = dateString;
        this.props.setDate(dateString);
    }

    onDateClick = day => {
        this.setState({ selectedDay: day.timestamp }, () => this.setDateToInput(day.timestamp));
        if (this.props.onChange) {
            this.props.onChange(day.timestamp);
        }
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
        let days = this.state.monthDetails.map((day, index) => {
            return (
                <div className={'c-day-container ' + (day.month !== 0 ? ' disabled' : '') +
                    (this.isCurrentDay(day) ? ' highlight' : '') + (this.isSelectedDay(day) ? ' highlight-green' : '')} key={index}>
                    <div className='cdc-day'>
                        <span onClick={() => this.onDateClick(day)}>
                            {day.date}
                        </span>
                    </div>
                </div>
            )
        })

        return (
            <div className='c-container'>
                <div className='cc-head'>
                    {['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СУБ'].map((d, i) => <div key={i} className='cch-name'>{d}</div>)}
                </div>
                <div className='cc-body'>
                    {days}
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className='MyDatePicker'>
                <div className='mdp-input' >
                    <img src={calendare} alt="" onClick={() => this.showDatePicker(!this.state.showDatePicker)} />
                    <input type='date' onChange={this.updateDateFromInput} ref={inputRef}/>
                </div>
                {this.state.showDatePicker ? (
                    <div className='mdp-container'>
                        <div className='mdpc-head'>
                            <div className='mdpch-button'>
                                <div className='mdpchb-inner' onClick={() => this.setYear(-1)}>
                                    <span className='mdpchbi-left-arrows'></span>
                                </div>
                            </div>
                            <div className='mdpch-button'>
                                <div className='mdpchb-inner' onClick={() => this.setMonth(-1)}>
                                    <span className='mdpchbi-left-arrow'></span>
                                </div>
                            </div>
                            <div className='mdpch-container'>
                                <div className='mdpchc-year'>{this.state.year}</div>
                                <div className='mdpchc-month'>{this.getMonthStr(this.state.month)}</div>
                            </div>
                            <div className='mdpch-button'>
                                <div className='mdpchb-inner' onClick={() => this.setMonth(1)}>
                                    <span className='mdpchbi-right-arrow'></span>
                                </div>
                            </div>
                            <div className='mdpch-button' onClick={() => this.setYear(1)}>
                                <div className='mdpchb-inner'>
                                    <span className='mdpchbi-right-arrows'></span>
                                </div>
                            </div>
                        </div>
                        <div className='mdpc-body'>
                            {this.renderCalendar()}
                        </div>
                    </div>
                ) : ''}
            </div>
        )
    }

}

MyDatePicker.defaultProps = {
    setDate: ()=>{}
}