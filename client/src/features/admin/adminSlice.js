import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminService from "./adminService";
 
const adminSlice = createSlice({
    name : 'admin',
    initialState : {
        allUsers : [],
        allEvents:[],
        allListings: [],
        allComments:[],
        edit:{
            event:{},
            isEdit:false
        },
        adminLoading : false,
        adminSuccess : false,
        adminError : false,
        adminErrorMessage : ""
    },
    reducers : {
        editEvent:(state, action) => {
            return{
                ...state,
                edit:{
                    event : action.payload,
                    isEdit: true
                }
            }
        }
    },
    extraReducers : builder => {
        builder
        .addCase(getAllUsers.pending, (state , action) => {
            state.adminLoading = true
            state.adminSuccess = false
            state.adminError = false
        })
        .addCase(getAllUsers.fulfilled, (state , action) => {
            state.adminLoading = false
            state.adminSuccess = true
            state.allUsers = action.payload
            state.adminError = false
        })
        .addCase(getAllUsers.rejected, (state , action) => {
            state.adminLoading = false
            state.adminSuccess = false
            state.adminError = true
            state.adminErrorMessage = action.payload
        })

        // get all events
        .addCase(getAllEvents.pending, (state , action) => {
            state.adminLoading = true
            state.adminSuccess = false
            state.adminError = false
        })
        .addCase(getAllEvents.fulfilled, (state , action) => {
            state.adminLoading = false
            state.adminSuccess = true
            state.allEvents = action.payload
            state.adminError = false
        })
        .addCase(getAllEvents.rejected, (state , action) => {
            state.adminLoading = false
            state.adminSuccess = false
            state.adminError = true
            state.adminErrorMessage = action.payload
        })

        // get all Listings
        .addCase(getAllListings.pending, (state , action) => {
            state.adminLoading = true
            state.adminSuccess = false
            state.adminError = false
        })
        .addCase(getAllListings.fulfilled, (state , action) => {
            state.adminLoading = false
            state.adminSuccess = true
            state.allListings = action.payload
            state.adminError = false
        })
        .addCase(getAllListings.rejected, (state , action) => {
            state.adminLoading = false
            state.adminSuccess = false
            state.adminError = true
            state.adminErrorMessage = action.payload
        })

         // Updated Listings
        .addCase(updateAllListing.pending, (state , action) => {
            state.adminLoading = true
            state.adminSuccess = false
            state.adminError = false
        })
        .addCase(updateAllListing.fulfilled, (state , action) => {
            state.adminLoading = false
            state.adminSuccess = true
            state.allListings = state.allListings.map(item => item._id === action.payload._id ? action.payload : item)
            state.adminError = false
        })
        .addCase(updateAllListing.rejected, (state , action) => {
            state.adminLoading = false
            state.adminSuccess = false
            state.adminError = true
            state.adminErrorMessage = action.payload
        })

         // Updated User
        .addCase(updateAllUser.pending, (state , action) => {
            state.adminLoading = true
            state.adminSuccess = false
            state.adminError = false
        })
        .addCase(updateAllUser.fulfilled, (state , action) => {
            state.adminLoading = false
            state.adminSuccess = true
            state.allUsers = state.allUsers.map(item => item._id === action.payload._id ? action.payload : item)
            state.adminError = false
        })
        .addCase(updateAllUser.rejected, (state , action) => {
            state.adminLoading = false
            state.adminSuccess = false
            state.adminError = true
            state.adminErrorMessage = action.payload
        })

         // Add  Events
        .addCase(addAllEvents.pending, (state , action) => {
            state.adminLoading = true
            state.adminSuccess = false
            state.adminError = false
        })
        .addCase(addAllEvents.fulfilled, (state , action) => {
            state.adminLoading = false
            state.adminSuccess = true
            state.allEvents = [action.payload, ...state.allEvents]
            state.adminError = false
        })
        .addCase(addAllEvents.rejected, (state , action) => {
            state.adminLoading = false
            state.adminSuccess = false
            state.adminError = true
            state.adminErrorMessage = action.payload
        })

         // Update  Events
        .addCase(updateEvent.pending, (state , action) => {
            state.adminLoading = true
            state.adminSuccess = false
            state.adminError = false
        })
        .addCase(updateEvent.fulfilled, (state , action) => {
            state.adminLoading = false
            state.adminSuccess = true
            state.allEvents = state.allEvents.map(event => event._id === action.payload._id ? action.payload :event )
            state.edit = {event : {}, isEdit: false}
            state.adminError = false
        })
        .addCase(updateEvent.rejected, (state , action) => {
            state.adminLoading = false
            state.adminSuccess = false
            state.adminError = true
            state.adminErrorMessage = action.payload
        })
    }
})

export const {editEvent} = adminSlice.actions
 
export default adminSlice.reducer
 
 
// FETCH ALL USERS : (ADMIN)
export const getAllUsers = createAsyncThunk("FETCH/USERS/ADMIN", async (_, thunkAPI) => {
 
    let token = thunkAPI.getState().auth.user.token
 
    try {
        return await adminService.fetchAllUsers(token)
    } catch (error) {
       const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})

// FETCH ALL Events : (ADMIN)
export const getAllEvents = createAsyncThunk("FETCH/EVENTS/ADMIN", async (_, thunkAPI) => {
    try {
        return await adminService.fetchAllEvents()
    } catch (error) {
       const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})

// FETCH ALL Listings : (ADMIN)
export const getAllListings = createAsyncThunk("FETCH/LISTINGS/ADMIN", async (_, thunkAPI) => {
    try {
        return await adminService.fetchAllListings()
    } catch (error) {
       const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})


// Update Listings : (ADMIN)
export const updateAllListing = createAsyncThunk("UPDATE/LISTINGS/ADMIN", async (updateProduct, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token
    try {
        return await adminService.updateListing(updateProduct, token)
    } catch (error) {
       const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})   


// Update User : (ADMIN)
export const updateAllUser = createAsyncThunk("UPDATE/USER/ADMIN", async (updateUser, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token
    try {
        return await adminService.updateUser(updateUser, token)
    } catch (error) {
       const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})   

// Add Events : (ADMIN)
export const addAllEvents = createAsyncThunk("ADD/EVENT/ADMIN", async (formData, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token
    try {
        return await adminService.createEvent(formData, token)
    } catch (error) {
       const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})

// Update Events : (ADMIN)
export const updateEvent = createAsyncThunk("UPDATE/EVENT/ADMIN", async (updatedEvent, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token
    try {
        return await adminService.update(updatedEvent, token)
    } catch (error) {
       const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})

