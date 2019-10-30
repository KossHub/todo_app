import DatePicker, { registerLocale } from 'react-datepicker';
import enGB from 'date-fns/locale/en-GB';
import moment from 'moment';
import React from 'react';

registerLocale('en-GB', enGB);

export default function MigrateDatepicker(props) {
  const {
    editTask,
    setCurrentTask,
    toggleMigrateDatepicker,
    logsState: {
      migrateData: { newLogType, taskToMigrate }
    }
  } = props;
  const stopPropagation = (event) => {
    event.stopPropagation()
  };
  const migrateTask = (date) =>{
    const task = { ...taskToMigrate, logType: newLogType };
    if (newLogType === 'weekly') {
      task.date = moment(date).startOf('isoWeek').format('L');
    } else {
      task.date = moment(date).format('L');
    }
    editTask(task);
    setCurrentTask({});
    toggleMigrateDatepicker(false);
  };
  const closeDatepicker = () => {
    toggleMigrateDatepicker(false);
  };
  return (
    <div
      className="fullscreen-mask migrate-datepicker-mask"
      onClick={closeDatepicker}
    >
      <div
        className={`datepicker-container${
          newLogType === 'monthly' ? '-small' : ''
        }`}
        onClick={stopPropagation}
      >
        <DatePicker
          className="date-picker"
          inline
          locale="en-GB"
          onChange={migrateTask}
          showMonthYearPicker={newLogType === 'monthly'}
          showWeekNumbers={newLogType === 'weekly'}
        />
      </div>
    </div>
  );
}
