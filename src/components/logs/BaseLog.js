import DatePicker, { registerLocale } from 'react-datepicker';
import EditTaskContainer from '../../containers/logs/EditTaskContainer';
import enGB from 'date-fns/locale/en-GB';
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardTitle,
  MDBContainer,
  MDBIcon
} from 'mdbreact';
import moment from 'moment';
import NewTaskContainer from '../../containers/logs/NewTaskContainer';
import PerfectScrollbar from 'react-perfect-scrollbar';
import React from 'react';
import TaskContainer from '../../containers/logs/TaskContainer';

registerLocale('en-GB', enGB);

export default class BaseLog extends React.Component {
  addAnotherTask = () => {
    this.props.setCurrentTask(this.props.logType);
  };
  saveNewTask = (task) => {
    this.props.addTask(task);
  };
  editTask = (task) => {
    this.props.editTask(task);
  };
  deleteTask = (id) => {
    this.props.removeTask(id);
  };
  closeNewTask = () => {
    this.props.setCurrentTask({});
  };
  sortTasks = (tasks) => {
    return tasks.sort((a, b) => {
      if (a.status === b.status) {
        return (a.mark - b.mark);
      }
      return (a.status - b.status);
    });
  };
  showExpiredTask = () => {
    const sortedTasks = this.state.expiredDates.sort((a, b) => (a - b));
    this.handleDatePicker(new Date(sortedTasks[0]));
  };
  capitalizeFirstLetter = (str) => {
    return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
  };
  renderTasks = () => {
    const { logType } = this.props;
    const {
      currentTask,
      tasks,
      dates: { [logType]: currentLogDate }
    } = this.props.logsState;
    const filteredTasks = tasks.filter((task) => (
      task.logType === logType
      && task.date === currentLogDate.format('L')
    ));
    const sortedFilteredTasks = this.sortTasks(filteredTasks);
    return sortedFilteredTasks.map((task) => {
      if (typeof currentTask === 'string' || currentTask.id !== task.id) {
        return <TaskContainer key={task.id} task={task} />;
      }
      return (
        <EditTaskContainer
          deleteTask={this.deleteTask}
          editTask={this.editTask}
          key={task.id}
          logType={logType}
        />
      );
    });
  };
  render() {
    const { logsState ,logType } = this.props;
    const newTask = logsState.currentTask === logType;
    let logTitle = this.capitalizeFirstLetter(logType);
    const customInput = this.getCustomInput && this.getCustomInput();
    const tasks = this.renderTasks();
    const highlightWithRanges = this.getHighlightWithRanges
      ? this.getHighlightWithRanges()
      : [];
    const todayButtonText = logType === 'daily'
      ? 'Today'
      : logType === 'weekly'
      ? 'This week'
      : 'This month';
    return (
      <div className="table-card animated fadeIn">
        <MDBContainer>
          <MDBCard>
            <MDBCardBody className={`${logType}-log-title`}>
              <MDBCardTitle>
                {logTitle} Log
                {(logType === 'daily' || logType === 'weekly')
                  && !!this.state.expiredDates.length && (
                    <div
                      className="expired-tasks"
                      onClick={this.showExpiredTask}
                    >
                      <MDBIcon
                        className="icon-exclamation ml-2 mr-1"
                        icon="exclamation-triangle"
                      />
                      <span>expired tasks</span>
                    </div>
                )}
              </MDBCardTitle>
              {logType !== 'future' && (
                <DatePicker
                  className="date-picker"
                  customInput={customInput}
                  highlightDates={highlightWithRanges}
                  locale="en-GB"
                  onChange={this.handleDatePicker}
                  selected={new Date(logsState.dates[logType])}
                  showMonthYearPicker={logType === 'monthly'}
                  showWeekNumbers={logType === 'weekly'}
                  todayButton={todayButtonText}
                />
              )}
              {logType === 'future' && (
                <MDBCardTitle className="mt-5-px mb-2-px" tag="h6" sub>
                  Someday
                </MDBCardTitle>
              )}
            </MDBCardBody>
          </MDBCard>
        </MDBContainer>
        <PerfectScrollbar className="scroll-tasks mt-2">
          {tasks}
          {!newTask && (
            <MDBContainer onClick={this.addAnotherTask}>
              <MDBCard className="add-task-card">
                <MDBCardBody>
                  <MDBCardText className="text-center">
                    <MDBIcon icon="plus mr-2" />
                    Add {!!tasks.length && 'another '}task
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBContainer>
          )}
          {newTask && (
            <NewTaskContainer
              closeNewTask={this.closeNewTask}
              logType={logType}
              saveNewTask={this.saveNewTask}
            />
          )}
        </PerfectScrollbar>
      </div>
    );
  }
}
