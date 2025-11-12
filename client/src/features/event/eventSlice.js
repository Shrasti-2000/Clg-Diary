import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import eventService from "./eventService";

const eventSlice = createSlice({
    name:"events",
    initialState:{
        allEvents:[],
        event:null,
        eventLoading:true,
        eventSuccess: false,
        eventError: false,
        eventErrorMessage:""
    },
    reducers:{},
    extraReducers:(builder) => {
        builder
        .addCase(getEvents.pending, (state, action) =>{
            state.eventLoading = true
            state.eventSuccess = false
            state.eventError = false
        })
         .addCase(getEvents.fulfilled, (state, action) =>{
            state.eventLoading = false
            state.eventSuccess = true
            state.allEvents = action.payload
            state.eventError = false
        })
         .addCase(getEvents.rejected, (state, action) =>{
            state.eventLoading = false
            state.eventSuccess = false
            state.eventError = true
            state.eventErrorMessage = action.payload
        })
// get single event 
          .addCase(getEvent.pending, (state, action) =>{
            state.eventLoading = true
            state.eventSuccess = false
            state.eventError = false
        })
         .addCase(getEvent.fulfilled, (state, action) =>{
            state.eventLoading = false
            state.eventSuccess = true
            state.event = action.payload
            state.eventError = false
        })
         .addCase(getEvent.rejected, (state, action) =>{
            state.eventLoading = false
            state.eventSuccess = false
            state.eventError = true
            state.eventErrorMessage = action.payload
        })
    }

})


export default eventSlice.reducer

// Get Events
 export const getEvents = createAsyncThunk("FETCH/EVENTS", async() => {
    try {
       return await eventService.fetchEvents() 
    } catch (error) {
        const message = error.response.data.message 
        return thunkAPI.rejectWithValue(message)
    }
 })

 // Get Single Event
 export const getEvent = createAsyncThunk("FETCH/EVENT", async(id) => {
    try {
       return await eventService.fetchEvent(id) 
    } catch (error) {
        const message = error.response.data.message 
        return thunkAPI.rejectWithValue(message)
    }
 })