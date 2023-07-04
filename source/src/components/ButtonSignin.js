function ButtonSignin(props) {
    return (
        <button data-x={props.x} onClick={props.onClick}>{props.children}</button>
    );
}

export default ButtonSignin;