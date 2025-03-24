export const ROUTER = {
   Aсheck_endpoint: "proverka-endpointa",
   main: "/",
   news: "/novosti",
   newsArticle: "/novosti/:id",
   documents: "/documents",
   councilDeputies: {
      legalBasisActivity: "/pravovaya-osnova-deyatelnosti",
      symbolism: "/ustav-i-simvolika",
      deputies: {
         main: "/deputaty",
         deputies: "/deputaty",
         chart: "/deputaty/grafik-priyema-deputatov",
         awards: "/deputaty/nagrady-soveta-deputatov",
         rules: "/deputaty/pravila-deputatskoy-etiki",
      },
      compositionStructure: "/sostav-i-struktura",
      writeAdministration: "/napisat-v-administratsiyu",
   },
   contacts: {
      main: "/contacts",
   },
   search: "/search",

   admin: {
      main: '/admin',
      login: '/admin/login',
      news: '/admin/novost',
      newsArticle: '/admin/dobavit-novost',
      newsArticleEdit: '/admin/redaktirovat-novost/:id',
      documents: '/admin/dokumenty',
      documentsArticle: '/admin/dobavit-dokumenty',
      documentsArticleEdit: '/admin/redaktirovat-dokumenty/:id',
      deputies: '/admin/deputaty',
      deputiesArticle: '/admin/dobavit-deputaty',
      deputiesArticleEdit: '/admin/redaktirovat-deputaty/:id',
   },
};
