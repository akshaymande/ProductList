import React, { useEffect, useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

interface SearchBarProps {
  searchText: string;
  onSearch: (query: string) => void;
  OnClear: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchText,
  onSearch,
  OnClear,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  const handleClear = () => {
    OnClear();
  };

  return (
    <TextField
      style={{ float: "right" }}
      value={searchText}
      onChange={handleChange}
      variant="standard"
      //   fullWidth
      placeholder="Search..."
      sx={{
        marginBottom: 2,
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "primary.main",
          },
          "&:hover fieldset": {
            borderColor: "primary.dark",
          },
          "&.Mui-focused fieldset": {
            borderColor: "primary.light",
          },
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleClear} edge="end">
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
