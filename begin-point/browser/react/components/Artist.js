import React, {Component} from 'react'
import {Link} from 'react-router'
import Songs from '../components/Songs';


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
  		  <div>{artist.albums && artist.albums.map(album => (
          <div className="col-xs-4" key={ album.id }>
            <Link to={`/albums/${album.id}`} className="thumbnail">
              <img src={ album.imageUrl } />
              <div className="caption">
                <h5>
                  <span>{ album.name }</span>
                </h5>
                <small>{ album.songs.length } songs</small>
              </div>
            </Link>
          </div>
        ))}</div>
  		  <Songs
        songs={artist.songs}
        currentSong={this.props.currentSong}
        isPlaying={this.props.isPlaying}
        toggleOne={this.props.toggleOne} />
  		</div>
  	)
  }
}
