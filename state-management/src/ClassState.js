import React from "react";
import { Loading } from "./loading"

class ClassState extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: true,
      loading: false,
    };
  }

  // UNSAFE_componentWillMount() {
  //   console.log("UNSAFE_componentWillMount")
  // }

  // componentDidMount() {
  //   console.log("componentDidMount")
  // }

  componentDidUpdate() {
    console.log("actualizacion")

    if (!!this.state.loading) {
      setTimeout(() => {
        console.log("haciendo validacion")
  
        this.setState({loading: false});
  
  
        console.log("terminando validacion")
      }, 3000);
    }
  }

  render() {
    return (
      <div>
        <h2>Eliminar {this.props.name}</h2>

        <p>Por favor escribe el codigo de  seguridad.</p>

        {this.state.error && (
          <p>Error: el codigo es incorrecto</p>
        )}
        {this.state.loading && (
          <Loading />
        )}

        <input placeholder="Codigo de seguridad" />
        <button onClick={() => this.setState({ loading: true })}
        >Comprobar</button>
      </div>
    )
  }
}

export { ClassState };