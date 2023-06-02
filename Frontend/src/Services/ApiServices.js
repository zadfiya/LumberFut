import axios from 'axios';

const GetAPi = (path)=>{
    const headerOption = {
        headers:{
            "Content-Type": "application/json"
        }
    }
    const data = axios.get(path,headerOption).then(response=>response).catch(err=>err)
    return data;
}

export {GetAPi} 