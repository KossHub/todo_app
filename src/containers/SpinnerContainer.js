import { connect } from 'react-redux';
import React from 'react';
import Spinner from '../components/Spinner';

function SpinnerContainer(props) {
  return <Spinner logsState={props.logsState} />;
}

const mapStateToProps = ({ logsState }) => ({ logsState });
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(SpinnerContainer);
