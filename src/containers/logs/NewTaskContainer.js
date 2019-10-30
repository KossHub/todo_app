import { connect } from 'react-redux';
import NewTask from '../../components/logs/NewTask';
import React from 'react';

function NewTaskContainer(props) {
  return (
    <NewTask
      closeNewTask={props.closeNewTask}
      logsState={props.logsState}
      logType={props.logType}
      saveNewTask={props.saveNewTask}
    />
  );
}

const mapStateToProps = ({ logsState }) => ({ logsState });
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(NewTaskContainer);
