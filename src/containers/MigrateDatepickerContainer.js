import { connect } from 'react-redux';
import { editTask, setCurrentTask } from '../store/logs/actions';
import MigrateDatepicker from '../components/MigrateDatepicker';
import React from 'react';
import { toggleMigrateDatepicker } from '../store/workspace/actions';

function MigrateDatepickerContainer(props) {
  return (
    <MigrateDatepicker
      editTask={props.editTask}
      logsState={props.logsState}
      setCurrentTask={props.setCurrentTask}
      toggleMigrateDatepicker={props.toggleMigrateDatepicker}
      workspaceState={props.workspaceState}
    />
  );
}

const mapStateToProps = ({ logsState, workspaceState }) => ({
  logsState, workspaceState
});
const mapDispatchToProps = {
  editTask,
  setCurrentTask,
  toggleMigrateDatepicker
};
export default connect(
  mapStateToProps, mapDispatchToProps
)(MigrateDatepickerContainer);
