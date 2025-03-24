import axios from "axios";
import { getQuerySettings } from "utils";

const hostname = window.location.hostname;
const currentURL = function () {
   if (hostname.includes("localhost")) {
      return "https://dev.sdhimki.ru/"
   } else if (hostname.includes('dev.sdhimki.ru')) {
      return "https://dev.sdhimki.ru/"
   } else if (hostname.includes("sdhimki.ru")) {
      return "https://sdhimki.ru/"
   }
}()

const instance = axios.create({
   /* withCredentials: true,
    headers: {
       'API-KEY': 'Ключ'
    }, */
   baseURL: `${currentURL}laravel/public/api`,
});

const API = {
   getNews: async (page = 1, limit = 12, type = '', favorite = "", dateFrom = "", dateTo = "") => {
      const querySettings = getQuerySettings(type)
      return instance
         .get(
            `content/news/list?page=${page}&limit=${limit}&favorite=${favorite}&${querySettings}`
         )
         .then((response) => response.data)
         .catch((err) => {
            console.log(`Error: ${err?.message}`)
         })
   },
   getItemNews: async (id) => {
      return instance
         .get(`content/news/item?id=${id}`)
         .then((response) => response.data)
         .catch((err) => {
            console.log(`Error: ${err?.message}`)
         })
   },

   getDocumentations: async (page, limit = 10, type = '', search = "") => {
      const querySettings = getQuerySettings(type)
      return instance
         .get(
            `content/document/list?page=${page}&limit=${limit}&${querySettings}${search && `&search=${search}`}`
         )
         .then((response) => response.data)
         .catch((err) => {
            console.log(`Error: ${err?.message}`)
         })
   },
   getDeputaty: async (page, limit, type = '') => {
      const querySettings = getQuerySettings(type)
      return instance
         .get(
            `content/deputaty/list?page=${page}&limit=${limit}&${querySettings}`
         )
         .then((response) => response.data)
         .catch((err) => {
            console.log(`Error: ${err?.message}`)
         })
   },
   postSubscribeNews: async (email) => {
      return instance
         .post(`subscribe/add`, email)
         .then((response) => response.data)
         .catch((err) => {
            console.log(`Error: ${err?.message}`)
         })
   },
   postСomplaint: async (data) => {
      return axios
         .post(`https://admhimki.ru/delara/public/api/support/ticket/add`, data)
         .then((response) => response.data)
         .catch((err) => {
            console.log(`Error: ${err?.message}`)
         })
   },
   getSearch: async (search, type = '') => {
      const querySettings = getQuerySettings(type)
      return await instance
         .get(`content/search/list?${search && `&search=${search}`}&${querySettings}`)
         .then((response) => response.data)
         .catch((err) => {
            console.log(`Error: ${err?.message}`)
         })
   },

   /* admin */
   /* postPublished: async (id, published) => {
      const formData = new FormData();
      formData.append("id", id)
      formData.append("published", published)
      return await instance
         .post(`/published`, formData)
         .then((response) => response.data)
         .catch((err) => {
            console.log(`Error: ${err?.message}`)
         })
   }, */

   postLogin: async (data) => {
      return await instance
         .post("user/auth", data)
         .then((response) => response.data)
         .catch((err) => {
            console.log(`Error: ${err?.message}`)
         })
   },
   getLogout: async () => {
      return await instance
         .get("user/out")
         .then((response) => response.data)
         .catch((err) => {
            console.log(`Error: ${err?.message}`)
         })
   },
   getItemDocument: async (id) => {
      return await instance
         .get(`content/document/item?id=${id}`)
         .then((response) => response.data)
         .catch((err) => {
            console.log(`Error: ${err?.message}`)
         })
   },
   getItemDeputat: async (id) => {
      return await instance
         .get(`content/deputaty/item?id=${id}`)
         .then((response) => response.data)
         .catch((err) => {
            console.log(`Error: ${err?.message}`)
         })
   },
   postChangeElement: async (data) => {
      return await instance
         .post(`content/edit`, data)
         .then((response) => response.data)
         .catch((err) => {
            console.log(`Error: ${err?.message}`)
         })
   },
   postAddElement: async (data) => {
      return await instance
         .post(`content/add`, data)
         .then((response) => response.data)
         .catch((err) => {
            console.log(`Error: ${err?.message}`)
         })
   },
   getParty: async (id) => {
      return await instance
         .get(`content/party/list`)
         .then((response) => response.data)
         .catch((err) => {
            console.log(`Error: ${err?.message}`)
         })
   },
   postAddMultipleElementsPublick: async (data) => {
      const newData = new FormData();
      for (let key in data) {
         if (Array.isArray(data[key])) {
            data[key].forEach((el, i) => newData.append(`id[${i}]`, el))
         } else {
            newData.append(key, data[key])
         }
      }
      return await instance
         .post(`content/edit/list`, newData)
         .then((response) => response.data)
         .catch((err) => {
            console.log(`Error: ${err?.message}`)
         })
   },
};
export default API;