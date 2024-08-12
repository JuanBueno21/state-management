import React from "react";

const SECURITY_CODE = "paradigma";

function UseState({ name }) {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  console.log(value);

  React.useEffect(() => {
    console.log("empezando efecto")

    if (!!loading) {
      setTimeout(() => {
        console.log("haciendo validacion")

        if (value === SECURITY_CODE) {
          setLoading(false);
        } else {
          setError(true);
          setLoading(false);
        }

        console.log("terminando validacion")
      }, 3000);
    }

    console.log("terminando efecto")
  }, [loading]);

  return (
    <div>
      <h2>Eliminar {name}</h2>
      <p>Por favor escribe el codigo de seguridad.</p>

      {error && (
        <p>Error: el codigo es  incorrecto</p>
      )}

      {loading && (
        <p>Cargando...</p>
      )}

      <input placeholder="Codigo de seguridad"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }} />
      <button onClick={() => {
        setLoading(true)
        setError(false)
      }} >
        Comprobar </button>
      <hr></hr>
    </div>
  )
}

export { UseState };