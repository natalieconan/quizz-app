import './Button.css';

export const Button = (props) => {
    return (
        <>
            <button 
            className={props.className} 
            style={props.style}
            onClick={props.onClick}
            href={props.href}
            >
                <span>{props.children}</span>
            </button>
        </>
    );
};