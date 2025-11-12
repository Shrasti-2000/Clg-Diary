import axios from "axios"

// GEt Message
const fetchMessages = async(token) => {
    let options = {
        headers:{
            authorization:`Bearer ${token}`
        }
    }
    const response = await axios.get('/api/message/' , options)
    console.log(response.data)
    return response.data
}

// Send Message
const sendMessage = async(pid, token)=>{
    let options = {
        headers:{
           authorization: `Bearer ${token}`
        }
    }
const response = await axios.post("/api/message/" + pid, {msg:"I am Intrested in your product please contact me..."} , options)
// console.log(response.data)
return response.data
}



const messageService = {fetchMessages, sendMessage}

export default messageService