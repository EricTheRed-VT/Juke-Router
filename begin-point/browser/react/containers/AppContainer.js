import React, { Component } from 'react';
import axios from 'axios';
import initialState from '../initialState';
import AUDIO from '../audio';

import Sidebar from '../components/Sidebar';
import Player from '../components/Player';
import {hashHistory} from 'react-router';

import { convertAlbum, convertAlbums, convertSongs, skip } from '../utils';

export default class AppContainer extends Component {

  constructor (props) {
    super(props);
    this.state = initialState;
    this.selectArtist = this.selectArtist.bind(this);
    this.deselectArist = this.deselectArtist.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleOne = this.toggleOne.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.selectAlbum = this.selectAlbum.bind(this);
    this.deselectAlbum = this.deselectAlbum.bind(this);
    this.onLoad = this.onLoad.bind(this);
  }

  componentDidMount () {
    var albumList = axios.get('/api/albums/')
      .then(res => res.data)
      // .then(albums => this.onAlbumsLoad(convertAlbums(albums)))
    var artistList = axios.get('/api/artists/')
      .then(res => res.data)
      // .then(artist => this.onArtistsLoad(artists)))
    Promise.all([albumList, artistList])
    .then(([albums, artists]) => {
      return this.onLoad(convertAlbums(albums), artists)
    }).catch(this.sendToErrorPage)


    AUDIO.addEventListener('ended', () =>
      this.next());
    AUDIO.addEventListener('timeupdate', () =>
      this.setProgress(AUDIO.currentTime / AUDIO.duration));
  }

  onLoad (albums, artists) {
    this.setState({
      albums, artists
    })
  }

  onAlbumsLoad (albums) {
    this.setState({
      albums: albums
    });
  }

  onArtistsLoad (artists) {
    this.setState({
      artists: artists
    })
  }

  play () {
    AUDIO.play();
    this.setState({ isPlaying: true });
  }

  pause () {
    AUDIO.pause();
    this.setState({ isPlaying: false });
  }

  load (currentSong, currentSongList) {
    AUDIO.src = currentSong.audioUrl;
    AUDIO.load();
    this.setState({
      currentSong: currentSong,
      currentSongList: currentSongList
    });
  }

  startSong (song, list) {
    this.pause();
    this.load(song, list);
    this.play();
  }

  toggleOne (selectedSong, selectedSongList) {
    if (selectedSong.id !== this.state.currentSong.id)
      this.startSong(selectedSong, selectedSongList);
    else this.toggle();
  }

  toggle () {
    if (this.state.isPlaying) this.pause();
    else this.play();
  }

  next () {
    this.startSong(...skip(1, this.state));
  }

  prev () {
    this.startSong(...skip(-1, this.state));
  }

  setProgress (progress) {
    this.setState({ progress: progress });
  }

  selectAlbum (albumId) {
    axios.get(`/api/albums/${albumId}`)
      .then(res => res.data)
      .then(album => this.setState({
        selectedAlbum: convertAlbum(album)
      })).catch(this.sendToErrorPage);
  }

  deselectAlbum () {
    this.setState({ selectedAlbum: {}});
  }

  selectArtist (artistId) {
    let artist = axios.get(`/api/artists/${artistId}`)
      .then(res => res.data)
      // .then((artist) => this.setState({selectedArtist: artist}))

    let albums = axios.get(`/api/artists/${artistId}/albums`)
      .then(res => res.data)

    let songs = axios.get(`/api/artists/${artistId}/songs`)
      .then(res => res.data)

    Promise.all([artist, albums, songs])
      .then(([artist, albums, songs]) => {
        artist.albums = convertAlbums(albums);
        artist.songs = convertSongs(songs);
        return this.setState({selectedArtist: artist})
      }).catch(this.sendToErrorPage);
  }


  deselectArtist () {
    this.setState({ selectedArtist: {}});
  }
  
  sendToErrorPage () {
    console.log("sending to error page!!!!")
    hashHistory.push('/blah')
    
  }

  render () {
    return (
      <div id="main" className="container-fluid">
        <div className="col-xs-2">
          <Sidebar deselectAlbum={this.deselectAlbum} />
        </div>
        <div className="col-xs-10">
        {
          this.props.children ?
          React.cloneElement(this.props.children, {
            album: this.state.selectedAlbum,
            currentSong: this.state.currentSong,
            isPlaying: this.state.isPlaying,
            toggleOne: this.toggleOne,
            albums: this.state.albums,
            selectAlbum: this.selectAlbum,
            selectedArtist: this.state.selectedArtist,
            artists: this.state.artists,
            selectArtist: this.selectArtist
          }) : null
        }
        </div>
        <Player
          currentSong={this.state.currentSong}
          currentSongList={this.state.currentSongList}
          isPlaying={this.state.isPlaying}
          progress={this.state.progress}
          next={this.next}
          prev={this.prev}
          toggle={this.toggle}
        />
      </div>
    );
  }
}
