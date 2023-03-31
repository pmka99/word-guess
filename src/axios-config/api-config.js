import axios from "axios";

const intance = axios.create({
    baseURL:'http://localhost:3000/words.txt',
    headers:{'content-type':'application/json'},
})

export default intance;