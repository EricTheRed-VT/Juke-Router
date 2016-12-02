import React from 'react';
import {Link} from 'react-router';

const Sidebar = (props) => {

  const deselectAlbum = props.deselectAlbum;
  const deselectArtist = props.deselectArtist;
  return (
    <sidebar>
      <img src="juke.svg" className="logo" />
      <section>
        <h4 className="menu-item active">
          <Link to="/albums" onClick={deselectAlbum}>ALBUMS</Link>
        </h4>
        <h4 className="menu-item active">
          <Link to="/artists" onClick={deselectArtist}>ARTISTS</Link>
        </h4>
      </section>
    </sidebar>
  );
}

export default Sidebar;
