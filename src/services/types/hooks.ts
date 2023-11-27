import {
  TypedUseSelectorHook,
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from "react-redux";

import { AppDispatch, AppThunk, RootState } from "./index";

export const useDispatch: () => AppDispatch | AppThunk = useAppDispatch;

// Типизированная хук-обертка для useSelector с определенным RootState
export const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;
