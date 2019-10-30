import { connect } from 'react-redux';
import Lifestyle from '../../components/lifestyle/Lifestyle';
import React from 'react';

function LifestyleContainer(props) {
  return <Lifestyle />;
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(LifestyleContainer);
