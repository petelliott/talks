import { scheduleRerender } from "./vdom";
import { dependenciesEqual } from "./util";

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
    ++useStateCounter;
    return state[index];
};

let effectQueue;
export const withEffectsRun = (proc) => {
    effectQueue = [];
    const ret = proc();

    for (const effect of effectQueue) {
        effect();
    }

    effectQueue = undefined;
    return ret;
};

export const useEffect = (effect, dependencies) => {
    const node = hookNode;
    const index = useEffectCounter;
    node.effects ??= {};
    const effects = node.effects;

    if (!effects.hasOwnProperty(index)) {
        effects[index] = {}
    }

    effectQueue.push(() => {
        if (!dependenciesEqual(effects[index].deps) ||
            effects[index].deps === null || effects[index].deps === undefined) {
            effect();
        }
        effects[index].deps = dependencies;
    });
    ++useEffectCounter;
};
