import { createSlice, PayloadAction } from '@reduxjs/toolkit';

//Определяем интерфейс конкретного документа
interface DocumentItem {
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

// Определяем интерфейс для состояния списка документов
interface DocumentState {
   all: number;
   limit: string | number;
   list: DocumentItem[];
   page: string | number;
   choiceCheckbox: number[];
}

// Определяем начальное состояние
const initialState: DocumentState = {
   all: 0,
   limit: "10",
   list: [],
   page: "1",
   choiceCheckbox: []
};

//Определяем интерфейс для данных, которые ожидаем получить с бэка
interface DocumentResponse {
   document: {
      all: number;
      list: DocumentItem[];
      limit?: string | number; //  string | number опционально
      page?: string | number; //  string | number опционально
   }
}

interface UpdatePublishedPayload {
   id: number;
   published: number;
}

export const newsSlice = createSlice({
   name: 'documents',
   initialState,
   reducers: {
      documents: (state: DocumentState, action: PayloadAction<DocumentResponse>) => {

         if (JSON.stringify(action.payload?.document?.all) !== JSON.stringify(state.list)) {
            state.all = action.payload?.document?.all;
            state.list = action.payload?.document?.list;

            if (action.payload?.document?.limit !== undefined) {
               state.limit = action.payload?.document?.limit;
            }
            if (action.payload?.document?.page !== undefined) {
               state.page = action.payload?.document?.page;
            }
         }
      },
      updatePublishedDocument: (state: DocumentState, action: PayloadAction<UpdatePublishedPayload>) => {
         const { id, published } = action.payload;
         const currentItem = state.list.find(el => el.id === id);
         if (currentItem) {
            currentItem.published = published;
         }
      },
      addOrRemoveChoiceCheckbox: (state: DocumentState, action: PayloadAction<number>) => {
         //Удаление или добавление выделенных документов в массив
         const id = action.payload;
         if (state.choiceCheckbox.includes(id)) {
            state.choiceCheckbox = state.choiceCheckbox.filter(checkboxId => checkboxId !== id);
            //Если id документа уже есть, то удаляем его
         } else {
            state.choiceCheckbox = [...state.choiceCheckbox, id]
         }
      },
      setChoiceCheckboxRemoveOrAddAll: (state: DocumentState, action: PayloadAction<number[]>) => {
         state.choiceCheckbox = action.payload;
      }
   },
});

export const { documents, updatePublishedDocument, addOrRemoveChoiceCheckbox, setChoiceCheckboxRemoveOrAddAll } = newsSlice.actions;
export default newsSlice.reducer;



