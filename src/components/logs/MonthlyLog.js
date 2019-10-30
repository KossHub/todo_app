import BaseLog from './BaseLog';
import { MDBCardTitle } from 'mdbreact';
import moment from 'moment';
import React from 'react';

export default class MonthlyLog extends BaseLog {
  handleDatePicker = (date) => {
    const data = { logType: 'monthly', date: moment(date).startOf('month') };
    this.props.setLogDate(data);
  };
  getCustomInput = () => {
    const currentLogDate = this.props.logsState.dates.monthly;
    const selectedDate =  moment(currentLogDate).format('MMMM YYYY');
    return (
      <MDBCardTitle sub tag="h6">
        <span onClick={this.closeNewTask}>{selectedDate}</span>
      </MDBCardTitle>
    );
  };
}
