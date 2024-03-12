/* eslint-disable */ 
import axios from "axios";

const http = axios.create({
  // baseURL: process.env.REACT_APP_BACKEND_URL+'/',
  baseURL: 'http://localhost:5000/',
  headers: {
    "Content-type": "application/json"
  },
  withCredentials: true
});

export default {
  auth(url = 'auth') {
    return {
        login: ({email, password}) => {
          return http.post(url + '/login', {email, password})
        },
        register: ({email, name, password,regNumber}) => http.post(url + '/signup/', {email, name, password,regNumber}),
        logout: () => http.get(url + '/logout')
    }
  },

  map(url = 'map') {
      const config = {
        headers: {
          'authorization': 'Bearer ' + localStorage.getItem('token')
        }
      };

      return {
          fetchAll: () => http.get(url + '/list', config),
          fetchById: id => http.get(url + "/" + id, config),
          create: newRecord => http.post(url, newRecord, config),
          update: (id, updatedRecord) => http.put(url + "/" + id, updatedRecord, config),
          delete: id => http.delete(url + "/" + id, config)
      }
  },

  user(url = 'department') {
      const config = {
        headers: {
          'authorization': 'Bearer ' + localStorage.getItem('token')
        }
      };

      return {
          fetchAll: () => http.get(url , config),
          fetchById: id => http.get(url + "/" + id, config),
          create: newRecord => http.post(url, newRecord, config),
          update: (updatedRecord) => http.post(url, updatedRecord, config),
          delete: id => http.post(url,id, config)
      }
  }

}