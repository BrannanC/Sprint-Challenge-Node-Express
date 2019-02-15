const express = require('express');

const actions = require('../data/helpers/actionModel');
const projects = require('../data/helpers/projectModel');

const router = express.Router();

router.get('/', (req, res) => {
    actions
        .get()
        .then(actions => res.status(200).json({ actions }))
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "The actions information could not be retrieved." })
        })
});

router.get('/:id', (req, res) => {
    actions
        .get(req.params.id)
        .then(action => {
            action ?
            res.status(200).json({ action })
            : res.status(404).json({ message: "Action with that ID not found" })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "The actions information could not be retrieved." })
        })
});

router.post('/', (req, res) => {
    const body = req.body;
    projects
        .get(body.project_id)
        .then(project => {
            if(!project){
                res.status(200).json({ message: "Project with that id does not exist" })
            } else {
                if(!body.project_id || !body.description || !body.notes){
                    res.status(400).json({ message: "Please provide project id, notes and description" });
                } else {
                    actions
                        .insert(body)
                        .then(action => res.status(200).json({ action }))
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({ message: "The actions information could not added." })
                        })
                }
            }
            
        })
        .catch(err => res.status(404).json({ message: "Project does not exist" }))

});

router.put('/:id', (req, res) => {
    const changes = req.body;
    if(!changes.name && !changes.description && !changes.completed){
        res.status(400).json({ errorMessage: "Please provide name or description for the post." })
    } else {
        actions
            .update(req.params.id, changes)
            .then(project => {
                project ?
                 res.status(200).json({ project })
                : res.status(404).json({ message: "The project with the specified ID does not exist." })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: "The project information could not be modified." })
            })
    }
});

router.delete('/:id', (req, res) => {
    actions
        .remove(req.params.id)
        .then(isDel => {
            isDel ?
            res.status(204).end()
            : res.status(404).json({ message: "The action with the specified ID does not exist." });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "The action could not be removed" })
        })
});

module.exports = router;