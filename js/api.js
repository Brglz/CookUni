export default class API {
    constructor(appId, apiKey, beginRequest, endRequest) {
        this.appId = appId;
        this.apiKey = apiKey;
        this.endpoints = {
            REGISTER: 'users/register',
            LOGIN: 'users/login',
            LOGOUT: 'users/logout'
        };

        this.beginRequest = () => {
            if (beginRequest) {
                beginRequest();
            }
        };
        this.endRequest = () => {
            if (endRequest) {
                endRequest();
            }
        };
    }

    host(endpoint) {
        return `https://api.backendless.com/${this.appId}/${this.apiKey}/${endpoint}`;
    };

    getOptions(headers) {
        const token = sessionStorage.getItem('userToken');

        const options = { headers: headers || {} };

        if (token !== null) {
            Object.assign(options.headers, { 'user-token': token });
        }

        return options
    }

    async get(endpoint) {
        this.beginRequest();
        const result = await fetch(this.host(endpoint), this.getOptions());
        this.endRequest();
        try {
            return await result.json();
        } catch (e) {
            return result;
        }
    }

    async post(endpoint, body) {
        const options = this.getOptions({ 'Content-Type': 'application/json' });

        options.method = 'POST';
        options.body = JSON.stringify(body);

        this.beginRequest();
        const result = (await fetch(this.host(endpoint), options)).json();
        this.endRequest();

        return result;
    }

    async put(endpoint, body) {
        const options = this.getOptions({ 'Content-Type': 'application/json' });

        options.method = 'PUT';
        options.body = JSON.stringify(body);//

        this.beginRequest();
        const result = (await fetch(this.host(endpoint), options)).json();
        this.endRequest();

        return result;
    }

    async delete(endpoint) {
        const options = this.getOptions();

        options.method = 'DELETE';

        this.beginRequest();
        const result = (await fetch(this.host(endpoint), options)).json();
        this.endRequest();

        return result;
    }

    async register(firstName, lastName, username, password) {
        return this.post(this.endpoints.REGISTER, {
            firstName,
            lastName,
            username,
            password
        })
    }

    async login(username, password) {
        const result = await this.post(this.endpoints.LOGIN, {
            login: username,
            password
        });

        sessionStorage.setItem('userToken', result['user-token']);
        sessionStorage.setItem('username', result.username);
        sessionStorage.setItem('userId', result.objectId);
        sessionStorage.setItem('names', `${result.firstName} ${result.lastName}`);

        return result;
    }

    async logout() {
        const result = await this.get(this.endpoints.LOGOUT);
        sessionStorage.removeItem('userToken');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('names');
        sessionStorage.removeItem('userId');

        return result;
    }
}