import axios from "axios"

const API_URL = "/api/admin/"


const fetchAllUsers = async (token) => {

    let options = {
        headers:{
            authorization: `Bearer ${token}`
        }
    }
  const response = await axios.get(API_URL + "users", options)
  return response.data
}

// Fetch all events
const fetchAllEvents = async () => {

  const response = await axios.get("/api/event")
  return response.data
}

// Fetch All Listing Product
const fetchAllListings = async() => {
  const response = await axios.get("/api/product")
  return response.data
}

// update Listing
const updateListing = async(updateProduct, token) => {
let options = {
        headers:{
            authorization: `Bearer ${token}`
        }
    }
  const response = await axios.put("/api/admin/product/" + updateProduct._id, updateProduct , options)
  console.log(response.data)
  return response.data
}

// update user
const updateUser = async(updateUser, token) => {
let options = {
        headers:{
            authorization: `Bearer ${token}`
        }
    }
  const response = await axios.put("/api/admin/users/" + updateUser._id, updateUser , options)
  console.log(response.data)
  return response.data
}

// Add Event (Admin)
const createEvent = async(formData, token) => {  
let options = {
        headers:{
            authorization: `Bearer ${token}`
        }
    }
  const response = await axios.post("/api/admin/event" , formData , options)
  console.log(response.data)
  return response.data
}

// Update Event (Admin)
const update = async(updateEvent, token) => {  
let options = {
        headers:{
            authorization: `Bearer ${token}`
        }
    }
  const response = await axios.put("/api/admin/event/" + updateEvent._id , updateEvent , options)
  console.log(response.data)
  return response.data
}



const adminService = { fetchAllUsers , fetchAllEvents, fetchAllListings, updateListing, updateUser, createEvent, update}


export default adminService