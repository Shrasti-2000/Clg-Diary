// UI Only — Comment form component

import { useState } from 'react';
import { useDispatch, useSelector }  from 'react-redux';
import { addComment } from '../features/comment/commentSlice';
import Loader from './Loader';
import { toast } from 'react-toastify';

const CommentForm = ({event}) => {

  const {user} = useSelector(state => state.auth)
 const [text, setText] = useState("")

 const {commentSuccess} = useSelector(state => state.comments)

 const dispatch = useDispatch()
  const eid = event._id

  const comment = {eid,text}

 const handleSubmit = (e) => {
  e.preventDefault()  
  dispatch(addComment(comment))

  if(commentSuccess){
    toast.success("Comment Add!!!", {position:'top-center'})
  }
  setText("")

}

if(!user){
  return(
   <div className="border border-gray-100 flex item-center justify-center">
    <h1 className='my-4 text-center text-sm text-gray-400'>Please Login To Comment Here....</h1>
   </div>
  )
}  

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6">
      <h3 className="text-lg font-bold text-slate-900 mb-4">Add a Comment</h3>

      <div className="space-y-4">
       

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
            Your Comment
          </label>
          <textarea
            id="message"
            name="message"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            rows="4"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow resize-none"
            placeholder="Share your thoughts..."
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          Post Comment
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
