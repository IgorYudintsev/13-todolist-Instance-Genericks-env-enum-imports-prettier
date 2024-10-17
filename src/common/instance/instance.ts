import axios from "axios"

// export const instance = axios.create({
//     baseURL: 'https://social-network.samuraijs.com/api/1.1/',
//     headers: {
//         Authorization: 'Bearer dd0e9571-2304-4e39-b3b6-250bb5ec82e4',
//         'API-KEY': 'ae98b7f2-5f73-4c8a-875b-ccc39eee3197',
//     },
// });

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
    "API-KEY": process.env.REACT_APP_API_KEY,
  },
})

//console.log(process.env.NODE_ENV)// выдаст development
//TODO: т.е. мы можем здесь сделать переключалку с development на production
// будут созданы файлы .env.prod и .env.dev
