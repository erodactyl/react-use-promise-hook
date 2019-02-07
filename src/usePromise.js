import { useReducer, useEffect } from 'react';

const SET_DATA = 'SET_DATA';
const SET_ERROR = 'SET_ERROR';
const FIRE = 'FIRE';

const asyncReducer = (state, action) => {
  switch (action.type) {
  case SET_DATA:
    return { ...state, data: action.data, error: null, pending: false };
  case SET_ERROR:
    return { ...state, data: null, error: action.error, pending: false };
  case FIRE:
    return { ...state, data: null, error: null, pending: true };
  default:
    return state;
  }
};

const usePromise = (_fire) => {
  const [{ data, error, pending }, dispatch] =
    useReducer(asyncReducer, { data: null, error: null, pending: true });
  const setData = data => dispatch({ type: SET_DATA, data });
  const setError = error => dispatch({ type: SET_ERROR, error });
  const fire = () => {
    dispatch({ type: FIRE });
    _fire()
      .then(setData)
      .catch(setError);
  };
  useEffect(fire, []);
  return [data, error, pending, fire];
};

export default usePromise;
