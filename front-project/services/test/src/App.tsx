import logo from "./logo.svg";
import "./App.css";
import { vars, classes } from "@fastcampus/themes";
import styled from "@emotion/styled";

function App() {
  console.log("t", classes.typography.heading);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Text>
          Edit <code>src/App.tsx</code> and save to reload.
        </Text>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

const Text = styled.p`
  ${classes.typography.heading["4xl"]}
  color: ${vars.colors.$static.light.red["500"]};
`;
// className='heading4xl' 이런식으로도 적용 가능
export default App;
