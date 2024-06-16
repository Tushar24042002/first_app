// fetchWrapper.js
import fetchingManager from './FetchingManager';

const fetchWrapper = async (url, options) => {
    fetchingManager.startFetching();
    try {
        const response = await fetch(url, options);
        return response;
    } finally {
        fetchingManager.stopFetching();
    }
};

export default fetchWrapper;
