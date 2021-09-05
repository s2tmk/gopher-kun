import { DraggableData, Rnd } from "react-rnd";
import { Sticky, StickyHooks } from "states/sticky/types";

type Props = {
  sticky: Sticky;
  dispatchers: StickyHooks["dispatchers"];
};

export const CustomRnd: React.FC<Props> = ({
  sticky,
  dispatchers,
  children,
}) => {
  const _onDragStop = (draggableData: DraggableData) => {
    dispatchers.update({
      ...sticky,
      position: {
        x: draggableData.x,
        y: draggableData.y,
      },
    });
  };

  const _onResizeStop = (htmlElement: HTMLElement) => {
    dispatchers.update({
      ...sticky,
      size: {
        width: htmlElement.style.width,
        height: htmlElement.style.height,
      },
    });
  };

  return (
    <Rnd
      key={sticky.id}
      position={{ x: sticky.position.x, y: sticky.position.y }}
      size={{ width: sticky.size.width, height: sticky.size.height }}
      minWidth={192}
      minHeight={144}
      bounds="parent"
      onDragStop={(_, d) => {
        _onDragStop(d);
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        _onResizeStop(ref);
      }}
      enableResizing={{
        right: true,
        bottom: true,
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#333",
        boxShadow: "2px 2px 8px",
      }}
      cancel="button, textarea"
    >
      {children}
    </Rnd>
  );
};
