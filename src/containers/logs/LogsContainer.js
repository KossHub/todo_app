import { connect } from 'react-redux';
import { getTasks } from '../../store/logs/actions';
import Logs from '../../components/logs/Logs';
import React from 'react';

function LogsContainer(props) {
  return (
    <Logs
      getTasks={props.getTasks}
      logsState={props.logsState}
      workspaceState={props.workspaceState}
    />
  );
}

const mapStateToProps = ({ logsState, workspaceState }) => ({
  logsState, workspaceState
});
const mapDispatchToProps = { getTasks };
export default connect(mapStateToProps, mapDispatchToProps)(LogsContainer);
