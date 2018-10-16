const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const _ = require('lodash');
const PORT = 3000

app.use(express.static('client'));
//app.use(express.json())
app.use(bodyParser.json());


let songs = [{id:"1",name:"fire"},{id:"2",name:"ice"}];
let id = 0;

//return list of all songs
app.get("/songs", function(req, res) {
    res.status(200);
    res.send(songs);
  });

//create a new song, and return new song
app.post("/songs", function(req, res){
    const songName = req.body.name
    songs.push({name:songName})
    res.status(200)
    res.send(songs)
})

//return a song with id 
app.get("/songs/:id", function(req, res){
    songID = req.params.id
    console.log(songID)
    const requestedSong = songs.find(song => song.id === songID)
     res.status(200)
    res.send(requestedSong)
})

//edit a song with id, and return edited song
app.put("/songs/:id",function(req,res){
    let matchedSong = songs.filter(song=> song.id===req.params.id)
    let updatedSong = matchedSong[0]
    updatedSong.name = req.body.name
    res.status(200)
    res.send(updatedSong)
})

//delete a song with id, and return deleted song
app.delete("/songs/:id", function(req,res){
    let remainingSongs = songs.filter(song=> song.id!==req.params.id)
    res.status(200).send(remainingSongs)
})

app.listen(PORT);
console.log(`Server listening on port ${PORT}`);
