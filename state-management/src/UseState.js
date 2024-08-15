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

  const onConfirm = () => {
    setState({
      ...state,
      error: false,
      loading: false,
      confirmed: true,
    });
  }

  const onError = () => {
    setState({
      ...state,
      error: true,
      loading: false,
    });
  }

  const onWrite = (newValue) => {
    setState({
      ...state,
      value: newValue,
    });
  }

  const onCheck = () => {
    setState({
      ...state,
      loading: true,
    });
  }

  const onDelete = () => {
    setState({
      ...state,
      deleted: true,
    });
  }

  const onReset = () => {
    setState({
      ...state,
      confirmed: false,
      deleted: false,
      value: "",
    });
  }

  // const [value, setValue] = React.useState("");
  // const [error, setError] = React.useState(false);
  // const [loading, setLoading] = React.useState(false);

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

        {(state.error) && (
          <p>Error: el codigo es  incorrecto</p>
        )}

        {(state.loading) && (
          <p>Cargando...</p>
        )}

        <input placeholder="Codigo de seguridad"
          value={state.value}
          onChange={(event) => {
            onWrite(event.target.value);
          }} />
        <button onClick={() => {
          onCheck();
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
          onDelete();
        }}>Si, eliminar</button>

        <button onClick={() => {
          onReset();
        }}>No eliminar</button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <p>Eliminado con exito!!</p>

        <button onClick={() => {
          onReset();
        }}>Regresar atras.</button>

      </React.Fragment>
    );
  }
}

export { UseState };