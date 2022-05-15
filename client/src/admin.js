import React, { Component } from "react";
import { Admin, Resource } from "react-admin"; //
import fakeDataProvider from "ra-data-fakerest";
import { HashRouter } from "react-router-dom";
import { MovieList, MovieEdit, MovieCreate } from "./page/users";
import mockMovies from "./static/mockMovie";

// https://github.com/marmelab/react-admin/tree/master/packages/ra-data-fakerest
// ra-data-fakerest
const dataProvider = fakeDataProvider({
  movies: mockMovies,
});

class AAdmin extends Component {
  render() {
    return (
      <Admin basename="/admin" dataProvider={dataProvider}>
        <Resource
          name="movies"
          list={MovieList}
          edit={MovieEdit}
          create={MovieCreate}
        />
      </Admin>
    );
  }
}

export default AAdmin;
