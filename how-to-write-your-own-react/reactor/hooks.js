import { scheduleRerender } from ".";

let useStateCounter;
let useEffectCounter;
let hookNode;

export const withHookContext = (node, proc) => {
    useStateCounter = 0;
    useEffectCounter = 0;
    hookNode = node;
    return proc();
};

export const useState = (initialState) => {
    // Make sure closures capture these.
    const node = hookNode;
    const index = useStateCounter;

    const state = node.state;
    if (!state.hasOwnProperty(index)) {
        state[index] = [
            initialState,
            (value) => {
                if (state[index][0] !== value) {
                    state[index][0] = value;
                    scheduleRerender(node);
                }
            },
        ];
    }
    return state[index];
};
