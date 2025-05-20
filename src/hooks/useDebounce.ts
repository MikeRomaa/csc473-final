import { useCallback, useEffect, useRef, useState } from "react";

export function useDebouncedState<T>(initialValue: T, delay = 250): [T, (value: T) => void] {
    const timeout = useRef<number | null>(null);
    const [debounced, setDebounced] = useState<T>(initialValue);

    const set = useCallback(
        (value: T) => {
            if (timeout.current) {
                window.clearTimeout(timeout.current);
                timeout.current = null;
            }

            timeout.current = window.setTimeout(() => {
                setDebounced(value);
                timeout.current = null;
            }, delay);
        },
        [delay],
    );

    useEffect(
        () => () => {
            if (timeout.current) window.clearTimeout(timeout.current);
        },
        [],
    );

    return [debounced, set];
}
