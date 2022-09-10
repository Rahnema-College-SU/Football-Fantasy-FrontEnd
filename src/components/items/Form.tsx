import React, {FC, ReactElement, ReactNode} from "react";
import "./Form.css";
import logo from "./assets/logo.svg";

const Form: FC<{
    children: ReactNode
}> = ({children}): ReactElement => {
    return <div className="window">
        <div className="sidePicture">
            <img className="logo" src={logo} alt=""/>
            {/* <img className="PlayersPhoto" src={cover} alt=""/> */}
        </div>
        {children}
    </div>
}
export default Form;
