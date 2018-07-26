declare class Api {
    constructor();
    get(url: string, query?: object):this;
    post(url: string, data: object, query?: object):this;
    put(url: string, id: number, data: object, query?: object);
    delete(url: string, id: number): this;
    noPrase();
    setHeader(headerName: string, value: string);
    done();
    success(onSuccess: (reposnse: any) => void):this;
    error(onError: (onError?: ({response: any, code: number})) => void): this;
}