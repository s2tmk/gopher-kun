export const CREATE_STICKY = "CREATE_STICKY";
export const READ_STICKY = "READ_STICKY";
export const UPDATE_STICKY = "UPDATE_STICKY";
export const DELETE_STICKY = "DELETE_STICKY";
export const SORT_STICKY = "SORT_STICKY";

export type Sticky = {
  id: number;
  comment: string;
  position: {
    x: number;
    y: number;
  };
  size: {
    width: string;
    height: string;
  };
};

type CreateSticky = {
  type: typeof CREATE_STICKY;
};

type ReadSticky = {
  type: typeof READ_STICKY;
  payload: Sticky[];
};

type UpdateSticky = {
  type: typeof UPDATE_STICKY;
  payload: Sticky;
};

type DeleteSticky = {
  type: typeof DELETE_STICKY;
  payload: { id: number };
};

type SortSticky = {
  type: typeof SORT_STICKY;
  payload: { sticky: Sticky; position: "front" | "back" };
};

export type Actions =
  | CreateSticky
  | ReadSticky
  | UpdateSticky
  | DeleteSticky
  | SortSticky;

export type StickyHooks = {
  state: Sticky[];
  dispatchers: {
    create: () => Promise<void>;
    read: () => Promise<void>;
    update: (sticky: Sticky) => Promise<void>;
    delete: (id: number) => Promise<void>;
    sort: (sticky: Sticky, position: "front" | "back") => Promise<void>;
  };
  isFetching: boolean;
  errorMessage: string;
};
