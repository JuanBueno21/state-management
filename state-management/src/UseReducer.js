import React from "react";

const SECURITY_CODE = "paradigma";

// USO DEL REDUCER 
function UseReducer({ name }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  console.log(state);

  // const onWrite = (newValue) => {
  //   setState({
  //     ...state,
  //     value: newValue,
  //   });
  // }

  React.useEffect(() => {
    console.log("empezando efecto");

    if (!!state.loading) {
      setTimeout(() => {
        console.log("haciendo validacion");

        if (state.value === SECURITY_CODE) {
          dispatch({ type: "CONFIRM" });
        } else {
          dispatch({ type: "ERROR" });
        }

        console.log("terminando validacion");
      }, 3000);
    }

    console.log("terminando efecto");
  }, [state.loading]);

  if (!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Por favor escribe el codigo de seguridad.</p>

        {(state.error && !state.loading) && (
          <p>Error: el codigo es  incorrecto</p>
        )}

        {state.loading && (
          <p>Cargando...</p>
        )}

        <input placeholder="Codigo de seguridad"
          value={state.value}
          onChange={(event) => {
            dispatch({ type: "WRITE", payload: event.target.value});
            // onWrite(event.target.value);
          }} />
        <button onClick={() => {
          dispatch({ type: "CHECK" });
          // onCheck();
        }} >
          Comprobar </button>
        <hr></hr>
      </div>
    );
  } else if (!!state.confirmed && !state.deleted) {
    return (
      <React.Fragment>
        <p>Pedimos confirmacion. ¿Estas seguro?</p>
        <button onClick={() => {
          dispatch({ type: "DELETE" });
          // onDelete();
        }}>Si, eliminar</button>

        <button onClick={() => {
          dispatch({ type: "RESET" });
          // onReset();
        }}>No eliminar</button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <p>Eliminado con exito!!</p>
        <button onClick={() => {
          dispatch({ type: "RESET" });
          // onReset();
        }}> Regresar atras. </button>
      </React.Fragment>
    );
  }
}



const initialState = {
  value: "",
  error: false,
  loading: false,
  deleted: false,
  confirmed: false,
};

// FORMA # 3 DE REDUCER:
const reducerObject = (state, payload) => ({
  "CONFIRM": {
    ...state,
    error: false,
    loading: false,
    confirmed: true,
  },

  "ERROR": {
    ...state,
    error: true,
    loading: false,
  },

  "WRITE": {
    ...state,
    value: payload
  },

  "CHECK": {
    ...state,
    loading: true,
  },

  "DELETE": {
    ...state,
    deleted: true,
  },

  "RESET": {
    ...state,
    confirmed: false,
    deleted: false,
    value: "",
  },

});

const reducer = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state, action.payload)[action.type];
  } else {
    return state;
  }
};

export { UseReducer };