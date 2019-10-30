import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';
import React from 'react';

class Header extends React.Component {
  buttons = [
    {text: 'projects', path: '/projects'},
    {text: 'logs', path: '/logs'},
    {text: 'notes', path: '/notes'},
    {text: 'lifestyle', path: '/lifestyle'}
  ];
  componentDidMount() {
    setInterval(() => {
      this.props.setCurrentTime(moment());
    }, 1000);
  }
  render() {
    const currentTime = moment(this.props.commonState.currentTime).format(
      'MMMM Do YYYY dddd, h:mm:ss a'
    );
    return (
      <div className="header animated fadeInDown">
        <h3 className="app-name"><b>J</b>b</h3>
        {this.buttons.map((button) => (
          <Link
            className={`btn btn-outline-${
              this.props.location.pathname == button.path ? 'white' : 'grey'
            } Ripple-parent`}
            key={button.text}
            to={button.path}
          >
            {button.text}
          </Link>
        ))}
        <h5 className="the-time">{currentTime}</h5>
      </div>
    );
  }
}
export default withRouter(Header);
