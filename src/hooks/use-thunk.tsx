import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

export function useThunk(thunk: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const dispatch = useDispatch();

  const runThunk = useCallback(
    (arg?: any) => {
      setIsLoading(true);
      dispatch(thunk(arg))
        .unwrap()
        .catch((err: unknown) => {
          setError(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [dispatch, thunk]
  );

  return [runThunk, isLoading, error] as const;
}