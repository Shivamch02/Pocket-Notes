import { createSlice } from "@reduxjs/toolkit";
import MN from "../images/mn.png";

const groupSlice = createSlice({
  name: "group",
  initialState: {
    groups: [{ id: "1", groupName: "My Notes", imgUrl: MN }],
    notes: [
      { id: "1", content: "Hello React", groupId: "1" },
      { id: "2", content: "Hello Redux", groupId: "1" },
    ],
    selectedGroupId: null,
  },
  reducers: {
    addGroup: (state, action) => {
      state.groups.push(action.payload);
    },
    addNote: (state, action) => {
      state.notes.push(action.payload);
    },
    selectGroup: (state, action) => {
      state.selectedGroupId = action.payload.groupId;
    },
  },
});

export const { addGroup, addNote, selectGroup } = groupSlice.actions;
export default groupSlice.reducer;
