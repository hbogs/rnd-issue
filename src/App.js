import React from "react";
import { render } from "react-dom";
import Rnd from "react-rnd";

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "#f0f0f0"
};

const VisibleWrapper = props => {
  if (!props.visible) {
    return null;
  }

  return (
    <Rnd
      style={style}
      default={{
        x: 0,
        y: 0,
        width: 200,
        height: 200
      }}
    >
      {props.children}
    </Rnd>
  );
};

/**
 * Uncomment this line: if (!this.state.isMounted) return createElement('div', null); in the source (currently at line 427), and the logs will work withouth the timeouts
 */
class App extends React.Component {
  state = {
    visible: true
  };

  componentDidMount() {
    console.log("componentDidMount -> does not work (undefined)", this.myRef);

    setTimeout(() => {
      console.log("componentDidMount -> workaround with timeout, works", this.myRef);
    },100);
  }

  componentDidUpdate() {
    // These will only work when visible state is true though, but that is expected. Only log to console to avoid "falsy" messages
    if (this.state.visible) {

      console.log("componentDidUpdate -> does not work (null)", this.myRef);

      setTimeout(() => {
        console.log("componentDidUpdate - workaround with timeout, works when visible", this.myRef);
      }, 100);
    }
  }

  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.setState({ visible: !this.state.visible });
          }}
        >
          Toggle visibility
        </button>
        <div>
          <VisibleWrapper visible={this.state.visible}>
            <div ref={x => (this.myRef = x)}>some content</div>
          </VisibleWrapper>
        </div>

      </div>
    );
  }
}

render(<App />, document.getElementById("root"));


export default App;
