import { useState, useCallback, useReducer } from "react";
import { initialState, reducer } from "./reducers";
import {
  CREATE_STICKY,
  READ_STICKY,
  UPDATE_STICKY,
  DELETE_STICKY,
  StickyHooks,
  Sticky,
  SORT_STICKY,
} from "./types";

const useSticky = (): StickyHooks => {
  const [isFetching, setIsFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);

  const createSticky = useCallback(async () => {
    setIsFetching(true);
    try {
      //ここへ同期処理
      setIsFetching(false);
      dispatch({
        type: CREATE_STICKY,
      });
    } catch (e) {
      setIsFetching(false);
      setErrorMessage(e as string);
    }
  }, []);

  const readSticky = useCallback(async () => {
    setIsFetching(true);
    try {
      const data = localStorage.getItem("ForYourFocusTime");
      const stickies = data ? (JSON.parse(data) as Sticky[]) : [];
      setIsFetching(false);
      dispatch({
        type: READ_STICKY,
        payload: stickies,
      });
    } catch (e) {
      setIsFetching(false);
      setErrorMessage(e as string);
    }
  }, []);

  const updateSticky = useCallback(async (sticky: Sticky) => {
    setIsFetching(true);
    try {
      //ここへ同期処理
      setIsFetching(false);
      dispatch({ type: UPDATE_STICKY, payload: sticky });
    } catch (e) {
      setIsFetching(false);
      setErrorMessage(e as string);
    }
  }, []);

  const deleteSticky = useCallback(async (id: number) => {
    setIsFetching(true);
    try {
      //ここへ同期処理
      setIsFetching(false);
      dispatch({
        type: DELETE_STICKY,
        payload: { id: id },
      });
    } catch (e) {
      setIsFetching(false);
      setErrorMessage(e as string);
    }
  }, []);

  const sortSticky = useCallback(
    async (sticky: Sticky, position: "front" | "back") => {
      setIsFetching(true);
      try {
        //ここへ同期処理
        setIsFetching(false);
        dispatch({
          type: SORT_STICKY,
          payload: { sticky: sticky, position: position },
        });
      } catch (e) {
        setIsFetching(false);
        setErrorMessage(e as string);
      }
    },
    []
  );

  const dispatchers = {
    create: createSticky,
    read: readSticky,
    update: updateSticky,
    delete: deleteSticky,
    sort: sortSticky,
  };

  return { state, dispatchers, isFetching, errorMessage };
};

export default useSticky;
