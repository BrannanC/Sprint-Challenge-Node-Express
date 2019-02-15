import React, { Component } from 'react';
import axios from 'axios';

class Projects extends Component {
    state = {
        projects: [],
        currentId: '',
        actions: [],
        newProject: {
            name: '',
            description: ''
        }
    }

    componentDidMount(){
        axios
            .get('http://localhost:4000/api/projects')
            .then(res => {
                this.setState({
                    projects: res.data.projects
                })
            })
            .catch()
    }

    changeHandler = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(prevState => ({
          newProject: {...prevState.newProject,
            [name]: value
          }
        }))
      }

    toggleDesc = (id) => {
        if(id === this.state.currentId){
            this.setState({
                currentId: '',
                actions: []
            })
        } else {
            axios
                .get(`http://localhost:4000/api/projects/${id}/actions`)
                .then(res => {
                    this.setState({
                        currentId: id,
                        actions: res.data.actions
                    })
                })
                .catch()
        }
    }

    addProject = e => {
        e.preventDefault();
        axios
          .post('http://localhost:4000/api/projects', this.state.newProject)
          .then(res => {
            this.setState(prevState => ({
              projects: [...prevState.projects, res.data.project],
              newProject: {
                name: "",
                description: ""
              }
            }))
          })
          .catch(err => console.log(err))
    }

    render(){
        return (
            <div className="projects">
                      <form onSubmit={this.addProject}>
                        <input type="text" 
                            name="name" 
                            placeholder="Name of project..." 
                            value={this.state.newProject.name} 
                            onChange={this.changeHandler}
                            />
                        <textarea 
                            name="description" 
                            placeholder="Description..." 
                            value={this.state.newProject.description} 
                            onChange={this.changeHandler}
                            />
            <button type="submit">Add project</button>
          </form>
                {this.state.projects.length > 0 && 
                this.state.projects.map(x => {
                    return (
                        <div className="project" key={x.id}  onClick={() => this.toggleDesc(x.id)}>
                        <h2>{x.name}</h2>
                        <h3>
                            {x.description}
                        </h3>
                        {x.id === this.state.currentId &&
                        <ul>
                        {this.state.actions.map(x => <li className="action" key={x.id}>
                            {x.description}
                            <p>Notes: {x.notes}</p>
                        </li>)}</ul>
                        }
                        </div>
                    );
                })
                }
            </div>
        );
    }
}

export default Projects;