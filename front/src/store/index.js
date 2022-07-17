import { createStore } from "vuex";
import { auth } from "./auth.module";
import { user } from "./user.module";
import { playlist } from "./playlist.module";
import { album } from "./album.module";
import { artist } from "./artist.module";
import { track } from "./track.module";
import { liked } from "./liked-songs.module";

const store = createStore({
  modules: {
    auth,
    user,
    playlist,
    album,
    artist,
    track,
    liked
  },
});
export default store;