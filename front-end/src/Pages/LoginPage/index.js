import styled from "styled-components";
import { AccountBox } from "./accountBox";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // background: rgb(182,217,227);
  // background: radial-gradient(circle, rgba(182,217,227,1) 0%, rgba(182,217,227,1) 50%, rgba(150,160,162,1) 100%);
`;

function App() {
  return ( 
    <AppContainer>
      <h1>Human Resource Management System</h1>
      <AccountBox />
    </AppContainer>
  );
}

export default App;