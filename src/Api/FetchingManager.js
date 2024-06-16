// FetchingManager.js
class FetchingManager {
    constructor() {
        this.activeRequests = 0;
    }

    startFetching() {
        this.activeRequests += 1;
    }

    stopFetching() {
        if (this.activeRequests > 0) {
            this.activeRequests -= 1;
        }
    }

    isFetching() {
        return this.activeRequests > 0;
    }
}

const fetchingManager = new FetchingManager();
export default fetchingManager;
