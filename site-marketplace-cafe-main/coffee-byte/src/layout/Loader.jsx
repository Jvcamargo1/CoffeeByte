import "../assets/css/loader.css";

function Loader({ color }) {
    return (
        <div
            className="loader"
            style={{
                borderBottom: `.2em solid ${color}`,
                borderTop: `.2em solid ${color}`
            }}
        />
    )
}

export default Loader;