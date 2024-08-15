const initialState = {
  value: "",
  error: false,
  loading: false,
  deleted: false,
  confirmed: false,
};

// FORMA SIMPLE:
// const reducer = (state, action) => {
// } 

// FORMA # 1 DE REDUCER: usando condicional "if"
const reducerIf = (state, action) => {
  if (action.type === "ERROR") {
    return {
      ...state,
      error: true,
      loading: false,
    };
  } else if (action.type === "CHECK") {
    return {
      ...state,
      loading: true,
    };
  } else {
    return {
      ...state,
    };
  }
};

// FORMA # 2 DE REDUCER: usando condicional "Switch" (comun)
const reducerSwitch = (state, action) => {
  switch (action.type) {
    case "ERROR":
      return {
        ...state,
        error: true,
        loading: false,
      };
    case "CHECK":
      return {
        ...state,
        loading: true,
      };
    default:
      return {
        ...state,
      };
  }
};

// FORMA # 3 DE REDUCER:
const reducerObject = (state) => ({
  "ERROR": {
    ...state,
    error: true,
    loading: false,
  },
  "CHECK": {
    ...state,
    loading: false,
  },
});

const reducer = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state)[action.type];
  } else {
    return state;
  }
}