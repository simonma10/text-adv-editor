
export const RESULTS_FETCHED_ERROR = 'RESULTS_FETCHED_ERROR';
export const NETWORK_ERROR = 'NETWORK_ERROR';

/**
 *
 * @param method - eg GET
 * @param dataUrl - URL
 * @param data -
 * @param dataAcquiredType - action to be dispatched on receipt
 * @param successCallBack
 * @param failCallBack
 * @param failSilently
 * @param headers
 * @returns {function(*): Promise.<TResult>}
 */
export function genericFetch({
                                 method,
                                 dataUrl,
                                 data,
                                 dataAcquiredType,
                                 successCallBack = () => '',
                                 failCallBack = () => '',
                                 failSilently,
                                 headers = {
                                     Accept: 'application/json',
                                     'Content-Type': 'application/json'
                                 }
                             }) {
    const networkError = failSilently ? 'FAIL_SILENTLY' : NETWORK_ERROR;

    return dispatch => window.fetch(dataUrl, {
        method,
        headers,
        credentials: 'same-origin',
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(
            (payload) => {
                dispatch({ type: dataAcquiredType, results: payload });
                successCallBack(payload);
            },
            (error) => {
                dispatch({ type: networkError, error });
                failCallBack(error);
            }
        );
}
