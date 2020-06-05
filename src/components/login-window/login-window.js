import React from "react";
import "./login-window.scss";
import axios from "axios";

class LoginWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "test_super",
      password: "Nf<U4f<rDbtDxAPn",
      isLoginFailed: true
    };
  }

  inputHandler(e) {
    if (e.target.type === "text") {
      this.setState({
        username: e.target.value,
      });
    } else if (e.target.type === "password") {
      this.setState({
        password: e.target.value,
      });
    }
  }

  async login() {
    try {
      const { password, username } = this.state;
      const loginResponse = await axios.post(
        "https://emphasoft-test-assignment.herokuapp.com/api-token-auth/",
        {
          username,
          password,
        }
      );
      if ((loginResponse.status = 200)) {
        const token = loginResponse.data.token;
        this.props.saveToken(token);
        this.props.closeLogin()
      }
    } catch (e) {
      this.setState({
        isLoginFailed: false,
      });
    }
  }

  render() {
    const { isLoginFailed } = this.state;
    const isErrLogin = isLoginFailed ? "hidden" : null;
    return (
      <div className="modal-window">
        <div className="modal-window__content container">
          <div className="row">
            <div className="col-lg-12">
              <header>Пожалуйста войдите в запись</header>
            </div>
            <div className="col-lg-12 modal-window__input">
              <label>Логин</label>
              <input onChange={(e) => this.inputHandler(e)} type="text"></input>
            </div>
            <div className="col-lg-12 modal-window__input">
              <label>Пароль</label>
              <input
                onChange={(e) => this.inputHandler(e)}
                type="password"
              ></input>
            </div>
            <div className="col-lg-12 modal-window__input">
              <a onClick={() => this.login()} className="btn btn-success">
                Войти
              </a>
            </div>
            <div className="col-lg-12 modal-window__login-failure">
              <p className={isErrLogin}>{`Неправильный логин или пароль.`}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginWindow;
