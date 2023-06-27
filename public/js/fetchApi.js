class ApiClient {
  constructor(urlApi) {
    this.urlApi = urlApi;
  }

  async fetchData(endpoint, method = 'GET', body = null) {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }
    const response = await fetch(`${this.urlApi}${endpoint}`, options);
    const data = await response.json();
    return data;
  }
}

export default ApiClient;