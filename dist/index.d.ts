export default class Api {
    private _request;
    private _data;
    private _onError;
    private _methodFunction;
    private _url;
    private _query;
    private _id;
    private _parser;
    private _headers;
    constructor();
    private _get;
    private _post;
    private _put;
    private _delete;
    get(url: string, query?: object): this;
    post(url: string, data: object, query?: object): this;
    put(url: string, id: number, data: object, query?: object): this;
    delete(url: string, id: number): this;
    noPrase(): this;
    setHeader(headerName: string, value: string): this;
    done(): void;
    success(onSuccess: (reposnse: any) => void): this;
    error(onError: (onError?: ({
        response: any;
        code: number;
    })) => void): this;
    _serialize(obj: object): string;
}
