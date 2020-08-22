import React, { Component, Fragment } from 'react'
import TodoItem from './TodoItem'
import './style.css'
import axios from 'axios'

class TodoList extends Component {

  constructor(props) {
    super(props)
    // 当组件的state或props发生改变的时候，render函数就会重新执行
    this.state = {
      inputValue: '123',
      list: ['一一攻克', '打磨简历', 'Learning React']
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleBtnClick = this.handleBtnClick.bind(this)
    this.handleItemDelete = this.handleItemDelete.bind(this)
  }

  render() {
    console.log('render1'); // 看看render的执行
    return (
      <Fragment id="todo-app">
        <h3>TODO</h3>
        <ul>
          {this.getTodoItem()}
        </ul>
        <div>
          <label htmlFor="new-todo">
            What needs to be done?
          </label>
          <input id="new-todo"
            value={this.state.inputValue}
            onChange={this.handleInputChange}
          />
          <button onClick={this.handleBtnClick}>
            Add
          </button>
        </div>
      </Fragment>
    )

  }

  componentDidMount() {
    axios.get('./api/todolist')
      .then(()=>{alert('succ')})
      .catch(()=>{alert('error')})
  }

  getTodoItem() {
    return this.state.list.map((item, index) => {
      return (
          <TodoItem 
            key={index}
            content={item} 
            index={index}
            deleteItem={this.handleItemDelete}
          />
          /*<li 
            key={index} 
            onClick={this.handleItemDelete.bind(this,index)}
            dangerouslySetInnerHTML={{__html: item}}
          >
          </li>*/
      )
    })
  }

  handleInputChange(e) {
    const value = e.target.value
    this.setState(() => ({  // 由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号，否则会报错。
        inputValue: value
    }))
    // 改写前
    // this.setState({
    //   inputValue: e.target.value
    // })
  }

  handleBtnClick(e) {
    e.preventDefault();
    if (this.state.inputValue.length === 0) {
      return;
    }
    this.setState((prevState) => ({  // 在 setState 传入一个函数而非对象 ，因为 this.state 不是同步更新的，直接操作 this.state 可能获取不到最新改变的数据
      list: [...prevState.list, prevState.inputValue], // 对象展开赋值，等于把原数组克隆了一份，是新辟了一个引用地址，这样操作不会改变原数组
      inputValue: ''
    }))
    // 改写前
    // this.setState({
    //   list: [...this.state.list, this.state.inputValue],
    //   inputValue: ''
    // })
  }

  handleItemDelete(index) {
    // immutable - state 不允许直接做任何的改变，不能写成this.state.list.splice(index, 1)   
    this.setState((prevState) => {
      const list = [...prevState.list]
      list.splice(index, 1)
      return {
        list  // ES6 语法， list: list 可简写为 list
      }
    })
    // 改写前
    // const list = [...this.state.list] // this.state.list 的拷贝
    // list.splice(index, 1)
    // this.setState({
    //   list: list
    // })
  }
}

export default TodoList
