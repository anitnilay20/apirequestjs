import { ajax, AjaxRequest } from 'rxjs/ajax';
import { map, catchError } from 'rxjs/operators';

export class Api {
  private static _instance: Api;

  static instance = (): Api => {
    if (!(Api._instance instanceof Api)) {
      Api._instance = new Api();
    }

    return Api._instance;
  }

  request(request: AjaxRequest) {
    return ajax(request);
  }

  get(url: string, headers: object, urlParams?: object) {
    return ajax.get(url + this._serialize(urlParams), headers || {});
  }

  post<Body>(url: string, body: Body, headers: object, urlParams?: object) {
    return ajax.post(url + this._serialize(urlParams), body, headers || {});
  }

  put<Body>(url: string, body: Body, headers: object, urlParams?: object) {
    return ajax.put(url + this._serialize(urlParams), body, headers || {});
  }

  graphql<Variables, Response>(url: string, variables: Variables, query: string, headers: object,
    response: (res: Response) => void, error: (err: any) => void) {
    return ajax.post(
      url,
      { query, variables },
      headers
    ).subscribe(res => response(res.response), error)
  }

  delete(url: string, headers: object, urlParams?: object) {
    return ajax.delete(url + this._serialize(urlParams), headers || {});
  }

  _serialize(obj: object) {
    if (!obj || typeof obj !== 'object') return '';

    let query: string = '?';
    Object.keys(obj).forEach(value => {
      query += `${value}=${obj[value]}&`;
    });
    return query;
  }
}

interface Headers {
  key: string;
  value: string;
}

export default Api.instance();