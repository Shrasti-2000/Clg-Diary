import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { comment } from "postcss";
import commentService from "./commentService";

const commentSlice = createSlice({
    name:"comments",
    initialState:{
        allComments:null,
        commentLoading:true,
        commentSuccess: false,
        commentError: false,
        commentErrorMessage:""
    },
    reducers:{},
    extraReducers:(builder) => {
        builder
        .addCase(getComments.pending, (state, action)=>{
            state.commentLoading = true,
            state.commentSuccess = false,
            state.commentError = false
        })
        .addCase(getComments.fulfilled, (state, action)=>{
            state.commentLoading = false,
         state.allComments = action.payload
            state.commentSuccess = true,
            state.commentError = false
        })
        .addCase(getComments.rejected, (state, action)=>{
            state.commentLoading = false,
            state.commentSuccess = false,
            state.commentError = true,
            state.commentErrorMessage = action.payload
        })
// Add Comment
          .addCase(addComment.pending, (state, action)=>{
            state.commentLoading = true,
            state.commentSuccess = false,
            state.commentError = false
        })
        .addCase(addComment.fulfilled, (state, action)=>{
            state.commentLoading = false,
         state.allComments = [action.payload]
            state.commentSuccess = true,
            state.commentError = false
        })
        .addCase(addComment.rejected, (state, action)=>{
            state.commentLoading = false,
            state.commentSuccess = false,
            state.commentError = true,
            state.commentErrorMessage = action.payload
        })
    }

})


export default commentSlice.reducer

export const  getComments = createAsyncThunk("FETCH/COMMENTS", async(eid) => {
    try {
        return await commentService.fetchComments(eid)
    } catch (error) {
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
}) 

export const  addComment = createAsyncThunk("ADD/COMMENTS", async(comment, thunkAPI)  => {
    console.log(comment);
    
    let token = thunkAPI.getState().auth.user.token
    try {
        return await commentService.createComment(comment, token)
    } catch (error) {
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
}) 