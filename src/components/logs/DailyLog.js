import BaseLog from './BaseLog';
import { MDBCardTitle } from 'mdbreact';
import moment from 'moment';
import React from 'react';

export default class DailyLog extends BaseLog {
  constructor(props) {
    super(props);
    this.state = {
      actualDates: [],
      expiredDates: []
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const actualDates = [];
    const expiredDates = [];
    nextProps.logsState.tasks.map((task) => {
      if (
        task.logType === 'daily'
        && moment(task.date).format('L') >= moment().format('L')
      ) {
        actualDates.push(new Date(task.date));
      } else if (
        task. logType === 'daily'
        && moment(task.date).format('L') < moment().format('L')
        && task.status !== 3
      ) {
        expiredDates.push(new Date(task.date));
      }
    });
    return { ...prevState, actualDates, expiredDates };
  }
  handleDatePicker = (date) => {
    const data = { logType: 'daily', date: moment(date) };
    this.props.setLogDate(data);
  };
  getCustomInput = () => {
    const currentLogDate = this.props.logsState.dates.daily;
    const selectedDate = moment(currentLogDate).format('MMMM Do YYYY dddd');
    return (
      <MDBCardTitle sub tag="h6" selected={null}>
        <span onClick={this.closeNewTask}>{selectedDate}</span>
      </MDBCardTitle>
    );
  };
  getHighlightWithRanges = () => {
    return [
      {'day--highlighted-custom-2': this.state.actualDates},
      {'day--highlighted-custom-1': this.state.expiredDates}
    ];
  };
}
