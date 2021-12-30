import "./App.css";
import React from "react";
import crudApi from "./api/crudApi";
class App extends React.Component {
  state = { users: null, errorMsg: "", isLoading: false };

  componentDidMount() {
    this.getUsers();
  }

  //Create, Read, Update, Delete
  getUsers = async () => {
    try {
      let { data } = await crudApi.get("users");
      console.log("users", data);
      // this.setState({ avatar: avatar.data.value });
      this.setState({ users: data });
    } catch (e) {
      this.setState({ errorMsg: e.message });
    }
  };
  creatUser = async (obj) => {
    try {
      //{ name: "mordi", image: "gg", phone: "0526" }
      let user = await crudApi.post(`users`, obj);
      this.setState((prevState) => {
        return { users: [...prevState.users, user] };
      });
    } catch (e) {
      this.setState({ errorMsg: e.message });
    }
  };
  updateUser = async (id, obj) => {
    try {
      await crudApi.put(`users/${id}`, obj);
      let newUsers = [...this.state.users];
      const updatedUser = newUsers.find((usr) => usr.id === id);
      updatedUser.name = obj.name;
      updatedUser.image = obj.image;
      updatedUser.phone = obj.phone;
      this.setState({ users: newUsers });
    } catch (e) {
      this.setState({ errorMsg: e.message });
      console.dir(e);
    }
  };
  deleteUser = async (id) => {
    try {
      await crudApi.delete(`users/${id}`);
      let users = this.state.users.filter((user) => user.id !== id);
      this.setState({ users });
    } catch (e) {
      this.setState({ errorMsg: e.message });
    }
  };
  inputValue = (e) => {
    return e.target.value;
  };
  renderUsers = () => {
    const { users } = this.state;
    return (
      users &&
      users.map((user) => {
        return (
          <div style={{ border: "3px solid red", margin: "5px", width: "250px" }} key={user.id}>
            <h1>{user.name}</h1>
            <img style={{ width: "200px", height: "200px" }} src={user.image} alt="" />
            <h2>{`Phone:${user.phone}`}</h2>
            <input onChange={this.inputValue()} type="text" />
            <button onClick={() => this.updateUser(user.id, { name: this.inputValue() })}>Update Name</button>
            {/* <button onClick={() => this.updateUser(user.id, {name:})}>Update</button> */}
            <button onClick={() => this.deleteUser(user.id)}>Delete</button>
          </div>
        );
      })
    );
  };
  render() {
    return <div>{this.renderUsers()}</div>;
  }
}

export default App;
