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

export const useEffect = (effect, dependencies) => {
    const node = hookNode;
    const index = useEffectCounter;
    node.effects ??= {};
    const effects = node.effects;

    if (!effects.hasOwnProperty(index)) {
        effects[index] = {}
    }

    effects[index].effect = effect;
    effects[index].olddeps = effects[index].deps;
    effects[index].deps = dependencies;
    ++useEffectCounter;
};

export const runEffects = (node) => {
    for (const effect of Object.values(node?.effects ?? {})) {
        if (!dependenciesEqual(effect.olddeps, effect.deps) ||
            effect.deps === null || effect.deps === undefined) {
            effect.effect();
        }
    }
}
