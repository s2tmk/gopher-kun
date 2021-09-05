import { useRef, useEffect } from "react";
import { useStickyContext } from "states/Provider";
import { Sticky } from "states/sticky/types";
import { CustomRnd } from "./CustomRnd";
import { Flex, Box, Button, Textarea } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { MdFlipToFront, MdFlipToBack } from "react-icons/md";
import { css } from "@emotion/react";

export const StickyMemo = () => {
  const { state, dispatchers } = useStickyContext();
  const refState = useRef(state);

  useEffect(() => {
    refState.current = state;
  }, [state]);

  useEffect(() => {
    (async () => {
      await dispatchers.read();

      setInterval(() => {
        localStorage.setItem(
          "ForYourFocusTime",
          JSON.stringify(refState.current)
        );
      }, 10000);
    })();
    // eslint-disable-next-line
  }, []);

  const _onChangeText = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    sticky: Sticky
  ) => {
    dispatchers.update({ ...sticky, comment: event.target.value });
  };

  const moveFlip = (sticky: Sticky, position: "front" | "back") => {
    dispatchers.sort(sticky, position);
  };

  const confirmDelete = (sticky: Sticky) => {
    if (window.confirm("本当に削除しても良いですか？")) {
      dispatchers.delete(sticky.id);
    }
  };

  return (
    <>
      {state.map((sticky: Sticky) => {
        return (
          <CustomRnd sticky={sticky} dispatchers={dispatchers} key={sticky.id}>
            <Flex
              px="8px"
              minHeight="32px"
              justifyContent="flex-end"
              alignItems="center"
            >
              <Button
                bgColor="transparent"
                border="0"
                cursor="pointer"
                onClick={() => moveFlip(sticky, "front")}
              >
                <MdFlipToFront size={16} color="white" />
              </Button>
              <Button
                bgColor="transparent"
                border="0"
                cursor="pointer"
                onClick={() => moveFlip(sticky, "back")}
              >
                <MdFlipToBack size={16} color="white" />
              </Button>
              <Button
                bgColor="transparent"
                border="0"
                cursor="pointer"
                onClick={() => confirmDelete(sticky)}
              >
                <FaTrash color="white" />{" "}
              </Button>
            </Flex>
            <Box
              w="100%"
              boxSizing="border-box"
              bgColor="yellow.100"
              css={css`
                height: calc(100% - 32px);
              `}
            >
              <Textarea
                border="0"
                w="100%"
                h="100%"
                boxSizing="border-box"
                outline="none"
                resize="none"
                bgColor="yellow.100"
                onFocus={() => moveFlip(sticky, "front")}
                onChange={(e) =>
                  _onChangeText(
                    e as React.ChangeEvent<HTMLTextAreaElement>,
                    sticky
                  )
                }
                defaultValue={sticky.comment}
              />
            </Box>
          </CustomRnd>
        );
      })}
    </>
  );
};
