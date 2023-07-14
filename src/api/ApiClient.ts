/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-console */
import {API_URL} from '../style/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {asyncStorageKeys} from '../style/constants';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export class ApiClient {
  baseUrl: string = API_URL;
  apiConfig: RequestInit = {
    mode: 'cors', // no-cors, *cors, same-origin
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  async request(method: RequestMethod, endpoint = '', data = {}) {
    const token = await AsyncStorage.getItem(
      asyncStorageKeys.loggedInUserToken,
    );
    const parsedToken = token && JSON.parse(token);
    const tokenObj = {Authorization: ` ${parsedToken}`};
    console.log(tokenObj);
    const configWithToken: RequestInit = {
      ...this.apiConfig,
      headers: {
        ...this.apiConfig.headers,
        ...(parsedToken && tokenObj),
      },
    };
    const url = `${API_URL}${endpoint}`;

    console.log(`${method} REQUEST: ${url}`);
    console.log('HEADER:', configWithToken);
    console.log('DATA:', data);

    const body = method !== 'GET' && {
      body: JSON.stringify(data),
    };
    return await fetch(url, {
      ...configWithToken,
      method: method,
      ...body, // body data type must match "Content-Type" header
    })
      .then(response => response.json())
      .catch(error => error); // to handle system generated erros
  }

  async post(endpoint = '', data = {}) {
    return this.request('POST', endpoint, data);
  }

  async get(endpoint = '', data = {}) {
    return this.request('GET', endpoint, data);
  }

  async delete(endpoint = '', data = {}) {
    return this.request('DELETE', endpoint, data);
  }

  async put(endpoint = '', data = {}) {
    return this.request('PUT', endpoint, data);
  }

  async patch(endpoint = '', data = {}) {
    return this.request('PATCH', endpoint, data);
  }
}
