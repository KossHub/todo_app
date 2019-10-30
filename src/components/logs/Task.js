import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBContainer,
  MDBIcon
} from 'mdbreact';
import React from 'react';

export default function Task({ setCurrentTask, task }) {
  const { inProgress, mark, status, text } = task;
  const isDone = status === 3;
  const selectTask = (task) => () => {
    setCurrentTask(task);
  };
  return (
    <MDBContainer onClick={selectTask(task)}>
      <MDBCard className="mb-2 task-card">
        <MDBCardBody>
          <div className={`status-line mark-${mark}`} />
          <MDBCardText
            className={`task-text${isDone ? ' line-through' : ''}`}>
            {isDone && <MDBIcon icon="check-circle mr-1" size="lg" />}
            {inProgress && <MDBIcon icon="hourglass-half mr-1" size="lg" />}
            {text}
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}
