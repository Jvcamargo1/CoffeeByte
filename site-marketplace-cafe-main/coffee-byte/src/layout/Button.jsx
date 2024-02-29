function Button({ onClick, content, backgroundColor, hover, color }) {
    return (
        <button
            onClick={onClick}
            className="button"
            onMouseEnter={e => {
                e.target.style.backgroundColor = hover
            }}
            onMouseLeave={e => {
                e.target.style.backgroundColor = backgroundColor
            }}
            style={{ backgroundColor: backgroundColor, color: color }}
        >{content}</button>
    )
}

export default Button;