export default class Api {
    private _request = new XMLHttpRequest();
    private _data = null;
    private _onError = null;
    private _methodFunction = 'get';
    private _url = null;
    private _query = null;
    private _id = null;
    private _parser = JSON.parse;
    private _headers = [];
    constructor() {}
  
    private _get() {
      this._request.open('GET', this._url + this._serialize(this._query));
    }
  
    private _post() {
      this._request.open('POST', this._url + this._serialize(this._query));
    }
  
    private _put() {
      this._request.open('PUT', this._url + '/' + this._id + this._serialize(this._query));
    }
  
    private _delete() {
      this._request.open('DELETE', this._url + '/' + this._id);
    }
  
    get(url: string, query?: object): this {
      this._methodFunction = 'get';
      this._url = url;
      this._query = query;
      return this;
    }
  
    post(url: string, data: object, query?: object): this {
      this._methodFunction = 'post';
      this._url = url;
      this._query = query;
      this._data = JSON.stringify(data);
      return this;
    }
  
    put(url: string, id: number, data: object, query?: object): this {
      this._methodFunction = 'put';
      this._url = url;
      this._query = query;
      this._id = id;
      this._data = JSON.stringify(data);
      return this;
    }
  
    delete(url: string, id: number): this {
      this._methodFunction = 'delete';
      this._url = url;
      this._id = id;
      return this;
    }
  
    noPrase() {
      this._parser = (x) => x;
      return this;
    }
  
    setHeader(headerName: string, value: string) {
      this._headers.push({headerName, value});
      return this;
    }
  
    done() {
      setTimeout(() => {
        this['_' + this._methodFunction]();
        this._request.setRequestHeader('Content-Type', 'application/json');
        this._headers.forEach(element => {
          this._request.setRequestHeader(element.headerName, element.value);
        });
        this._request.send(this._data);
      }, 400);
    }
  
    success(onSuccess: (reposnse: any) => void) {
      this._request.onload = () => {
        if (this._request.status >= 200 && this._request.status < 400)
          onSuccess(this._request.responseText && this._request.responseText && this._parser(this._request.responseText));
        else this._onError({response: this._parser(this._request.responseText), code: this._request.status});
      };
      return this;
    }
  
    error(onError: (onError?: ({response: any, code: number})) => void) {
      this._onError = onError;
      this._request.onerror = (ev) => onError({response: this._parser(this._request.responseText), code: this._request.status});
      return this;
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
  