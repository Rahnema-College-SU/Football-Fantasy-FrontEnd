import axios from "axios";
 
const http=axios.create(
    {
        baseURL:"http://178.216.248.39:8000/weekInfo",
        timeout:5000,
        headers:{
            "Content-Type":"application/json",
        }
    }
);

export default http;