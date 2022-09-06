import React, {FC, ReactElement, ReactNode} from "react";
import "./Form.css";
import cover from "./assets/cover.svg";
import logo from "./assets/logo.svg";

const Form: FC<{
    children: ReactNode
}> = ({children}): ReactElement => {
    return <div className="window">
        <div id="sidePicture">
            <img id="logo" src={logo} alt=""/>
            <img id="PlayersPhoto" src={cover} alt=""/>
        </div>
        <div>{children}</div>
    </div>
}
export default Form;
