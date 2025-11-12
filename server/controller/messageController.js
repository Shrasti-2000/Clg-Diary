const Message = require('../model/messageModel')
const Listing = require('../model/listingModel')


const getMessages = async(req, res) =>{
      try {
        // Get all listing IDs created by the logged-in user
        const myListingIds = await Listing.find({ user: req.user._id }).distinct("_id");

        // Fetch only messages whose listing matches user's listings
        const messages = await Message.find({
            listing: { $in: myListingIds }
        })
            .populate("user")
            .populate("listing");

        if (!messages) {
            return res.status(404).json({ message: "No messages found!" });
        }

        res.status(200).json(messages);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

//     const messages = await Message.find({user : req.user._id}).populate('listing').populate('user')

//    if(!messages){
//     res.status(404)
//     throw  new Error('Message Not Found')
//  }
// console.log(messages)
//  res.status(200).json(messages)
// }

// Send Message
const sendMessage = async(req, res) =>{

    console.log(req.text)

   if(!req.body.msg){
    res.status(400)
    throw new Error('Please Add Your Message')
}

const newMessage = await Message.create({msg: req.body.msg, user:req.user._id, listing: req.params.pid })

      if(!newMessage){
           res.status(400)
           throw new Error('Message Not Send......') 
        }

        res.status(201).json(newMessage)
}

module.exports = {getMessages, sendMessage}