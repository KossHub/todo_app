import BaseLog from './BaseLog';
import { MDBCardTitle } from 'mdbreact';
import moment from 'moment';
import React from 'react';

export default class WeeklyLog extends BaseLog {
  constructor(props) {
    super(props);
    this.state = {
      actualDates: [],
      expiredDates: [],
      selectedDates: []
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      tasks,
      dates: { weekly: currentLogDate }
    } = nextProps.logsState;
    const actualDates = [];
    const expiredDates = [];
    const selectedDates =[];
    for (let i = 1; i < 8; i++) {
      const selectDate = new Date(moment(currentLogDate).day(i));
      selectedDates.push(selectDate);
    }
    tasks.map((task) => {
      if (
        task.logType === 'weekly'
        && moment(task.date).format('L')
          >= moment().startOf('isoWeek').format('L')
      ) {
        for (let i = 1; i < 8; i++) {
          const actualDate = new Date(moment(task.date).day(i));
          actualDates.push(actualDate);
        }
      } else if (
        task. logType === 'weekly'
        && moment(task.date).format('L')
          < moment().startOf('isoWeek').format('L')
      ) {
        for (let i = 1; i < 8; i++) {
          const expiredDate = new Date(moment(task.date).day(i));
          expiredDates.push(expiredDate);
        }
      }
    });
    return { ...prevState, selectedDates, actualDates, expiredDates };
  }
  handleDatePicker = (date) => {
    const data = {
      logType: 'weekly',
      date: moment(date).startOf('isoWeek')
    };
    this.props.setLogDate(data);
  };
  getCustomInput = () => {
    const currentLogDate = this.props.logsState.dates.weekly;
    const firstDayOfWeek = currentLogDate.format('MMM Do YYYY');
    const lastDayOfWeek = moment(currentLogDate)
      .endOf('isoWeek')
      .format('MMM Do YYYY');
    const weekNum = currentLogDate.isoWeek();
    const selectedDate = `${firstDayOfWeek} - ${lastDayOfWeek} (#${weekNum})`;
    return (
      <MDBCardTitle sub tag="h6">
        <span onClick={this.closeNewTask}>{selectedDate}</span>
      </MDBCardTitle>
    );
  };
  getHighlightWithRanges = () => {
    const { actualDates, expiredDates, selectedDates } = this.state;
    return [
      {'react-datepicker__day--highlighted': selectedDates},
      {'day--highlighted-custom-2': actualDates},
      {'day--highlighted-custom-1': expiredDates}
    ];
  };
}
