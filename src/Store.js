import React from "react";
import io from "socket.io-client";

export const CTX = React.createContext();

/*

  What object do we expect in store

  msg {
    from: 'user'
    msg: 'hi'
    topic: 'topic1'
  }

  state {
    general: [
      {msg},{msg},{msg}
    ]
    topic2: [
      {msg},{msg},{msg}
    ]
  }
*/

const initState = {
  General: [],
  Working: [],
  NSFW: []
};

function reducer(state, action) {
  // Refactoring by pulling consts from the payload
  const { from, msg, topic } = action.payload;
  switch (action.type) {
    case "RECEIVE_MESSAGE":
      return {
        ...state,
        [topic]: [
          ...state[topic],
          {
            from,
            msg
          }
        ]
      };
    default:
      return state;
  }
}

let socket;

function sendChatAction(value) {
  socket.emit("chat message", value);
}

const Store = props => {
  const [allChats, dispatch] = React.useReducer(reducer, initState);

  // Creation of socket.io client by reaching the port 3001
  if (!socket) {
    socket = io(":3001");
    // We're listening to the broadcast
    socket.on("chat message", function(msg) {
      dispatch({ type: "RECEIVE_MESSAGE", payload: msg });
    });
  }

  return (
    // We're passing to our provider multiple stuff by adding multiples objects in one
    <CTX.Provider value={{ allChats, sendChatAction }}>
      {props.children}
    </CTX.Provider>
  );
};

export default Store;
