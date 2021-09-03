import { Flex } from "@chakra-ui/react";
import { Gopher } from "components/Gopher";
import "./App.css";

function App() {
  return (
    <Flex
      w="100vw"
      h="100vh"
      justifyContent="center"
      alignItems="center"
      className="App"
    >
      <Gopher />
    </Flex>
  );
}

export default App;
