import React, { Component } from 'react';
import './Main.css';
import Form from './Form';
import Tarefas from './Tarefas';

export default class Main extends Component {
  state = {
    novatarefa: '',
    tarefas: [],
    index: -1,
  };
  componentDidMount() {
    const tarefas = JSON.parse(localStorage.getItem('tarefas'))

    if (!tarefas) return;
    this.setState({ tarefas })
  }

  componentDidUpdate(prevProps, prevState) {
    const { tarefas } = this.state;

    if (tarefas === prevState.tarefas) return;

    localStorage.setItem('tarefas', JSON.stringify(tarefas))

  }


  handleSubmit = (e) => {
    e.preventDefault();
    const { tarefas, novatarefa, index } = this.state;
    const tarefa = novatarefa.trim();

    if (!tarefa || tarefas.includes(tarefa)) return;

    if (index === -1) {
      this.setState({
        tarefas: [...tarefas, tarefa],
        novatarefa: '',
      });
    } else {
      const novasTarefas = [...tarefas];
      novasTarefas[index] = tarefa;

      this.setState({
        tarefas: novasTarefas,
        index: -1,
        novatarefa: '',
      });
    }
  };

  handleChange = (e) => {
    this.setState({
      novatarefa: e.target.value,
    });
  };

  handleEdit = (e, index) => {
    const { tarefas } = this.state;
    this.setState({
      novatarefa: tarefas[index],
      index,
    });
  };

  handleDelete = (e, index) => {
    const { tarefas } = this.state;
    const novasTarefas = [...tarefas];
    novasTarefas.splice(index, 1);

    this.setState({
      tarefas: novasTarefas,
    });
  };

  render() {
    const { novatarefa, tarefas } = this.state;

    return (
      <div className="main">
        <h1>Lista de Tarefas</h1>
        <Form
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          novatarefa={novatarefa}
        />
        <Tarefas
          tarefas={tarefas}
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}
