import React, {FC, ReactElement, ReactNode} from "react";
import "./Form.css";
import cover from "./assets/cover.svg";
import logo from "./assets/logo.svg";

const Form: FC<{
    children: ReactNode
}> = ({children}): ReactElement => {
    return <div className="window">
        <div className="sidePicture">
            <img className="logo" src={logo} alt=""/>
        </div>
        <div className="container">
        {children}     
        </div>

    </div>
}
export default Form;
