import axios from "axios";
import React, { useEffect, useState } from "react";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { SearchHistory } from "./pages/SearchHistory";
// import {SearchHistory} from './pages/SearchHistory';

interface SearchResult {
  query: string;
}

const App: React.FC = () => {


  return (
    <Router>
      {/* <AppBar position="static"> */}
        <Toolbar>
          {/* <Typography variant="h6" style={{ flexGrow: 1 }}>
            Tour App
          </Typography> */}
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/search-history">
            Search History
          </Button>
        </Toolbar>
      {/* </AppBar> */}
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route path="/search-history" element={<SearchHistory />} />
      </Routes>
    </Router>
  );
};

export default App;
