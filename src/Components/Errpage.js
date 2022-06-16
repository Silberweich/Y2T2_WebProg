import React from 'react'

class ErrorPage extends React.Component {
    
    render() {
        const Error = {
            fontFamily: "Poppins",
            textAlign: "center"
        };
        return (
            <h1 style={Error}>Error Page</h1>
        );
    }
}

export default ErrorPage