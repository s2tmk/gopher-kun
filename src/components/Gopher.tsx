import {
  RefObject,
  useRef,
  forwardRef,
  MouseEvent,
  useEffect,
  useState,
  memo,
} from "react";
import { Flex, Box, VStack } from "@chakra-ui/react";
import { useHeart } from "hooks/useHeart";

const useMove = () => {
  const [state, setState] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    e.persist();
    setState((state) => ({ ...state, x: e.clientX, y: e.clientY }));
  };
  return {
    x: state.x,
    y: state.y,
    handleMouseMove,
  };
};

type DivProps = JSX.IntrinsicElements["div"];
const Eye = forwardRef<HTMLDivElement, DivProps>((_, ref) => {
  return (
    <Flex position="relative" ref={ref}>
      <Box
        position="absolute"
        top="50%"
        left="16px"
        transform="translate(-50%, -50%)"
        w="32px"
        h="32px"
        borderRadius="50%"
        bgColor="black"
      />
      <Box w="64px" h="64px" bgColor="white" borderRadius="50%" />
    </Flex>
  );
});

const Ears = memo(() => {
  const Ear = ({ pos }: { pos: "left" | "right" }) => (
    <Flex
      w="48px"
      h="48px"
      bgColor="#8ac5e5"
      borderRadius="50%"
      justifyContent="center"
      alignItems="center"
    >
      <Flex
        w="16px"
        h="8px"
        bgColor="#3b89bc"
        borderTopRadius="50%"
        justifyContent="center"
        alignItems="center"
        transform={`rotate(${pos === "left" ? -60 : 60}deg)`}
      />
    </Flex>
  );
  return (
    <Flex
      justifyContent="space-between"
      w="240px"
      position="absolute"
      top="32px"
    >
      <Ear pos={"left"} />
      <Ear pos={"right"} />
    </Flex>
  );
});

const Hands = memo(() => {
  const Hand = () => (
    <Flex
      w="48px"
      h="48px"
      bgColor="#b79380"
      borderRadius="50%"
      justifyContent="center"
      alignItems="center"
    />
  );

  return (
    <Flex
      justifyContent="space-between"
      w="240px"
      position="absolute"
      top="128px"
    >
      <Hand />
      <Hand />
    </Flex>
  );
});

const NoseAndMouth = memo(
  forwardRef<HTMLDivElement>((props, ref) => {
    return (
      <Flex
        position="relative"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        top="-8px"
      >
        <Box
          bgColor="black"
          w="24px"
          h="12px"
          borderRadius="50%"
          position="absolute"
          top="-6px"
        ></Box>
        <Box bgColor="#b79380" w="48px" h="24px" borderRadius="33%"></Box>
        <Box
          bgColor="white"
          w="24px"
          h="12px"
          borderRadius="16%"
          position="absolute"
          top="16px"
          ref={ref}
        ></Box>
      </Flex>
    );
  })
);

export const Gopher = () => {
  const leftEye = useRef() as RefObject<HTMLDivElement>;
  const rightEye = useRef() as RefObject<HTMLDivElement>;
  const { x, y, handleMouseMove } = useMove();
  const effectRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const { emitter } = useHeart();

  useEffect(() => {
    const eyes = [leftEye, rightEye];
    eyes.forEach((eye) => {
      if (!eye.current) return;
      let eyeX =
        eye.current.getBoundingClientRect().left + eye.current.clientWidth / 2;
      let eyeY =
        eye.current.getBoundingClientRect().top + eye.current.clientHeight / 2;
      let radian = Math.atan2(x - eyeX, y - eyeY);
      let rot = radian * (180 / Math.PI) * -1 + 270;
      eye.current.style.transform = "rotate(" + rot + "deg)";
    });
  }, [x, y]);

  return (
    <Flex
      w="100vw"
      h="100vh"
      alignItems="flex-end"
      justifyContent="center"
      onMouseMove={handleMouseMove}
    >
      <VStack
        position="relative"
        onClick={() => emitter.call(null, effectRef.current)}
      >
        <Ears />
        <Flex
          justifyContent="center"
          alignItems="center"
          bgColor="#8ac5e5"
          h="150px"
          w="200px"
          borderTopRadius="50%"
          flexDirection="column"
          top="16px"
        >
          <Flex position="relative" justifyContent="space-around" w="180px">
            <Eye ref={leftEye} />
            <Eye ref={rightEye} />
          </Flex>
          <NoseAndMouth ref={effectRef} />
        </Flex>
        <Hands />
      </VStack>
    </Flex>
  );
};
