import { type } from "@testing-library/user-event/dist/type";
import React from "react";

const SECURITY_CODE = "paradigma";

// USO DEL REDUCER 
function UseReducer({ name }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const onConfirm = () => {
    dispatch({ type: actionType.confirm })
  }

  const onError = () => {
    dispatch({ type: actionType.error })
  }

  const onWrite = ({ target: { value } }) => {
    dispatch({ type: actionType.write, payload: value });
  }

  const onCheck = () => {
    dispatch({ type: actionType.check });
  }

  const onDelete = () => {
    dispatch({ type: actionType.delete });
  }

  const onReset = () => {
    dispatch({ type: actionType.reset });
  }

  React.useEffect(() => {
    console.log("empezando efecto");

    if (!!state.loading) {
      setTimeout(() => {
        console.log("haciendo validacion");

        if (state.value === SECURITY_CODE) {
          onConfirm();
        } else {
          onError();
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
          onChange={onWrite}
        />
        <button onClick={onCheck}> Comprobar </button>
        <hr></hr>
      </div>
    );
  } else if (!!state.confirmed && !state.deleted) {
    return (
      <React.Fragment>
        <p>Pedimos confirmacion. ¿Estas seguro?</p>
        <button onClick={onDelete}> Si, eliminar </button>

        <button onClick={onReset}> No eliminar </button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <p>Eliminado con exito!!</p>
        <button onClick={onReset}> Regresar atras </button>
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

const actionType = {
  confirm: "CONFIRM",
  error: "ERROR",
  delete: "DELETE",
  write: "WRITE",
  reset: "RESET",
  check: "CHECK",
};

// FORMA # 3 DE REDUCER:
const reducerObject = (state, payload) => ({
  [actionType.confirm]: {
    ...state,
    error: false,
    loading: false,
    confirmed: true,
  },

  [actionType.error]: {
    ...state,
    error: true,
    loading: false,
  },

  [actionType.write]: {
    ...state,
    value: payload
  },

  [actionType.check]: {
    ...state,
    loading: true,
  },

  [actionType.delete]: {
    ...state,
    deleted: true,
  },

  [actionType.reset]: {
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