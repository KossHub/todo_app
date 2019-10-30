import { connect } from 'react-redux';
import Header from '../components/Header';
import React from 'react';
import { setCurrentTime } from '../store/common/actions';

function HeaderContainer(props) {
  return (
    <Header
      commonState={props.commonState}
      setCurrentTime={props.setCurrentTime}
      workspaceState={props.workspaceState}
    />
  );
}

const mapStateToProps = ({ commonState,  workspaceState }) => ({
  commonState, workspaceState
 });
const mapDispatchToProps = { setCurrentTime };
export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
