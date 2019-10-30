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

export default class EditTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTaskChanged: false,
      style: '',
      task: {}
    };
  }
  componentDidMount() {
    this.setState({ task: this.props.logsState.currentTask });
    document
      .getElementById('edit-task')
      .scrollIntoView({ block: 'nearest' });
  }
  handleTextArea = ({ target }) => {
    this.setState({
      isTaskChanged: true,
      task: { ...this.state.task, text: target.value }
    });
  };
  markTask = (mark) => () => {
    this.setState({
      isTaskChanged: true,
      task: { ...this.state.task, mark }
    });
  };
  onSave = () => {
    this.props.editTask(this.state.task);
    this.props.setCurrentTask({});
  };
  setStatus = (status) => () => {
    const editedTask = { ...this.state.task };
    switch (status) {
      case 'done': {
        editedTask.status = 3;
        editedTask.inProgress = false;
        break;
      }
      case 'notDone': {
        editedTask.status = 1;
        editedTask.inProgress = false;
        break;
      }
      case 'inProgress': {
        editedTask.status = 1;
        editedTask.inProgress = true;
      }
    }
    this.props.editTask(editedTask);
    this.props.setCurrentTask({});
  };
  onDelete = (id) => () => {
    this.props.deleteTask(id);
    this.props.setCurrentTask({});
  };
  migrateToFutureLog = () => {
    const taskForMigration = { ...this.state.task };
    taskForMigration.logType = 'future';
    taskForMigration.date = null;
    this.props.editTask(taskForMigration);
    this.props.setCurrentTask({});
  };
  setMigrateData = (newLogType) => () => {
    this.props.setMigrateData(this.state.task, newLogType);
    this.props.toggleMigrateDatepicker(newLogType);
  };
  onCancel = () => {
    this.props.setCurrentTask({});
  };
  render() {
    const {
      isTaskChanged,
      task: { id, inProgress, mark, status, text }
    } = this.state;
    const isDone = status === 3;
    return (
      <MDBContainer id="edit-task">
        <MDBCard className="mb-2">
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
              {!isDone && (
                <MDBBtn
                  className="edit-task-btn"
                  onClick={this.setStatus('done')}
                  outline color="blue-grey"
                  size="sm"
                >
                  done
                </MDBBtn>
              )}
              {isDone && (
                <MDBBtn
                  className="edit-task-btn"
                  onClick={this.setStatus('notDone')}
                  outline color="blue-grey"
                  size="sm"
                >
                  not done
                </MDBBtn>
              )}
              {!inProgress && (
                <MDBBtn
                  className="edit-task-btn"
                  onClick={this.setStatus('inProgress')}
                  outline color="blue-grey"
                  size="sm"
                >
                in progress
                </MDBBtn>
              )}
              {inProgress && (
                <MDBBtn
                  className="edit-task-btn"
                  onClick={this.setStatus('notDone')}
                  outline color="blue-grey"
                  size="sm"
                >
                  not in progress
                </MDBBtn>
              )}
              <MDBBtn
                className="edit-task-btn"
                onClick={this.onDelete(id)}
                outline color="blue-grey"
                size="sm"
              >
                <span className="red-text">delete</span>
              </MDBBtn>
            </MDBBtnGroup>
            <MDBBtnGroup className="btn-group-width-100">
              <MDBDropdown dropup>
                <MDBDropdownToggle
                  caret
                  className="width-141"
                  outline color="blue-grey"
                  size="sm"
                >
                  mark
                </MDBDropdownToggle>
                <MDBDropdownMenu basic>
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
              <MDBDropdown dropup>
                <MDBDropdownToggle
                  caret
                  className="width-141"
                  color="blue-grey"
                  outline
                  size="sm"
                >
                  migrate to
                </MDBDropdownToggle>
                <MDBDropdownMenu basic className="dropdown-left-30">
                  {this.props.logType !== 'future' && (
                    <MDBDropdownItem onClick={this.migrateToFutureLog}>
                      Future Log
                    </MDBDropdownItem>
                  )}
                  <MDBDropdownItem onClick={this.setMigrateData('monthly')}>
                    Monthly Log
                  </MDBDropdownItem>
                  <MDBDropdownItem onClick={this.setMigrateData('weekly')}>
                    Weekly Log
                  </MDBDropdownItem>
                  <MDBDropdownItem onClick={this.setMigrateData('daily')}>
                    Daily Log
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBBtnGroup>
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
            </MDBBtnGroup>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    );
  }
}
