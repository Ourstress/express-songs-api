const express = require('express');
const app = express();

app.use(express.static('client'));
app.use(express.json())

let songs = [{id:1,name:"fire"},{id:2,name:"ice"}];

app.param("songid", function(req,res,next,songid){
  let song = songs.find(song => song.id == parseInt(songid));
  req.song = song
  next()
})

//return list of all songs
app.get('/songs', (req, res) => {
  res.status(200).json(songs);
});

//create a new song, and return new song
app.post('/songs', (req, res) => {
  let newSong = {
    id: songs.length + 1,
    name: req.body.name,
    artist: req.body.artist 
  }
  songs.push(newSong);
  res.status(201).json(newSong);
});

//return a song with id 
app.get('/songs/:songid', (req, res) => {
  const song = req.song
  res.send("Got the request for user " + song.name);
});

//edit a song with id, and return edited song
app.put('/songs/:id', (req, res) => {
  let song = songs.find(song => song.id === parseInt(req.params.id));
  song.name = req.body.name;
  song.artist = req.body.artist;
  res.status(200).json(song);
});

//delete a song with id, and return deleted song
app.delete("/songs/:id", (req, res) => {
  let songToDelete = songs.find(song => song.id === parseInt(req.params.id));
  let index = songs.indexOf(songToDelete);
  songs.splice(index, 1);
  res.status(200).json(songToDelete);
});

module.exports = app