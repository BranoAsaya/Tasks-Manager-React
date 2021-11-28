import React, { Component } from "react";
import * as styles from "./TaskManager.module.css";

export default class TaskManager extends Component {
  state = { tasks: [] };
  index = 0;
  array = [];
  delete;
  componentDidMount() {
    this.array = JSON.parse(localStorage.getItem("Tasks"));
    this.setState({ tasks: this.array });
  }
  addNewTask = (e) => {
    e.preventDefault();
    this.array = this.state.tasks;
    let obj = {
      title: e.target.task.value,
      status: false,
      id: this.array.length,
    };
    this.array.push(obj);
    this.setState({ tasks: this.array });
    localStorage.setItem("Tasks", JSON.stringify(this.state.tasks));
  };

  updateStatus = (e) => {
    this.index = Number(e.target.name);
    this.array[this.index].status = e.target.checked;
    this.setState({ tasks: this.array });
    this.delete = prompt('to delete from DB enter "Y"');
    if (this.delete === "Y") {
      this.deleteTask(e);
    }
    localStorage.setItem("Tasks", JSON.stringify(this.state.tasks));
    alert("task completed");
  };
  deleteTask = (e) => {
    this.array.splice(this.index, 1);
    localStorage.setItem("Tasks", JSON.stringify(this.state.tasks));
    console.log("deleted from DB");
  };

  render() {
    return (
      <div className={styles.con}>
        <h1>TaskManager</h1>
        <form onSubmit={this.addNewTask}>
          <input type='text' name='task' />
          <input type='submit' value='add Task' />
        </form>
        <ul>
          {this.state.tasks.map((task, i) => {
            if (task.status === false) {
              return (
                <li key={i} className={styles.item}>
                  {task.title}{" "}
                  <input
                    type='checkbox'
                    className={styles.checkbox}
                    onChange={this.updateStatus}
                    name={i}
                  />
                </li>
              );
            }
          })}
        </ul>
      </div>
    );
  }
}
