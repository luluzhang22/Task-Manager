export const callPostJsonService = (url, body) => {
    return fetch(url, {method: 'POST', body: JSON.stringify(body) })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
                return Promise.reject('error-response-not-okay');
        })
        .catch ((error) => {
            if(error.toString().startsWith('error-')) {
                return Promise.reject(error);
            }
                return Promise.reject('error-response-json-bad');
        });
};

export const callGetJsonService = (url) => {
    return fetch(url)
        .then( response => {
            if(response.ok) {
                return response.json();
            }
                return Promise.reject('error-response-not-okay');
        } )
        .catch( ( error ) => {
            if(error.toString().startsWith('error-')) {
                return Promise.reject(error);
            }
                return Promise.reject('error-response-json-bad');
        } );
}
