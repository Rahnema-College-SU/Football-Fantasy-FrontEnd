import React, {ReactElement, ReactNode} from "react";
import "./Form.css";
import logo from "./assets/logo.svg";

function Form({children, onSubmit}: { children: ReactNode, onSubmit: () => void }): ReactElement {
    return <div className="window">
        <div className="side-picture">
            <img className="logo" src={logo} alt="premier league logo"/>
        </div>
        <div className="form-container">
            <form onSubmit={(e) => {
                e.preventDefault();
                onSubmit()
            }}>
                {children}
            </form>
        </div>
    </div>
}

export default Form;