import React from "react";

function Nav() {
    return <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/">
        Recipes Search
      </a>
      <a className="navbar-brand" href="/saved">
        Saved Recipes
      </a>
    </nav>

}

export default Nav;