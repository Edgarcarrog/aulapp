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
    case "SET-GROUP":
      return {
        ...state,
        actualGroup: action.payload,
      };
      case "CHANGE-ACTUALIZETABLE":
      return {
        ...state,
        actualizeTable: !state.actualizeTable,
      };
    default:
      return state;
  }
};

export default reducer;
