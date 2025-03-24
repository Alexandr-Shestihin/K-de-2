import { createSlice, PayloadAction } from '@reduxjs/toolkit';

//Определяем интерфейс конкретной новости
interface NewsItem {
   alias: string;
   created_at: string;
   dateTime: string;
   description: string;
   id: number;
   image_preview: string;
   name: string;
   published: number;
   type: string;
}

// Определяем интерфейс для состояния списка новостей
interface NewsState {
   all: number;
   limit: string | number;
   list: NewsItem[];
   page: string | number;
   choiceCheckbox: number[];
}

// Определяем начальное состояние
const initialState: NewsState = {
   all: 0,
   limit: "10",
   list: [],
   page: "1",
   choiceCheckbox: []
};

//Определяем интерфейс для данных, которые ожидаем получить с бэка
interface NewsResponse {
   news: {
      all: number;
      list: NewsItem[];
      limit?: string | number; //  string | number опционально
      page?: string | number; //  string | number опционально
   }
}

interface UpdatePublishedPayload {
   id: number;
   published: number;
}

export const newsSlice = createSlice({
   name: 'news',
   initialState,
   reducers: {
      news: (state: NewsState, action: PayloadAction<NewsResponse>) => {
         state.all = action.payload?.news?.all;
         state.list = action.payload?.news?.list;
         if (action.payload?.news?.limit !== undefined) {
            state.limit = action.payload?.news?.limit;
         }
         if (action.payload?.news?.page !== undefined) {
            state.page = action.payload?.news?.page;
         }
      },
      updatePublished: (state: NewsState, action: PayloadAction<UpdatePublishedPayload>) => {
         const { id, published } = action.payload;
         const currentItem = state.list.find(el => el.id === id);
         if (currentItem) {
            currentItem.published = published;
         }
      },
      addOrRemoveChoiceCheckbox: (state: NewsState, action: PayloadAction<number>) => {
         //Удаление или добавление выделенных новостей в массив
         const id = action.payload;
         if (state.choiceCheckbox.includes(id)) {
            state.choiceCheckbox = state.choiceCheckbox.filter(checkboxId => checkboxId !== id);
            //Если id новости уже есть, то удаляем его
         } else {
            state.choiceCheckbox = [...state.choiceCheckbox, id]
         }
      },
      setChoiceCheckboxRemoveOrAddAll: (state: NewsState, action: PayloadAction<number[]>) => {
         state.choiceCheckbox = action.payload;
      }
   },
});

export const { news, updatePublished, addOrRemoveChoiceCheckbox, setChoiceCheckboxRemoveOrAddAll } = newsSlice.actions;
export default newsSlice.reducer;