import React from "react";

const SECURITY_CODE = "paradigma";

function UseState({ name }) {
  const [state, setState] = React.useState({
    value: "",
    error: false,
    loading: false,
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
  )
}

export { UseState };