const { NotificatioActionType } = require("./action");

const {
  GET_NOTIFICATIONS,
  OPEN_CONNECTION,
  GET_CONNECTION,
  ADD_NOTIFICATION,
} = NotificatioActionType;

const initialState = {
  
  notificationMassages: [],
  count: 0,
  connection:null
};

const NotificationReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_NOTIFICATIONS:

    return{
      ...state,
      notificationMassages: action.payload

    }
   
    case ADD_NOTIFICATION:
      return {
        ...state,
        notificationMassages: [action.payload,...state.notificationMassages],
        
      };

    default:
      return state;
  }
};

export default NotificationReducer;
