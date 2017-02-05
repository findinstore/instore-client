var config = require('../config/js-config');

var BASE_API_PATH = '/api/';

function getResponse(xhr) {
  return xhr.responseText ? JSON.parse( xhr.responseText ): xhr.response ? JSON.parse( xhr.response ) : 'no response';
}

function toApiPathParams( resource, params ) {
  var path = BASE_API_PATH + resource + '/';
  if ( params !== undefined && Object.keys(params).length > 0 ) {
    path += '?';
    path += Object.keys(params)
      .map((key) => key + "=" + params[key])
      .join("&");
  }

  return path;
}

function toApiPath( resource, id ) {
  var path = BASE_API_PATH + resource + '/';

  if ( id !== undefined ) {
    path += id + '/';
  }

  return path;
}

export function toApiPathIdAndParams(resource, id, params) {
  var path = BASE_API_PATH + resource + '/';

  if ( id !== undefined && id !== null ) {
    path += id + '/';
  }

  if ( params !== undefined && Object.keys(params).length > 0 ) {
    path += '?';
    path +=  Object.keys(params)
      .map((key) => {
        var value = params[key];
        if ( typeof value === 'object' ) {
          value = JSON.stringify(value);
        }
        return key + "=" + encodeURIComponent(value);
      }).join("&");
    
  }

  return path;
}

export function cleanParams(params) {
  return Object.keys(params).reduce((prevObj, currValue)=>{
    // if value is null or undefined do not send it over to api
    if ( params[currValue] === undefined ||  params[currValue] === null ) {
      return prevObj;
    }
    // if an empty object or empty array do not send over to api
    if ( typeof params[currValue] === 'object') {
      if ( Object.keys(params[currValue]).length === 0 ) {
        return prevObj;
      }
    }
    // if an empty string do not send over to api
    if ( typeof params[currValue] === 'string' ) {
      if ( params[currValue].length === 0 ) {
        return prevObj;
      }
    }

    prevObj[currValue] = params[currValue]
    return prevObj;
  }, {});
}

export function cleanAndFilterParams(resource, id, params) {
  var filteredParams = cleanParams(params);
  return toApiPathIdAndParams(resource, id, filteredParams);
}

export const repeat = (str, times) => (new Array(times + 1)).join(str);

export const pad = (num, maxLength) => repeat(`0`, maxLength - num.toString().length) + num;

export const formatTime = (time) => `${pad(time.getHours(), 2)}:${pad(time.getMinutes(), 2)}:${pad(time.getSeconds(), 2)}.${pad(time.getMilliseconds(), 3)}`;


function logRequest( xhr ) {
  if (config.logging) {
    console.log(
      "%c%s %c%s",
      "color: rgb(3, 169, 244)",
      "HttpRequest", 
      "rgb(48, 57, 66);", 
      ` @ ${formatTime(new Date())}`, 
      xhr
    );
  }
}

function logResponse( xhr ) {
  if (config.logging) {
    console.log(
      "%c%s %c%s",
      "color: rgb(0, 200, 83)",
      "HttpResponse", 
      "rgb(48, 57, 66);", 
      ` @ ${formatTime(new Date())}`, 
      xhr
    );
  }
}

function logResponseError( xhr ) {
  if (config.logging) {
    console.log(
      "%c%s %c%s",
      "color: rgb(230, 0, 70)",
      "HttpError", 
      "rgb(48, 57, 66);", 
      ` @ ${formatTime(new Date())}`, 
      xhr
    );
  }
}

function cookieGetter() {
  var cookie = document.cookie.match(/\bcsrftoken=(\w+)[\b;]?/);
  return cookie[1] ? cookie[1] : null;
}

function parseResponse(response) {
  var promise;
  try {
    promise = response.json();
  }
  catch(e) {
    console.error('this is not json', e, response);
    promise = response;
    throw Error(data);
  }
  return promise;
}


function checkIfJson(response) {
  return response.headers.get('content-type') && response.headers.get('content-type').includes('json');
}

function isObject(data) {
  return typeof data === 'object'
}

function isPromise(obj) {
  return 'function' == typeof obj.then;
}

function handleHeadersResponseClosure(res) {
  return function handleHeadersResponse(response) { 
    logResponse( response );
    if ( checkIfJson(response) ) return response.json();
    // if ( isObject(jsonPromise) && isPromise(jsonPromise) ) return jsonPromise;
    res();
  }
}

function handleResponseClosure(res) {
  return async function handleResponse(response) { 
    logResponse( response );
    if ( checkIfJson(response) ) {
      var json = await response.json();
      res(json);
    } else {      
      res();
    }
  }
}

async function checkStatus(response) {
  if (!response.ok) {
    if ( checkIfJson(response) ) {
      var json = await response.json();
      throw json;
    } else {
      throw response;
    }
  }
  else return response;
}

var httpLibrary = {
  get: function(resource, id, params = {}) {
    return new Promise((res, rej)=>{
      var path = cleanAndFilterParams( resource, id, params );
      var headers = new Headers();
      headers.append('Accept', 'application/json; charset=UTF-8');
      var detailsObj = {
        method: 'GET',
        headers: headers,
        credentials: 'same-origin'
      };
      var request = new Request(path, detailsObj);
      logRequest( request );
      fetch(request)
        .then(checkStatus)
        .then(handleResponseClosure(res))
        .catch((error)=>{
          logResponseError( error );
          rej(error);
        });
    });
  },

  // TODO: cleanup error handling and catch case
  post: (resource, data) => {
    return new Promise((res, rej) => {
      const path = toApiPath(resource);
      const headers = new Headers();
      headers.append('Content-Type', 'application/json; charset=UTF-8');
      headers.append('X-CSRFToken', cookieGetter());
      headers.append('Accept', 'application/json; charset=UTF-8');
      const detailsObj = {
        method: 'POST',
        headers: headers,
        credentials: 'same-origin',
        body: JSON.stringify(data),
      };
      const request = new Request(path, detailsObj);
      logRequest(request);
      fetch(request)
        .then(checkStatus)
        .then(handleResponseClosure(res))
        .catch((error) => {
          logResponseError(error);
          rej(error);
        });
    });
  },

  postDjango: function( resource, data ) {
    return new Promise( function( res, rej ) {
      var path = resource,
          xhr = new XMLHttpRequest()
      ;

      var formData = new FormData();

      xhr.open( 'POST', path, true );

      xhr.setRequestHeader(
        'Content-Type',
        'application/x-www-form-urlencoded'
      );

      xhr.setRequestHeader(
        'X-CSRFToken',
        cookieGetter()
      );

      xhr.setRequestHeader(
        'Accept',
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
      );
      data.csrfmiddlewaretoken = cookieGetter();

      for (let key of Object.keys(data)) {
        formData.append(key, data[key]);
      }
      var formString = Object.keys(data).map((key)=>{
        var keyEncoded = encodeURIComponent(key).replace('%20', '+');
        var valueEncoded = encodeURIComponent(data[key]).replace('%20', '+');
        return `${key}=${data[key]}`;
      }).join("&");
      xhr.send( formString );

      logRequest( xhr );

      xhr.onload = function() {
        var statusPrefix = Math.floor( xhr.status / 100 ); // 200, 404, etc.

        if ( statusPrefix === 2 ) {
          // var data = xhr.responseText ? JSON.parse( xhr.responseText ): xhr.response ? JSON.parse( xhr.response ) : '';
          logResponse( xhr );
          res( xhr );
        } else {
          logResponseError( xhr );
          rej( xhr );
        }
      };
    });
  },

  // Post to AWS S3
  postS3: function( url, data, onUploadProgress ) {
    return new Promise( function( res, rej ) {
      var path = url,
          xhr = new XMLHttpRequest(),
          formData = new FormData()
      ;
      var keys = Object.keys(data);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if ( key === 'file' ) {
          var file = data[key];
          var blob = new Blob([file.fileContentResult]);
          formData.append(key, blob, file.name);
        } else {
          formData.append(key, data[key]);
        }
      }

      // Keep track of upload progress so that we can message
      xhr.upload.onprogress = onUploadProgress;
      
      xhr.onreadystatechange = function () {
        if ( xhr.readyState === 4 ) {
          var statusPrefix = Math.floor( xhr.status / 100 );

          if (statusPrefix === 2) {
            var data = xhr.responseText;
            logResponse( xhr );
            res( data );
          } else {
            logResponseError( xhr );
            rej( xhr );
          }
        }
      };

      xhr.open( 'POST', path, true );

      xhr.send( formData );

      logRequest( xhr );
    });
  },

  patch: function( resource, id, data ) {
    return new Promise( function( res, rej ) {
      var path = toApiPath( resource, id );
      var headers = new Headers();
      headers.append('Content-Type', 'application/json; charset=UTF-8');
      headers.append('X-CSRFToken', cookieGetter());
      headers.append('Accept', 'application/json; charset=UTF-8');
      var detailsObj = {
        method: 'PATCH',
        headers: headers,
        credentials: 'same-origin',
        body: JSON.stringify( data ),
      }
      var request = new Request(path, detailsObj);
      logRequest( request );
      fetch(request)
        .then(checkStatus)
        .then(handleResponseClosure(res))
        .catch((error)=>{
          logResponseError(error);
          rej(error);
        });
    });
  },

  deleteHttp: function( resource, id, data ) {
    return new Promise( function( res, rej ) {
      var path = toApiPath( resource, id );
      var headers = new Headers();
      headers.append('Content-Type', 'application/json; charset=UTF-8');
      headers.append('X-CSRFToken', cookieGetter());
      headers.append('Accept', 'application/json; charset=UTF-8');
      var detailsObj = {
        method: 'DELETE',
        headers: headers,
        credentials: 'same-origin',
        body: JSON.stringify( data )
      }
      var request = new Request(path, detailsObj);
      logRequest( request );
      fetch(request)
        .then(checkStatus)
        .then(handleResponseClosure(res))
        .catch((error)=>{
          logResponseError( error );
          rej(error);
        });
    });
  }
};

export default httpLibrary;
