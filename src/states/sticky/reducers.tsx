import {
  Actions,
  CREATE_STICKY,
  READ_STICKY,
  UPDATE_STICKY,
  DELETE_STICKY,
  SORT_STICKY,
} from "./types";
import { Sticky } from "./types";

const initialState: Sticky[] = [];

const reducer = (state = initialState, action: Actions): Sticky[] => {
  switch (action.type) {
    case CREATE_STICKY:
      return [
        ...state,
        {
          id: new Date().getTime(),
          comment: "",
          position: { x: 0, y: 0 },
          size: { width: "192", height: "144" },
        },
      ];
    case READ_STICKY:
      return action.payload;
    case UPDATE_STICKY:
      return state.map((sticky: Sticky) => {
        if (sticky.id === action.payload.id) {
          return {
            id: sticky.id,
            comment: action.payload.comment,
            position: {
              x: action.payload.position.x,
              y: action.payload.position.y,
            },
            size: {
              width: action.payload.size.width,
              height: action.payload.size.height,
            },
          };
        } else {
          return sticky;
        }
      });
    case DELETE_STICKY:
      return state.filter((sticky: Sticky) => sticky.id !== action.payload.id);
    case SORT_STICKY:
      if (action.payload.position === "front") {
        return [
          ...state.filter(
            (sticky: Sticky) => sticky.id !== action.payload.sticky.id
          ),
          action.payload.sticky,
        ];
      } else {
        return [
          action.payload.sticky,
          ...state.filter(
            (sticky: Sticky) => sticky.id !== action.payload.sticky.id
          ),
        ];
      }
    default:
      return state;
  }
};

export { initialState, reducer };
