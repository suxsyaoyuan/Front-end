import React from "react";
import { Redirect } from "react-router-dom";

const Discover = React.lazy((_) => import("../pages/discover"));
const Recommend = React.lazy((_) =>
  import("../pages/discover/c-pages/recommend")
);
const Ranking = React.lazy((_) => import("../pages/discover/c-pages/ranking"));
const Songs = React.lazy((_) => import("../pages/discover/c-pages/songs"));
const Djradio = React.lazy((_) => import("../pages/discover/c-pages/djradio"));
const Artist = React.lazy((_) => import("../pages/discover/c-pages/artist"));
const Album = React.lazy((_) => import("../pages/discover/c-pages/album"));
const AlbumDetail = React.lazy((_) => import("../components/album-detail"));
const SongDetail = React.lazy((_) => import("../components/song-detail"));

const Player = React.lazy((_) => import("../pages/player"));

const Friend = React.lazy((_) => import("../pages/friend"));
const Mine = React.lazy((_) => import("../pages/mine"));

export default [
  {
    path: "/",
    exact: true,
    render: () => <Redirect to="/discover" />,
  },
  {
    path: "/discover",
    component: Discover,
    routes: [
      {
        path: "/discover",
        exact: true,
        render: () => <Redirect to={"/discover/recommend"} />,
      },
      {
        path: "/discover/recommend",
        component: Recommend,
      },
      {
        path: "/discover/ranking",
        component: Ranking,
      },
      {
        path: "/discover/songs",
        component: Songs,
      },
      {
        path: "/discover/song/detail",
        exact: true,
        component: SongDetail,
      },
      {
        path: "/discover/djradio",
        exact: true,
        component: Djradio,
      },
      {
        path: "/discover/artist",
        component: Artist,
      },
      {
        path: "/discover/album",
        exact: true,
        component: Album,
      },
      {
        path: "/discover/album/detail",
        component: AlbumDetail,
      },

      {
        path: "/discover/player",
        component: Player,
      },
    ],
  },
  {
    path: "/friend",
    component: Friend,
  },
  {
    path: "/mine",
    component: Mine,
  },
];
