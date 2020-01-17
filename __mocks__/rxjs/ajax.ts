import { Observable } from 'rxjs';

export const ajax = {
  post: jest.fn((url: string, body: Body, headers: object, urlParams?: object) => {
    return new Observable((s) => {
      setTimeout(() => s.next({ response: { data: body } }), 1000);
    });
  }),
};
