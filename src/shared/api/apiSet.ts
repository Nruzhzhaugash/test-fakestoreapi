import axios from 'axios';

export const buildUrl = (url: string, params: any) => {
  let urlWithParams = url;

  Object.entries(params).forEach(([key, value], i) => {
    const sign = !i ? "?" : "&";
    urlWithParams += `${sign}${key}=${value}`;
  });

  return urlWithParams;
};

interface Api {
  id: string | number;
  data: any
}
