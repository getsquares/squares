// Set actions, mutations and initial state
/*const actions = {
  saySomething(context, payload) {
    console.log(payload.hello);
    context.commit("setMessage", payload.value);
  },
};*/

const mutations = {
  setMessage(state, payload) {
    state.an_array.push("payload");

    console.log(state);

    return state;
  },
};

const initialState = {
  message: {
    another: "what",
    test: "haha",
  },
  nest: {
    anotehr: "ahasd",
  },
  an_array: [],
};

// Create our store instance
/*const store = new StoreClass({
  actions,
  mutations,
  initialState,
});*/

// Grab the textearea and dispatch the action on 'input'
const textElement = document.querySelector("textarea");

textElement.addEventListener("input", () => {
  // Dispatch the action, which will subsequently pass this message to the mutation
  // which in turn, updates the store's state
  store.dispatch("saySomething", {
    value: textElement.value.trim(),
    hello: "aaa",
  });
});

// Grab the text element and attach it to the stateChange event
const messageElement = document.querySelector(".js-message-element");

// This fires every time the state updates
store.subscribe((state) => {
  console.log("ok");
  console.log(state);
  //messageElement.innerText = state.an_array.push("test");
});
