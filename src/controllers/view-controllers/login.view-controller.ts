import { LoginDaoService } from "../../services/login.dao.service";

export class LoginViewController {
    private loginDaoService: LoginDaoService;

    constructor() {
        this.loginDaoService = new LoginDaoService();
    }

    Login = async (req, res) => {
        try {
            res.render('login', { layout: 'loginLayout.handlebars' })
        }
        catch (error) {
            res.send(500)
        }
    }

    Register = async (req, res) => {
        try {
            res.render('register', { layout: 'loginLayout.handlebars' })
        }
        catch (error) {
            res.send(500)
        }
    }
}