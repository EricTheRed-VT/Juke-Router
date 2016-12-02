import React, {Component} from 'react'
import {Link} from 'react-router'
import Songs from '../components/Songs';
import Albums from '../components/Albums';



export default class Artist extends Component {
  componentDidMount () {
  const artistId = this.props.routeParams.artistId;
  const selectArtist = this.props.selectArtist;

  selectArtist(artistId);


	}


  render(){
	const selectedArtist = this.props.selectedArtist;
	const children = this.props.children;
	const propsToPassToChildren = {
		albums: selectedArtist.albums,
	  	songs: selectedArtist.songs,
	    currentSong: this.props.currentSong,
	    isPlaying: this.props.isPlaying,
	    toggleOne: this.props.toggleOne 
	}

	return (<div>
	  <h3>{ selectedArtist.name }</h3>
	  <ul className="nav nav-tabs">
	    <li><Link to={`/artists/${selectedArtist.id}/albums`}>ALBUMS</Link></li>
	    <li><Link to={`/artists/${selectedArtist.id}/songs`}>SONGS</Link></li>
	  </ul>
	  { children && React.cloneElement(children, propsToPassToChildren) }
	</div>)

  	/** <div>
  		  <Albums albums={artist.albums}/>
  		  <Songs
        songs={artist.songs}
        currentSong={this.props.currentSong}
        isPlaying={this.props.isPlaying}
        toggleOne={this.props.toggleOne} />
  		</div>
  	**/
  }
}
