import React, { useState } from "react";
import { Route, Router, Switch } from "react-router-dom";
import { MyVideos, Settings } from "../components";
import { useSelector } from "react-redux";
import { FaRegUser, FaVideo } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import "./SettingsPage.scss";
const SettingsPage = () => {
  const [comps, setComps] = useState(true);
  const user = useSelector((s) => s.user.currentUser);

  return (
    <>
      <div className="settingsPg-container">
        <div className="settingsPg-toggler">
          <div className="">
            <h4>Hello, {user.username} you can customize</h4>
          </div>
          <div className="settingsPg-toggler-btn">
            <span onClick={() => setComps(false)}>
              <BsFillPersonFill /> Account
            </span>{" "}
            <br />
            <span onClick={() => setComps(true)}>
              {" "}
              <FaVideo /> My Videos
            </span>
          </div>
        </div>
        <div className="settingsPg-viewer">
          {!comps && <Settings />}
          {comps && <MyVideos />}
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
