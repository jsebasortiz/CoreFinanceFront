import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

interface Bookmark {
  id: string
  isBookmarked: boolean
}

interface LayoutState {
  query: string
  bookmarks: Bookmark[]
  suggestions: Bookmark[]
}

const initialState: LayoutState = {
  query: '',
  bookmarks: [],
  suggestions: []
}

export const getBookmarks = createAsyncThunk('layout/getBookmarks', async () => {
  const response = await axios.get('/api/bookmarks/data')
  return {
    data: response.data.suggestions as Bookmark[],
    bookmarks: response.data.bookmarks as Bookmark[]
  }
})

export const updateBookmarked = createAsyncThunk('layout/updateBookmarked', async (id: string) => {
  await axios.post('/api/bookmarks/update', { id })
  return id
})

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    handleSearchQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getBookmarks.fulfilled, (state, action) => {
        state.suggestions = action.payload.data
        state.bookmarks = action.payload.bookmarks
      })
      .addCase(updateBookmarked.fulfilled, (state, action) => {
        let objectToUpdate: Bookmark | undefined

        // ** find & update object
        state.suggestions.find(item => {
          if (item.id === action.payload) {
            item.isBookmarked = !item.isBookmarked
            objectToUpdate = item
          }
        })

        // ** Get index to add or remove bookmark from array
        const bookmarkIndex = state.bookmarks.findIndex(x => x.id === action.payload)

        if (bookmarkIndex === -1 && objectToUpdate) {
          state.bookmarks.push(objectToUpdate)
        } else {
          state.bookmarks.splice(bookmarkIndex, 1)
        }
      })
  }
})

export const { handleSearchQuery } = layoutSlice.actions

export default layoutSlice.reducer
