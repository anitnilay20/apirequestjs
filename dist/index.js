"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Api {
    constructor() {
        this._request = new XMLHttpRequest();
        this._data = null;
        this._onError = null;
        this._methodFunction = 'get';
        this._url = null;
        this._query = null;
        this._id = null;
        this._parser = JSON.parse;
        this._headers = [];
    }
    _get() {
        this._request.open('GET', this._url + this._serialize(this._query));
    }
    _post() {
        this._request.open('POST', this._url + this._serialize(this._query));
    }
    _put() {
        this._request.open('PUT', this._url + '/' + this._id + this._serialize(this._query));
    }
    _delete() {
        this._request.open('DELETE', this._url + '/' + this._id);
    }
    get(url, query) {
        this._methodFunction = 'get';
        this._url = url;
        this._query = query;
        return this;
    }
    post(url, data, query) {
        this._methodFunction = 'post';
        this._url = url;
        this._query = query;
        this._data = JSON.stringify(data);
        return this;
    }
    put(url, id, data, query) {
        this._methodFunction = 'put';
        this._url = url;
        this._query = query;
        this._id = id;
        this._data = JSON.stringify(data);
        return this;
    }
    delete(url, id) {
        this._methodFunction = 'delete';
        this._url = url;
        this._id = id;
        return this;
    }
    noPrase() {
        this._parser = (x) => x;
        return this;
    }
    setHeader(headerName, value) {
        this._headers.push({ headerName, value });
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
    success(onSuccess) {
        this._request.onload = () => {
            if (this._request.status >= 200 && this._request.status < 400)
                onSuccess(this._request.responseText && this._request.responseText && this._parser(this._request.responseText));
            else
                this._onError({ response: this._parser(this._request.responseText), code: this._request.status });
        };
        return this;
    }
    error(onError) {
        this._onError = onError;
        this._request.onerror = (ev) => onError({ response: this._parser(this._request.responseText), code: this._request.status });
        return this;
    }
    _serialize(obj) {
        if (!obj || typeof obj !== 'object')
            return '';
        let query = '?';
        Object.keys(obj).forEach(value => {
            query += `${value}=${obj[value]}&`;
        });
        return query;
    }
}
exports.default = Api;
//# sourceMappingURL=index.js.map