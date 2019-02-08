import { useReducer, useEffect } from 'react';

const SET_DATA = 'SET_DATA';
const SET_ERROR = 'SET_ERROR';
const FIRE = 'FIRE';

const asyncReducer = (state, action) => {
  switch (action.type) {
  case SET_DATA:
    return {
      error: null,
      pending: false,
      data: action.mergeStrategy(state.data, action.data),
    };
  case SET_ERROR:
    return { data: null, error: action.error, pending: false };
  case FIRE:
    return { data: state.data, error: null, pending: true };
  default:
    return state;
  }
};

const defaultMergeStrategy = (_, newData) => newData;

const usePromise = (_fire, { variables: _vars } = {}) => {
  const [{ data, error, pending }, dispatch] =
    useReducer(asyncReducer, { data: null, error: null, pending: true });
  const setData = ({ data, mergeStrategy }) => dispatch({ type: SET_DATA, data, mergeStrategy });
  const setError = error => dispatch({ type: SET_ERROR, error });
  const fire = ({ variables = _vars, mergeStrategy = defaultMergeStrategy } = {}) => {
    dispatch({ type: FIRE });
    _fire(variables)
      .then((data) => {
        setData({ data, mergeStrategy });
      })
      .catch(setError);
  };
  useEffect(fire, []);
  return [data, error, pending, fire];
};

export default usePromise;
