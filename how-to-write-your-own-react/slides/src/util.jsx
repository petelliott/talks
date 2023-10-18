export const IconButton = (props) => (
    <button
        className={`icon-button ${props.className??""} ${props.enabled?"":"disabled"}`}
        onclick={props.enabled? props.onclick : null}>

        <span class="material-symbols-outlined">{props.icon}</span>
    </button>
);
