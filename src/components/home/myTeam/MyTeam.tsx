import Ground from "./ground/Ground";
import React, { useEffect } from "react";
import {RemainingPlayer} from "./remainingPlayer/RemainingPlayer";
import {RemainingMoney} from "./remainingMoney/RemainingMoney";
import MiddleTabBar from "./middleTabBar/MiddleTabBar";
import ChoosePlayer from "./choosePlayer/ChoosePlayer";
import DateBax from "./dateBox/DateBox";
import { useState } from "react";
import http from "../../items/axiosReq"
import axios from "axios";
import ReactDOM from "react-dom";
import { getAllJSDocTags } from "typescript";
import { TIMEOUT } from "dns";


//const url='http://178.216.248.39:8000/weekInfo';

// async ()=>{
//     const a=await axios.get(url)
//       .then(res => {
//         const DateInfo = res.data;
// useState({ DateInfo });
//         console.log(res)
//       }) 
// }


function MyTeam() {

const url='weekInfo';

// useEffect(()=>{

//     const   sendGetRequest = async () => {
//     try {
//         const resp = await http.get(url);
//         console.log(resp);
//         //return resp;
//     } catch (err) {
//         console.error(err);
//         //return "nope";
//     }
// };
// })
 
    //const [DateInfo, getDateInfo] = useState([])
    useEffect(()=>{

        // http.get('').then(res=>res).then(res=>{
        //     console.log(res)
        // })

         const a=  async () => ({
            await: axios.get(url)
      .then(res => {
        const DateInfo = res.data;
        //useState({ DateInfo });
        console.log(res)
      })}
           )
    })
    //     var c;
    //     fetch(url)
    //   .then(res => {
    //     c = res.clone();
    //         console.log(res)
    //     // return res.
    // })
    //   .then(
    //     (result) => {
    //     console.log(result)
    //     },
    //     (error) => { 
    //          console.log(error)

    //     }
    //   )
    //)
    return (
        <div>
            <RemainingPlayer/>
            <RemainingMoney/>
            <MiddleTabBar/>
            <ChoosePlayer/>
            <DateBax/>
            <Ground/>
            {/* <text>{sendGetRequest()}</text> */}
        </div>
    )
}

export default MyTeam