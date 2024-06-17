import React, { useEffect, useState } from "react";

import { Avatar, message, Switch } from "antd";

import "./../css/Header.css";
import Logo from "./Logo";
function Header() {
  return (
    <div className="header">
      <Logo />
    </div>
  );
}

export default Header;
