import React, {FC, ReactElement, ReactNode} from "react";
import "./Form.css";
import logo from "./assets/logo.svg";

const Form: FC<{
    children: ReactNode,
    onSubmit: () => void;
}> = ({children, onSubmit}): ReactElement => {
    return <div className="window">
        <div className="side-picture">
            <img className="logo" src={logo} alt=""/>
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
