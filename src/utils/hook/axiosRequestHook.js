import axios from 'axios';

const URL = 'http://localhost:8080/api/v1';

const axiosRequest = (params) => {
    const { method, url = '', data, callback } = params;

    const config = {
        method: method.toUpperCase(),
        url: URL + url,
        params: data,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (method.toUpperCase() === 'GET') {
        config.params = data;
    } else {
        config.data = data;
    }

    axios(config)
        .then((response) => {
            if (callback) {
                callback(response.data);
            }
        })
        .catch((error) => {
            console.error('Error occurred while making request:', error);
        });
};

export default axiosRequest;