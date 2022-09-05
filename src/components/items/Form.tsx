import React, { FC, ReactElement, ReactNode } from "react";
import { Component } from "react";
import "./Form.css";
import cover from "./assets/cover.svg";
import logo from "./assets/logo.svg";

// class Form extends Component{
//     render() {
//         return (
//         <div className="window">
//             <div id="sidePicture">
//             <img id="logo" src={logo} alt=""/>
//             <img id="PlayersPhoto" src={cover} alt="" />
//             </div>
//         </div>
//         );
//     }
// }

const Form: FC<{
    children: ReactNode
}> = ({children}): ReactElement => {
    return <div className="window">
<div id="sidePicture">
<img id="logo" src={logo} alt=""/>
<img id="PlayersPhoto" src={cover} alt="" />
</div>
<div>{children}</div>
</div>
}
// con Form extends Component {
//   render() {
//     return (
//         // <div>
//         //   <div className="window">
//         //     <div id="sidePicture"></div>
//         //     <img id="logo" src={logo} alt=""/>
//         //     <img id="PlayersPhoto" src={cover} alt="" />
//         //   </div>
//         //   <div className="container">

//         //   </div>
//         // </div>
//         <>
//         {props.children}
//         </>
//       );
//   }
// };

export default Form;
