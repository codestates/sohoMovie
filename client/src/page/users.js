import React from "react";
import {
  List,
  Datagrid,
  TextField,
  Edit,
  SimpleForm,
  TextInput,
  DisabledInput,
  Create
} from "react-admin";

// <TextField source="summary" />
// <TextField source="description_full" />
export const MovieList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="url" />
      <TextField source="title" />
      <TextField source="year" />
      <TextField source="rating" />
      <TextField source="runtime" />
      <TextField source="genres" />
      <TextField source="small_cover_image" />
      <TextField source="medium_cover_image" />
      <TextField source="large_cover_image" />
    </Datagrid>
  </List>
);

export const MovieEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" />
      <TextInput source="url" />
      <TextInput source="title" />
      <TextInput source="year" />
      <TextInput source="rating" />
      <TextInput source="runtime" />
      <TextInput source="genres" />
      <TextInput source="summary" />
      <TextInput source="description_full" />
      <TextInput source="small_cover_image" />
      <TextInput source="medium_cover_image" />
      <TextInput source="large_cover_image" />
    </SimpleForm>
  </Edit>
);

export const MovieCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="id" />
      <TextInput source="url" />
      <TextInput source="title" />
      <TextInput source="year" />
      <TextInput source="rating" />
      <TextInput source="runtime" />
      <TextInput source="genres" />
      <TextInput source="summary" />
      <TextInput source="description_full" />
      <TextInput source="small_cover_image" />
      <TextInput source="medium_cover_image" />
      <TextInput source="large_cover_image" />
    </SimpleForm>
  </Create>
);
