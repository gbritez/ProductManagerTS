import { LoginDaoService } from "../../services/login.dao.service";

export class LoginViewController {
    private loginDaoService: LoginDaoService;

    constructor() {
        this.loginDaoService = new LoginDaoService();
    }

    Login = async (req, res) => {
        try {
            console.log("hola", req.session)
            res.render('login', { layout: 'loginLayout.handlebars', user: req.session.user })
        }
        catch (error) {
            res.status(500).send(error.message)
        }
    }

    Register = async (req, res) => {
        try {
            res.render('register', { layout: 'loginLayout.handlebars' })
        }
        catch (error) {
            res.status(500).send(error.message)
        }
    }
}