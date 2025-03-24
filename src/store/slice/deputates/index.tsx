import { createSlice, PayloadAction } from '@reduxjs/toolkit';

//Определяем интерфейс конкретного документа
interface DeputatItem {
   archive: null | boolean;
   created_at: string;
   description: string;
   id: number;
   name: string;
   property: object;
   published: number;
   remove: null | boolean;
   updated_at: string;
}

// Определяем интерфейс для состояния списка депутатов
interface DeputatesState {
   all: number;
   limit: string | number;
   list: DeputatItem[];
   page: string | number;
   choiceCheckbox: number[]
}

// Определяем начальное состояние
const initialState: DeputatesState = {
   all: 0,
   limit: "10",
   list: [],
   page: "1",
   choiceCheckbox: []
};

//Определяем интерфейс для данных, которые ожидаем получить с бэка
interface DeputatesResponse {
   deputat: {
      all: number;
      list: DeputatItem[];
      limit?: string | number; //  string | number опционально
      page?: string | number; //  string | number опционально
   }
}

interface UpdatePublishedPayload {
   id: number;
   published: number;
}

export const newsSlice = createSlice({
   name: 'deputates',
   initialState,
   reducers: {
      deputates: (state: DeputatesState, action: PayloadAction<DeputatesResponse>) => {
         state.all = action.payload?.deputat?.all;
         state.list = action.payload?.deputat?.list;
         if (action.payload?.deputat?.limit !== undefined) {
            state.limit = action.payload?.deputat?.limit;
         }
         if (action.payload?.deputat?.page !== undefined) {
            state.page = action.payload?.deputat?.page;
         }
      },
      updatePublished: (state: DeputatesState, action: PayloadAction<UpdatePublishedPayload>) => {
         const { id, published } = action.payload;
         const currentItem = state.list.find(el => el.id === id);
         if (currentItem) {
            currentItem.published = published;
         }
      },
      addOrRemoveChoiceCheckbox: (state: DeputatesState, action: PayloadAction<number>) => {
         //Удаление или добавление выделенных депутатов в массив
         const id = action.payload;
         if (state.choiceCheckbox.includes(id)) {
            state.choiceCheckbox = state.choiceCheckbox.filter(checkboxId => checkboxId !== id);
            //Если id документа уже есть, то удаляем его
         } else {
            state.choiceCheckbox = [...state.choiceCheckbox, id]
         }
      },
      setChoiceCheckboxRemoveOrAddAll: (state: DeputatesState, action: PayloadAction<number[]>) => {
         state.choiceCheckbox = action.payload;
      }
   },
});

export const { deputates, updatePublished, addOrRemoveChoiceCheckbox, setChoiceCheckboxRemoveOrAddAll } = newsSlice.actions;
export default newsSlice.reducer;



