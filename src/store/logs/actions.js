import logsApi from '../../api/logsApi';

export const DECREASE_PENDING_REQUESTS = 'DECREASE_PENDING_REQUESTS';
export const INCREASE_PENDING_REQUESTS = 'INCREASE_PENDING_REQUESTS';
export const SET_CURRENT_TASK = 'SET_CURRENT_TASK';
export const SET_LOG_DATE = 'SET_LOG_DATE';
export const SET_MIGRATE_DATA = 'SET_MIGRATE_DATA';
export const SET_TASKS = 'SET_TASKS';
export const THROW_SERVER_ERROR = 'THROW_SERVER_ERROR';

export const setCurrentTask = (task) => ({
  type: SET_CURRENT_TASK, payload: task
});
export const setLogDate = (data) => ({
  type: SET_LOG_DATE, payload: data
});
export const getTasks = () => {
  return (dispatch) => {
    dispatch({ type: INCREASE_PENDING_REQUESTS });
    logsApi.getTasks()
      .then((response) => {
        dispatch({ type: SET_TASKS, payload: response.data.tasks });
      })
      .catch(() => dispatch({ type: THROW_SERVER_ERROR }))
      .finally(() => dispatch({ type: DECREASE_PENDING_REQUESTS }));
  };
};
export const addTask = (task) => {
  return (dispatch, getState) => {
    dispatch({ type: INCREASE_PENDING_REQUESTS });
    logsApi.addTask(task)
      .then((response) => {
        const newTasks = getState().logsState.tasks;
        newTasks.push(response.data.task);
        dispatch({ type: SET_TASKS, payload: newTasks });
      })
      .catch(() => dispatch({ type: THROW_SERVER_ERROR }))
      .finally(() => dispatch({ type: DECREASE_PENDING_REQUESTS }));
  };
};
export const editTask = (task) => {
  return (dispatch, getState) => {
    dispatch({ type: INCREASE_PENDING_REQUESTS });
    logsApi.editTask(task)
      .then(() => {
        const newTasks = getState().logsState.tasks;
        const i = newTasks.findIndex((item) => item.id === task.id);
        newTasks[i] = task;
        dispatch({ type: SET_TASKS, payload: newTasks });
      })
      .catch(() => dispatch({ type: THROW_SERVER_ERROR }))
      .finally(() => dispatch({ type: DECREASE_PENDING_REQUESTS }));
  };
};
export const removeTask = (id) => {
  return (dispatch, getState) => {
    dispatch({ type: INCREASE_PENDING_REQUESTS });
    logsApi.removeTask(id)
      .then(() => {
        const newTasks = getState().logsState.tasks;
        const filteredTasks = newTasks.filter((task) => task.id !== id);
        dispatch({ type: SET_TASKS, payload: filteredTasks });
      })
      .catch(() => dispatch({ type: THROW_SERVER_ERROR }))
      .finally(() => dispatch({ type: DECREASE_PENDING_REQUESTS }));
  };
};
export const setMigrateData = (taskToMigrate, newLogType) => ({
  type: SET_MIGRATE_DATA,
  payload: { taskToMigrate, newLogType }
});
