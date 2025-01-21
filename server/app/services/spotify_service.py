import os
from spotipy import Spotify
from spotipy.oauth2 import SpotifyOAuth

def setup_spotify_api():
    client_id = os.getenv("SPOTIPY_CLIENT_ID")
    client_secret = os.getenv("SPOTIPY_CLIENT_SECRET")
    redirect_uri = os.getenv("SPOTIPY_REDIRECT_URI")

    if not all([client_id, client_secret, redirect_uri]):
        return None

    auth_manager = SpotifyOAuth(
        client_id=client_id,
        client_secret=client_secret,
        redirect_uri=redirect_uri,
        scope="user-library-read playlist-read-private"
    )
    return Spotify(auth_manager=auth_manager)

def recommend_songs(mood, spotipy_client):
    mood_map = {
        "happy": ["happy", "upbeat", "feel good"],
        "sad": ["sad", "melancholic", "chill"],
        "angry": ["energetic", "rock", "aggressive"],
        "anxious": ["calming", "peaceful", "ambient"],
        "relaxed": ["relaxing", "acoustic", "easy listening"],
        "excited": ["party", "dance", "energetic"],
        "calm": ["peaceful", "meditative", "ambient"],
        "neutral": ["easy listening", "pop", "indie"],
    }
    keywords = mood_map.get(mood, ["popular", "top hits"])
    
    if spotipy_client:
        results = spotipy_client.search(q=" ".join(keywords), type="track", limit=5)
        if results and results['tracks']['items']:
            tracks = []
            for item in results['tracks']['items']:
                track = {
                    "artist_name": item['artists'][0]['name'],
                    "track_name": item['name'],
                    "track_url": f"https://open.spotify.com/embed/track/{item['id']}", #embeddable spotify url
                    "track_uri":item['uri'] #uri which can be used to make a playable link
                }
                tracks.append(track)
            return tracks
        else:
            return None
    else:
        return keywords  # Return keywords if no spotify API is set
