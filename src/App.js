import React, { Component } from 'react'
import './App.css'
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      value: "",
      items: [],
      editing: false,
      currentid: "",
      currentValue: "",
    };
  }
  //========== input change handler================//
  onChangehandler = (e) => {
    this.setState({
      value: e.target.value
    })
  };
  //===========add item =============//
  additem = () => {
    const text = this.state.value.trim();
    if (text === '') {
      alert("plzz fill the data");
      return;
    }
    const obj = {
      name: this.state.value,
      id: Date.now(),
      completed : false,
    };

    this.setState(
      (prevState) => ({
        items: prevState.items.concat(obj),
        value: "",
      }),
      () => {
        this.setdata();
      }
    );
  
  }
  // ============complete and uncomplete==========//
  ToggleComplete = (todo) => {
    this.setState((prevState) => ({
      items: prevState.items.map((item) => {
        if (item.id === todo.id) {
          return {
            ...item,
            completed: !item.completed,
          };
        }
        return item;
      }),
    }));
  };
  
  //====================setdata in localstorage==========================//
  setdata() {
    localStorage.setItem(`todo`, JSON.stringify([...this.state.items]))

  }
  //=============get data in localstorage=========================//
  getDataFromLocalStorage() {
    const storedData = localStorage.getItem("todo");
    return storedData ? JSON.parse(storedData) : null;
  }
  //==================call the get data function==================//
  componentDidMount() {
    const storedItems = this.getDataFromLocalStorage();
    if (storedItems) {
      this.setState({ items: storedItems });
    }
  }
  //=========delete item========//
  deleteItem = (itemid) => {
    this.setState({
      items: [...this.state.items].filter((id) => id.id !== itemid),
    });
  };

  //==========edit item=========//
  onEditTodo = (id, newValue) => {
    this.state.items.map((todo) => {
      if (todo.id === id) {
        todo.name = newValue;
      }
      return todo;
    });
  };
  onSubmitEditTodo = (e) => {
    e.preventDefault();
    this.onEditTodo(this.state.currentid, this.state.currentValue);
    this.setState({ editing: false });
  };
  ToggleEdit = (todo) => {
    this.setState({ editing: true });
    this.setState({ currentid: todo.id });
    this.setState({ currentValue: todo.name });
  };
  onEditInputChange = (e) => {
    this.setState({ currentValue: e.target.value });
  };



  render() {
    return (
      <>
        <div id='todo'>
          <h1>ToDo web App</h1>
          <div className='show-data'>
            {
            this.state.editing === false ? (
              <from onSubmit={this.additem} id="main">
                <input placeholder='add item' value={this.state.value} onChange={this.onChangehandler} type='text' id='inp' />
                <i class="fa-solid fa-plus" onClick={this.additem}></i>
              </from>
            ) : (
              <from onSubmit={this.onSubmitEditTodo} id="main">
                <input placeholder="edit your task" value={this.state.currentValue} name={this.state.currentValue} onChange={this.onEditInputChange} id='inp' />
                < i class="fa-solid fa-pen-to-square" onClick={this.onSubmitEditTodo} ></i>
              </from>
            )
            }

            {
              this.state.items.map((todo) => (
                <div className={`data ${todo.completed ? 'completed' : ''}`} key={todo.id}>
                  <div className='list'>
                <li  >{todo.name}</li>
                  </div>
                  <div id='mk'>
                    <i class="fa-solid fa-trash" onClick={() => this.deleteItem(todo.id)} ></i>
                    <i class="fa-solid fa-pen-to-square" onClick={() => this.ToggleEdit(todo)}  ></i>
                    <i class="fa-regular fa-square-check"  checked={todo.completed} onClick={() => this.ToggleComplete(todo)}></i>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </>
    )
  }
}






