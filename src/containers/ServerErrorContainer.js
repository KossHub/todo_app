import { connect } from 'react-redux';
import React from 'react';
import ServerError from '../components/ServerError';

function ServerErrorContainer(props) {
  return <ServerError logsState={props.logsState} />;
}

const mapStateToProps = ({ logsState }) => ({ logsState });
const mapDispatchToProps = {};
export default connect(
  mapStateToProps, mapDispatchToProps
)(ServerErrorContainer);
