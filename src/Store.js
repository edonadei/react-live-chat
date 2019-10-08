import React from "react";
import io from 'socket.io-client'

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
  General: [
    { from: "aaron", msg: "hello" },
    { from: "arnold", msg: "hello" },
    { from: "franklin", msg: "hello" }
  ],
  NSFW: [
    { from: "patoche", msg: "hello" },
    { from: "onche", msg: "hello" },
    { from: "plouk", msg: "hello" }
  ]
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

const Store = props => {

  // Creation of socket.io client by reaching the port 3001
  if (!socket) {
    socket = io(':3001')
  }

  const [allChats] = React.useReducer(reducer, initState);

  return (
    // We're passing to our provider multiple stuff by adding multiples objects in one
    <CTX.Provider value={{allChats}}>
      {props.children}
    </CTX.Provider>
  );
};

export default Store;
