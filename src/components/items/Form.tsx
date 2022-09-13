import React, {FC, ReactElement, ReactNode} from "react";
import "./Form.css";
import logo from "./assets/logo.svg";

const Form: FC<{
    children: ReactNode
}> = ({children}): ReactElement => {
    return <div className="window">
        <div className="side-picture">
            <img className="logo" src={logo} alt=""/>
        </div>
        <div className="form-container">
            {children}
        </div>

    </div>
}
export default Form;
