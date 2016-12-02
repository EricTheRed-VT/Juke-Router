import React, {Component} from 'react'
import {Link} from 'react-router'

export default class Artist extends Component {
  componentDidMount () {
  const artistId = this.props.routeParams.artistId;
  const selectArtist = this.props.selectArtist;

  selectArtist(artistId);
}
  render(){
  	let artist = this.props.artist;
  	console.log(artist)
  	return (
  		<div>
  		  <h3>{artist.name}</h3>
  		  <h4>{artist.albums}</h4>
  		  <h4>{artist.songs}</h4>
  		</div>
  	)
  }
}
