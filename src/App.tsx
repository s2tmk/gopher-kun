import { Flex } from "@chakra-ui/react";
import { Gopher } from "components/Gopher";
import { ContextProvider } from "./states/Provider";
import firebase from "../firebase-config";
import "./App.css";
import { MemoAddButton } from "components/MemoAddButton";
import { StickyMemo } from "components/StickyMemo";

function App() {
  return (
    <ContextProvider>
      <Flex
        w="100vw"
        h="100vh"
        justifyContent="center"
        alignItems="center"
        className="App"
      >
        <MemoAddButton />
        <Gopher />
      </Flex>
      <StickyMemo />
    </ContextProvider>
  );
}

export default App;
