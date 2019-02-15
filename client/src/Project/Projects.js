import React, { Component } from 'react';
import axios from 'axios';

class Projects extends Component {
    state = {
        projects: [],
        currentId: '',
        actions: [],
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

    render(){
        return (
            <div className="projects">
                {this.state.projects.length > 0 && 
                this.state.projects.map(x => {
                    return (
                        <div className="project" key={x.id}>
                        <h3 onClick={() => this.toggleDesc(x.id)}>
                            {x.description}
                        </h3>
                        {x.id === this.state.currentId &&
                        this.state.actions.map(x => <div className="action" key={x.id}>
                            <h5>{x.description}</h5>
                            <p>{x.notes}</p>
                        </div>)
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