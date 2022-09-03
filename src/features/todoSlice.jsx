import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebaseConfig";

const initialState = {
  todoList: [],
  loading: true,
};

//? State'lerin API gibi async kaynaklardan gelen verilere gore guncellenmesi gerekebilir.
//? Ancak boyle bir durumda async islem tamamlandiktan sonra state guncellenmelidir.
//? Gonderilen api istegi ile dogrudan state guncellememelidir.
//? Islemin tamamlanmasi ile gelen veriye gore state'in guncellenemsini saglamak
//? adina bir arabirim kullanilmaktadir.
//? Bu arabirim middleware denilir.Redux-Toolkit, default olarak Thunk kullanmaktadir.
//! Thunk'ın amaci reducers'a islenmis sonuclari gondermeden once gecikmeli asenkron ismlerinin yurutulmesini saglamaktir.

export const getTodo = createAsyncThunk(
  "todo/getTodo", //! action type ismi

  //! async callback fun.
  async () => {
    const toDoCollectionRef = collection(db, "person");

    try {
      const data = await getDocs(toDoCollectionRef);
      const res = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

const newsSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    clearTodoList: (state) => {
      state.todoList = [];
    },
  },
  extraReducers: {
    [getTodo.pending]: (state, action) => {
      state.loading = true;
    },
    [getTodo.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.todoList = payload;
    },
    [getTodo.rejected]: (state) => {
      state.loading = false;
    },
  },
});

//! baska slice'lardaki tanimlanan action'lara cevap vermek
//! bilhassa createAsyncThunk tarafindan olusturulan action'lara
//! cevap vermek icin kullanilir.

export const { clearTodoList } = newsSlice.actions;

export default newsSlice.reducer;
