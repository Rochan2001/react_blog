import * as ActionTypes from "./ActionTypes";

export const Comments = (
  state = {
    errMess: null,
    comments: [],
  },
  action
) => {
  switch (action.type) {

    case ActionTypes.ADD_COMMENTS:
      return{
        ...state,
        isLoading: false,
        comments: action.payload,
        errMess: null
      }

    case ActionTypes.COMMENTS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        comments: [],
      };

    case ActionTypes.ADD_COMMENT:
      var comment = action.payload;
      return { ...state, comments: state.comments.concat(comment) };

    case ActionTypes.DELETE_COMMENT:
      var docId = action.payload;
      var newComments = state.comments.filter((comment) => comment._id !== docId);
      return { ...state, comments: newComments };

    default:
      return state;
  }
};
