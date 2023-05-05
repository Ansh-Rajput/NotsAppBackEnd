const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const fetchUser = require("../MiddleWare/fetchUser");
const Notes = require("../Models/Notes");

const { body, validationResult } = require('express-validator');

//Fetch Notes
router.get("/fetchNotes",fetchUser,async (req,res)=>{
    try {
        const notes = await Notes.find({userId:req.user.id});
        res.send(notes);
    } catch (error) {
        res.json({error:error.message});
    }
})

//Add Notes
router.post("/addNotes",fetchUser,[
    body("title","Enter name of length minium 3.").isLength({min:3}),
    body("description","Entering eamil is  necessary").isLength({min:2})
],async (req,res)=>{
    try {
        const notes = await Notes({...req.body,userId:req.user.id});
        notes.save();
        res.json(notes);
    } catch (error) {
        res.json({error:error.message});
    }
})

//Update Note
router.put("/updateNotes/:noteId",fetchUser,[
    body("title","Enter name of length minium 3.").isLength({min:3}),
    body("description","Entering eamil is  necessary").isLength({min:2})
],async (req,res)=>{
    try {
        const note = await Notes.findById(req.params.noteId);
        if(!(note)){ // to Check id note is exist or not.
            return res.status(404).send("Not Found");
        }

        if(note.userId.toString() !== req.user.id){ // to check id the note belongs to logined user or not.
            return res.status(404).send("Not Found");
        }

        const newNote = await Notes.findByIdAndUpdate(req.params.noteId,{$set:{...req.body}},{new:true});
        res.json(newNote);
    } catch (error) {
        res.json({error:error.message});
    }
})

//Delete Note
router.delete("/deleteNotes/:noteId",fetchUser,async (req,res)=>{
    try {
        const note = await Notes.findById(req.params.noteId);
        if(!(note)){ // to Check id note is exist or not.
            return res.status(404).send("Not Found");
        }

        if(note.userId.toString() !== req.user.id){ // to check id the note belongs to logined user or not.
            return res.status(404).send("Not Found");
        }

        const newNote = await Notes.deleteOne({_id:req.params.noteId});
        res.json(newNote);
    } catch (error) {
        res.json({error:error.message});
    }
})

module.exports = router;