import axios from 'axios';

/* selectors */
export const getAll = ({ posts }) => posts.data;
export const getById = ({ posts }, id) => {
  const filtered = posts.data.filter((post) => post._id === id);
  return filtered.length ? filtered[0] : { error: true };
};

/* action name creator */
const reducerName = 'posts';
const createActionName = (name) => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const ADD_POST = createActionName('ADD_POST');
const EDIT_POST = createActionName('EDIT_POST');

/* action creators */
export const fetchStarted = (payload) => ({ payload, type: FETCH_START });
export const fetchSuccess = (payload) => ({ payload, type: FETCH_SUCCESS });
export const fetchError = (payload) => ({ payload, type: FETCH_ERROR });

export const addPost = (payload) => ({ payload, type: ADD_POST });
export const editPost = (payload) => ({ payload, type: EDIT_POST });

/* thunk creators */

export const fetchPublished = () => {
  return (dispatch, getState) => {
    try {
      const { posts } = getState();
      if (!posts.data.length || posts.loading.active === false) {
        dispatch(fetchStarted());
        axios.get('http://localhost:8000/api/posts').then((res) => {
          dispatch(fetchSuccess(res.data));
        });
      }
    } catch (err) {
      dispatch(fetchError(err.message));
    }
  };
};

export const addPostRequest = post => {
  return async (dispatch) => {
    try {
      dispatch(fetchStarted());
      const res = await axios.post('http://localhost:8000/api/posts', post);
      dispatch(addPost(res.data));
    } catch (err) {
      dispatch(fetchError(err.message));
    }
  };
};

export const editPostRequest = post => {
  return async (dispatch) => {
    try {
      dispatch(fetchStarted());
      const res = await axios.put('http://localhost:8000/api/posts/' + post._id, post);
      dispatch(editPost(res.data));
    } catch (err) {
      dispatch(fetchError(err.message));
    }
  };
};


/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    case ADD_POST: {
      return {
        ...statePart,
        data: [...statePart.data, action.payload],
        loading: {
          active: false,
          error: false,
        },
      };
    }
    case EDIT_POST: {
      return {
        ...statePart,
        data: statePart.data.map(post => post._id === action.payload._id ? { ...action.payload } : post),
        loading: {
          active: false,
          error: false,
        },
      };
    }
    default:
      return statePart;
  }
};
