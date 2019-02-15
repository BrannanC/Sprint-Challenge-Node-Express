const express = require('express');

const projects = require('../data/helpers/projectModel');

const router = express.Router();

router.get('/', (req, res) => {
    projects
        .get()
        .then(projects => res.status(200).json({ projects }))
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "The projects information could not be retrieved." })
        })
});

router.get('/:id', (req, res) => {
    projects
        .get(req.params.id)
        .then(project => {
            project ?
            res.status(200).json({ project })
            : res.status(404).json({ message: "Project with that ID not found" })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "The projects information could not be retrieved." })
        })
});

router.post('/', (req, res) => {
    const body = req.body;
    if(!body.name || !body.description){
        res.status(400).json({ message: "Please provide name and description"});
    } else {
        projects
        .insert(body)
        .then(project => res.status(200).json({ project }))
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "The projects information could not added." })
        })
    }
});

router.put('/:id', (req, res) => {
    const changes = req.body;
    if(!changes.name && !changes.description && !changes.completed){
        res.status(400).json({ errorMessage: "Please provide name or description for the post." })
    } else {
        projects
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
    projects
        .remove(req.params.id)
        .then(isDel => {
            isDel ?
            res.status(204).end()
            : res.status(404).json({ message: "The project with the specified ID does not exist." });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "The project could not be removed" })
        })
});

router.get('/:id/actions', (req, res) => {
    projects
        .getProjectActions(req.params.id)
        .then(actions => {
            actions.length > 0 ?
            res.status(200).json({ actions })
            : res.status(404).json({ message: "Project with that ID not found" })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "The projects information could not be retrieved." })
        })
})

module.exports = router;