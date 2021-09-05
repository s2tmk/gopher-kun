import { Button } from "@chakra-ui/react";
import { useStickyContext } from "../states/Provider";
import { FaPlus } from "react-icons/fa";

export const MemoAddButton = () => {
  const { dispatchers } = useStickyContext();

  const _onClick = () => {
    dispatchers.create();
  };

  return (
    <Button
      w="64px"
      h="64px"
      justifyContent="center"
      alignItems="center"
      borderRadius="50%"
      boxShadow="2px 2px 8px black"
      bgColor="#333"
      color="white"
      onClick={_onClick}
    >
      <FaPlus />
    </Button>
  );
};
