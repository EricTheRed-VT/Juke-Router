import React, {Component} from 'react';
import Songs from '../components/Songs';
import {Link} from 'react-router';


export default class Album extends Component {
componentDidMount () {
  const albumId = this.props.routeParams.albumId;
  const selectAlbum = this.props.selectAlbum;

  selectAlbum(albumId);
}
render(){
  let album = this.props.album
  return (
    <div className="album">
      <div>
        <h3>{ album.name }</h3>
        {album.artists && album.artists.map((artist) => {
          return (<Link to={`/artists/${artist && artist.id}`} key={artist.id}>
          <div>by {artist && artist.name}</div>
        </Link>)
        })}
        
        <img src={ album.imageUrl } className="img-thumbnail" />
      </div>
      <Songs
        songs={album.songs}
        currentSong={this.props.currentSong}
        isPlaying={this.props.isPlaying}
        toggleOne={this.props.toggleOne} />
    </div>
  );
}
}