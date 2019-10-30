import BaseLog from './BaseLog';
import EditTaskContainer from '../../containers/logs/EditTaskContainer';
import TaskContainer from '../../containers/logs/TaskContainer';
import React from 'react';

export default class FutureLog extends BaseLog {
  renderTasks = () => {
    const { currentTask, tasks } = this.props.logsState;
    const filteredTasks = tasks.filter((task) => task.logType === 'future');
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
          logType={'future'}
        />
      );
    });
  };
}
