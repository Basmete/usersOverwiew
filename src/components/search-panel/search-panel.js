import React from "react";
import './search-panel.scss'

class SearchPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };
  }

  updateSearch(e) {
    this.setState({ search: e.target.value.substr(0, 20) }, () =>
      this.props.update(this.state.search)
    );
  }

  render() {
    return (
      <div className="search-container">
        <label className="search-label" htmlFor="search-input">
          <h4>Поиск по никнейму</h4>
          <input
            type="text"
            value={this.state.search}
            id="search-input"
            placeholder="Начните вводить никнейм"
            onChange={(e) => this.updateSearch(e)}
          />
        </label>
      </div>
    );
  }
}

export default SearchPanel;
