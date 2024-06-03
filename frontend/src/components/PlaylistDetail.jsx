import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Navbar from './Navbar';

function PlaylistDetail() {
  const { playlist_id } = useParams();
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const res = await axios.get(`https://movie-backend-wwpf.onrender.com/playlists/${playlist_id}`);
        setPlaylist(res.data.movieDetails);
      } catch (error) {
        console.error('Error fetching playlist:', error);
      }
    };

    fetchPlaylist();
  }, [playlist_id]);

  return (
    <div>
      <Navbar />
      {playlist != null ? (
        <div className="container mt-4">
          <h3 className="text-center text-secondary mb-4">Movies Inside Playlist</h3>
          <div className="row">
            {playlist.map((movie) => (
              <div className="col-6 col-sm-4 col-md-3 col-lg-2 mb-4" key={movie.imdbID}>
                <Link to={`/movieDetail/${movie.imdbID}`}>
                  <div className="card h-100">
                    <img
                      src={movie.Poster}
                      className="card-img-top"
                      alt={movie.Title}
                      style={{ height: '250px', objectFit: 'cover' }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        {movie.Title.length > 15
                          ? `${movie.Title.substring(0, 15)}...`
                          : movie.Title}
                      </h5>
                      <p className="card-text">{movie.Year}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h3 className="text-center text-secondary mt-4">Loading...</h3>
      )}
    </div>
  );
}

export default PlaylistDetail;
