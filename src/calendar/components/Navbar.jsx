export const Navbar = () => {
    return (
        <div className="navbar navbar-dark bg-dark mb-4 px-4">
            <span className="navbar-brand">
                <i className="fas fa-calendar-alt"></i>
                &nbsp;
                Merlina
            </span>

            <button className="btn btn-outline-danger">
                <i className="fas fa-sign-out-alt"></i>
                &nbsp;
                Salir
            </button>
        </div>
    )
}

// &nbsp es una entidad de caracteres utilizada en HTML y XML para representar un espacio en blanco. La abreviatura "nbsp" significa "non-breaking space" en inglés, lo que se traduce como "espacio no rompible".