import React from "react";

const SECURITY_CODE = "paradigma";

function UseState({ name }) {
  const [state, setState] = React.useState({
    value: "",
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
  });

  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  console.log(state);

  React.useEffect(() => {
    console.log("empezando efecto")

    if (!!state.loading) {
      setTimeout(() => {
        console.log("haciendo validacion")

        if (state.value === SECURITY_CODE) {
          setState({
            ...state,
            error: false,
            loading: false,
            confirmed: true,
          });
        } else {
          setState({
            ...state,
            error: true,
            loading: false,
          })

        }

        console.log("terminando validacion")
      }, 3000);
    }

    console.log("terminando efecto")
  }, [state.loading]);

  if (!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Por favor escribe el codigo de seguridad.</p>

        {(state.error) && (
          <p>Error: el codigo es  incorrecto</p>
        )}

        {(state.loading) && (
          <p>Cargando...</p>
        )}

        <input placeholder="Codigo de seguridad"
          value={state.value}
          onChange={(event) => {
            setState({
              ...state,
              value: event.target.value,
            })
          }} />
        <button onClick={() => {
          // setError(false) // ESTE FUE 
          setState({
            ...state,
            loading: true,
          })
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
          setState({
            ...state,
            deleted: true,
          })
        }}>Si, eliminar</button>

        <button onClick={() => {
          setState({
            ...state,
            confirmed: false,
            value: "",
          })
        }}>No eliminar</button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <p>Eliminado con exito!!</p>

        <button onClick={() => {
          setState({
            ...state,
            confirmed: false,
            deleted: false,
            value: "",
          })
        }}>Regresar atras.</button>

      </React.Fragment>
    );
  }
}

export { UseState };