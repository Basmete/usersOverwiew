import React from "react";
import LoginWindow from "../login-window";
import Axios from "axios";
import UsersTable from "../users-table";
import SearchPanel from "../search-panel";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      loginEnd: false,
      usersArray: [],
      query: "",
    };
    this.updateSearchQuery = this.updateSearchQuery.bind(this);
  }

  saveToken(token) {
    this.setState({
      token,
    });
  }

  closeLogin() {
    this.setState({
      loginEnd: true,
    });
    this.getDataFromAPI(this.state.token);
  }

  updateSearchQuery(query) {
    this.setState((state) => {
      return {
        query,
      };
    });
  }

  async getDataFromAPI(token) {
    const data = await Axios.get(
      "http://emphasoft-test-assignment.herokuapp.com/api/v1/users/",
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    this.setState({
      usersArray: data.data,
    });
  }

  render() {
    const { query } = this.state;
    const data = query
      ? this.state.usersArray.filter(
          (user) =>
            user.username.toLowerCase().indexOf(query.toLowerCase()) !== -1
        )
      : this.state.usersArray;
    return (
      <div className="App container">
        {this.state.loginEnd ? (
          <SearchPanel update={this.updateSearchQuery} />
        ) : null}
        {!this.state.loginEnd ? (
          <LoginWindow
            saveToken={this.saveToken.bind(this)}
            closeLogin={this.closeLogin.bind(this)}
          />
        ) : null}
        {this.state.loginEnd ? <UsersTable data={data} /> : null}
      </div>
    );
  }
}

export default App;
