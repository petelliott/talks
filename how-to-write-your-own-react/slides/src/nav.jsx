import { useState, useEffect, useRef } from "reactor";

export const useFragment = (bound) => {
    bound ??= true;
    const [fragment, setFragment] = useState((bound)? window.location.hash?.substr(1) : "0");
    const shouldSet = useRef(true);

    useEffect(() => {
        if (bound) {
            window.onhashchange = (e) => {
                if (shouldSet.current) {
                    setFragment(window.location.hash?.substr(1));
                }
            }
        }
    }, []);

    const setf = (f, navigate) => {
        navigate ??= true;
        const saved = shouldSet.current;
        shouldSet.current = navigate;
        window.location.hash = f;
        shouldSet.current = saved;
    };

    if (bound) {
        return [fragment, setf];
    } else {
        return [fragment, setFragment];
    }
};
