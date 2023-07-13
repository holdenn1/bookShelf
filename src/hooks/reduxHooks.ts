import { AppDispatch, RootState } from '@/store';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/exports';
import { TypedUseSelectorHook } from 'react-redux/es/types';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
