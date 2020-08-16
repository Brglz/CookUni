import { showError, showInfo } from '../notifications.js';
import { register, checkResult, login, logout } from '../data.js';

export async function registerPage() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };

    this.partial('./templates/user/register.hbs');
}

export async function registerPost() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };
    try {
        if (this.params.firstName.length < 2) {
            throw new Error('First name must be at least 2 characters long!')
        }
        if (this.params.lastName.length < 2) {
            throw new Error('Last name must be at least 2 characters long!')
        }
        if (this.params.username.length < 3) {
            throw new Error('Username must be at least 3 characters long!')
        }
        if (this.params.password.length < 6) {
            throw new Error('Password must be at least 6 characters long!')
        }
        if (this.params.password !== this.params.repeatPassword) {
            throw new Error('Passwords does NOT match!')
        }

        const result = await register(
            this.params.firstName,
            this.params.lastName,
            this.params.username,
            this.params.password
        );

        checkResult(result)

        const loginResult = await login(this.params.username, this.params.password);

        checkResult(loginResult)

        this.app.userData.username = loginResult.username;
        this.app.userData.userId = loginResult.objectId;
        this.app.userData.names = `${loginResult.firstName} ${loginResult.lastName}`;

        showInfo('User registered successful!');

        this.redirect('#/home');

    } catch (err) {
        showError(err.message);
    }
    this.partial('./templates/user/register.hbs');
}

export async function loginPage() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };

    this.partial('./templates/user/login.hbs');
}

export async function loginPost() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };

    try {
        const result = await login(this.params.username, this.params.password);

        checkResult(result)

        this.app.userData.username = result.username;
        this.app.userData.userId = result.objectId;
        this.app.userData.names = `${result.firstName} ${result.lastName}`;

        showInfo(`Logged as ${result.username}`);

        this.redirect('#/home');

    } catch (err) {
        showError(err.message)
    }
}


export async function logoutPage() {
    try {
        const result = await logout();

        checkResult(result);

        this.app.userData.username = '';
        this.app.userData.userId = '';
        this.app.userData.names = '';

        showInfo('Successfully logged out!')

        this.redirect('#/home')

    } catch (err) {
        showError(err.message)
    }
}