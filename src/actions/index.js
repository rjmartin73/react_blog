import _ from 'lodash'
import jsonPlaceholder from '../apis/jsonPlaceholder';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts());

    _.chain(getState().posts)
        .map('userId')
        .uniq()
        .forEach(id => dispatch(fetchUser(id)))
        .value();
};

export const fetchPosts = () => async dispatch => {
    const response = await jsonPlaceholder.get('/posts');

    dispatch({ type: 'FETCH_POSTS', payload: response.data });
};

export const fetchUser = (id) => async dispatch => {
    const response = await jsonPlaceholder.get(`/users/${id}`);

    dispatch({ type: 'FETCH_USER', payload: response.data });
};

/**
 * _memoize allows a function to be called once, and store the results
 * so the function result only needs to run, prevents multiple call
 *  to the api for each user
 */
// export const fetchUser = (id) => dispatch => {
//     _fetchUser(id, dispatch);
// };
// const _fetchUser = _.memoize(async (id, dispatch) => {
//     const response = await jsonPlaceholder.get(`/users/${id}`);    

//     dispatch({ type: 'FETCH_USER', payload: response.data });
// });