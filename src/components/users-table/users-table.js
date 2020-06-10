import React, { Component } from "react";
import { Cell, Column, Table, HeaderCell } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";

class UsersTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortColumn: "id",
    };
    this.handleSortColumn = this.handleSortColumn.bind(this);
  }

  getData() {
    const { sortColumn, sortType } = this.state;
    const { data } = this.props;

    if (sortColumn && sortType) {
      return data.sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];
        if (typeof x === "string") {
          x = x.charCodeAt();
        }
        if (typeof y === "string") {
          y = y.charCodeAt();
        }
        if (sortType === "asc") {
          return x - y;
        } else {
          return y - x;
        }
      });
    }
    return data;
  }

  handleSortColumn(sortColumn, sortType) {
    this.setState({
      loading: true,
    });

    this.setState({
      sortColumn,
      sortType,
      loading: false,
    });
  }
  render() {
    const formatData = this.getData().map((user) => {
      const isActive = user.is_active ? "В сети" : "Не в сети";
      const isSuperuser = user.is_superuser
        ? "Суперпользователь"
        : "Пользователь";
      const lastLogin = user.last_login
        ? `${user.last_login.substr(0, 10)}`
        : "Неизвестно";
      const newUser = {
        ...user,
        is_active: isActive,
        is_superuser: isSuperuser,
        last_login: lastLogin,
      };
      return newUser;
    });
    return (
      <div>
        <Table
          height={800}
          data={formatData}
          sortColumn={this.state.sortColumn}
          sortType={this.state.sortType}
          onSortColumn={this.handleSortColumn}
          loading={this.state.loading}
          onRowClick={(data) => {}}
          rowHeight={100}
          wordWrap
        >
          <Column
            verticalAlign="middle"
            width={80}
            sortable
            resizable
            align="center"
          >
            <HeaderCell>ID</HeaderCell>
            <Cell dataKey="id" />
          </Column>

          <Column
            verticalAlign="middle"
            width={90}
            sortable
            resizable
            align="center"
          >
            <HeaderCell>Никнейм</HeaderCell>
            <Cell dataKey="username" />
          </Column>

          <Column
            verticalAlign="middle"
            width={200}
            sortable
            resizable
            align="center"
          >
            <HeaderCell>Имя</HeaderCell>
            <Cell dataKey="first_name" />
          </Column>

          <Column
            verticalAlign="middle"
            width={100}
            sortable
            resizable
            align="center"
          >
            <HeaderCell>Фамилия</HeaderCell>
            <Cell dataKey="last_name" />
          </Column>

          <Column
            verticalAlign="middle"
            width={200}
            sortable
            resizable
            align="center"
          >
            <HeaderCell>В сети</HeaderCell>
            <Cell dataKey="is_active"></Cell>
          </Column>

          <Column verticalAlign="middle" width={200} resizable align="center">
            <HeaderCell>Последний вход</HeaderCell>
            <Cell dataKey="last_login" />
          </Column>

          <Column verticalAlign="middle" width={220} resizable align="center">
            <HeaderCell>Суперпользователь</HeaderCell>
            <Cell dataKey="is_superuser" />
          </Column>
        </Table>
      </div>
    );
  }
}

export default UsersTable;
