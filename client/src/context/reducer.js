const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        user: action.payload.user,
        isLoggedIn: true,
      };
    case "LOG_USER":
      return {
        ...state,
        isLoggedIn: true,
      };
    case "DELETE_USER":
      return {
        ...state,
        user: null,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default reducer;
