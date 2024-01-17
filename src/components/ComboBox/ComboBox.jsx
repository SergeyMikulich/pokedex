import { Autocomplete, TextField } from '@mui/material';
import React from 'react';

export default function ComboBox({list, onSelect}) {
  return (
    <Autocomplete
      id="combo-box-demo"
      options={list}
      getOptionLabel={(option) => option?.name}
      style={{ width: 300 }}
      onChange={(event, value) => onSelect(value)}
      renderInput={(params) => <TextField {...params} label="Types" variant="outlined" />}
    />
  );
}