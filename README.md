# Request Api JS

Access json api with ease

## Features

- Make [XMLHttpRequests](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) from the browser
- Automatic transforms for JSON data

## Browser Support

![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) |
--- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ |

## Installing

Using npm:

```bash
$ npm install requestapijs
```

Using yarn:
```
$ yarn add requestapijs
```

## Example
________________________________________________________________________
### Get Request
```
new Api().get(URLS.COMPANY)
    .setHeader('authorization', localStorage.getItem('token'))
    .success(
      response => { #DO something },
    )
    .error(e => apiErrorHandler(e))
    .done();
```

### Put Request
```
new Api().put(URLS.COMPANY, id, value)
    .setHeader('authorization', localStorage.getItem('token'))
    .success(
      response => {
        #Do something
      },
    ).error(
      error => { onError && onError(error); apiErrorHandler(error); },
    ).done();
```

### Post
```
new Api().post(URLS.COMPANY, value)
    .setHeader('authorization', localStorage.getItem('token'))
    .success(
      response => {
        COMPANY_REDUCER.fetchCompany();
        onSuccess && onSuccess(response);
      },
    ).error(
      error => { onError && onError(error); apiErrorHandler(error); },
    ).done();
```