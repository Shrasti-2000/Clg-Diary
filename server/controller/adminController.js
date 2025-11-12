const User = require('../model/authModel')
const Event =  require("../model/eventModel")
const Listing  = require('../model/listingModel')
const Comment = require('../model/commentModel')

const getAllUsers = async(req, res) => {
   const users = await User.find()
    if(!users){
        res.status(404)
        throw new Error('Users Not Found')
    }
    console.log(users);
    
    res.status(200).json(users)
} 

const updateUsers = async(req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.uid, req.body, {new : true})
     if(!updatedUser){
        res.status(400)
        throw new Error('User Not Updated')
     }
res.status(200).json(updatedUser)

}

const addEvent = async(req, res) => {
  const {eventName, eventDescription, eventImage, eventDate, status, availableSeats , location, organizer, price} =req.body

  if(!eventName || !eventDescription || !eventImage || !eventDate ||!status ||!availableSeats ||!location ||!organizer ||!price){
     res.status(400)
 throw new  Error("Please Fill Details")
  }
   let newEvent = await Event.create({
    eventName,
    eventDescription,
    eventImage,
    eventDate,
    status,
    location,
     availableSeats,
    organizer,
     price
   })

   if(!newEvent){
    res.status(400)
    throw new Error('Event Not Created')
   }
   res.status(201).json(newEvent)
}


const updateEvent = async(req, res) => {
  const updatedEvent = await Event.findByIdAndUpdate(req.params.eid, req.body, {new: true})
  if(!updatedEvent){
    res.status(400)
    throw new Error("Event Is Not Updated")
  }
  res.status(200).json(updatedEvent)
}

const updateProduct = async(req, res) => {
   const updatedListing = await Listing.findByIdAndUpdate(req.params.pid, req.body, {new: true}).populate('user')
   
   
      if(!updatedListing){
       res.status(404)
       throw new Error('Product Not Found')
      }
      res.status(200).json(updatedListing)
}

const getAllComment= async(req, res) => {
   const comments = await Comment.find().populate('user').populate('event')
 
      if(!comments){
       res.status(404)
       throw new Error('comment Not Found')
      }
      res.status(200).json(comments)
}

module.exports = {getAllUsers, updateUsers, addEvent, updateEvent, updateProduct, getAllComment}