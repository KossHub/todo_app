import {
  MDBBtn,
  MDBBtnGroup,
  MDBCard,
  MDBCardBody,
  MDBContainer,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBIcon
} from 'mdbreact';
import React from 'react';

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTaskChanged: false,
      task: {
        date: null,
        logType: null,
        mark: 4, // priority: 1 - high, 2 - middle, 3 - low, 4 - none
        status: 1, // status: 1 - active, 3 - done
        text: ''
      }
    };
  }
  componentDidMount() {
    const { logType, logsState: { dates } } = this.props;
    const currentLogDate = dates[logType] && dates[logType].format('L');
    document
      .getElementById('new-task')
      .scrollIntoView({ block: 'nearest' });
    this.setState({
      task: {
        ...this.state.task,
        logType,
        date: currentLogDate
      }
    });
  }
  handleTextArea = ({ target }) => {
    this.setState({
      isTaskChanged: true,
      task: { ...this.state.task, text: target.value }
    });
  };
  markTask = (mark) => () => {
    this.setState({ task: { ...this.state.task, mark } });
  };
  onSave = () => {
    this.props.saveNewTask(this.state.task);
    this.props.closeNewTask();
  };
  onCancel = () => {
    this.props.closeNewTask();
  };
  render() {
    const { isTaskChanged, task: { mark, text } } = this.state;
    return (
      <MDBContainer id="new-task">
        <MDBCard>
          <MDBCardBody>
            <MDBIcon
              className="edit-task-close-icon"
              icon="times"
              onClick={this.onCancel}
            />
            <div className={`status-line status-line-top mark-${mark}`} />
            <div className="form-group mb-12">
              <textarea
                autoFocus
                className="form-control"
                onChange={this.handleTextArea}
                rows="5"
                value={text}
              />
            </div>
            <MDBBtnGroup className="btn-group-width-100">
              <MDBBtn
                className="edit-task-btn"
                color="blue-grey"
                disabled={!isTaskChanged || !text.trim()}
                onClick={this.onSave}
                outline
                size="sm"
              >
                save
              </MDBBtn>
              <MDBDropdown dropup>
                <MDBDropdownToggle caret outline color="blue-grey" size="sm">
                  mark
                </MDBDropdownToggle>
                <MDBDropdownMenu basic className="dropdown-left-100">
                  <MDBDropdownItem onClick={this.markTask(1)}>
                    <MDBIcon
                      className="mr-2 icon-red"
                      far
                      icon="circle"
                      size="xs"
                    />
                    High priority
                  </MDBDropdownItem>
                  <MDBDropdownItem onClick={this.markTask(2)}>
                    <MDBIcon
                      className="mr-2 icon-orange"
                      far
                      icon="circle"
                      size="xs"
                    />
                    Medium priority
                  </MDBDropdownItem>
                  <MDBDropdownItem onClick={this.markTask(3)}>
                    <MDBIcon
                      className="mr-2 icon-grey"
                      far
                      icon="circle"
                      size="xs"
                    />
                    Low priority
                  </MDBDropdownItem>
                  <MDBDropdownItem onClick={this.markTask(4)}>
                    <MDBIcon
                      className="mr-2 icon-transparent"
                      far
                      icon="circle"
                      size="xs"
                    />
                    No mark
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBBtnGroup>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    );
  }
}
