import React, { useState, useRef, useEffect } from "react";
import "../styles/get-started.scss";
import io from "socket.io-client";
import img from "../images/The Little Things - UI Design.png";
import { gsap } from "gsap";
import ava1 from "../images/images/avataaars (1).png";
import ava2 from "../images/images/avataaars (2).png";
import ava3 from "../images/images/avataaars (3).png";
import ava4 from "../images/images/avataaars (4).png";
import ava5 from "../images/images/avataaars (5).png";
import ava6 from "../images/images/avataaars (6).png";
import ava7 from "../images/images/avataaars (7).png";
import ava8 from "../images/images/avataaars (8).png";
import ava9 from "../images/images/avataaars (9).png";
import blob from "../images/magicpattern-blob-1660424805603.png";
import Messaging from "./messaging";

const socket = io("http://localhost:4000");
// const socket = io("https://sleepy-sea-90825.herokuapp.com/");

export const GetStarted = () => {
  const [name, setName] = useState("");
  const [response, setResponse] = useState<boolean>(false);
  const [avatar, setAvatar] = useState("");
  const [serverRes, setSR] = useState(false);
  const [myId, setID] = useState('')
  socket.on("response", (res, id) => {
    const errMsg: HTMLDivElement = document.querySelector(
      ".details .form form div div"
    )!;
    const transi = gsap.timeline();
    if (res && name.length > 0) {
      setID( id)
      setSR(true);
      // errMsg.style.opacity = "0";
      // transi.to(".form form.first-form", {
      //   x: "-100vw",
      //   height: "0px",
      //   opacity: 0,
      //   duration: 0,
      // });
      // transi.to(
      //   ".form .next",
      //   {
      //     height: "max-content",
      //     x: 0,
      //     opacity: 1,
      //     duration: 0.2,
      //   },
      //   "<"
      // );
    } else if (!res && name.length > 0) {
      errMsg.textContent = "Username not available";
      errMsg.style.opacity = "1";
    }
  });
  const settingAvatar = (ava: string, classNO: number) => {
    document.querySelectorAll(".avatars label").forEach((item) => {
      if (
        item.classList.contains("selected") &&
        !item.classList.contains("label" + classNO)
      ) {
        item.classList.remove("selected");
      }
      if (
        item.classList.contains("label" + classNO) &&
        !item.classList.contains("selected")
      ) {
        item.classList.add("selected");
      }
    });
    setAvatar(ava);
  };

  return (
    <>
      {!response && (
        <div
          className="get-started"
        >
          <div className="intro">
            <h1>swift.</h1>
            <p>Connection at your fingertips.</p>
          </div>
          <div className="details">
            <div className="form">
              {!serverRes && (
                <form
                  className="first-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const errMsg: HTMLDivElement = document.querySelector(
                      ".details .form form div div"
                    )!;
                    if (name.trim().length > 0) {
                      if (name.trim().length > 20) {
                        errMsg.textContent =
                          "Username should be 1-20 characters";
                        errMsg.style.opacity = "1";
                      } else {
                        socket.emit("username", name);
                      }
                    } else {
                      errMsg.textContent = "Enter username";
                      errMsg.style.opacity = "1";
                    }
                  }}
                >
                  <div className="box">
                    <input
                      type="text"
                      placeholder="Enter username"
                      name="username"
                      id="username"
                      onChange={(e) => {
                        setName(e.target.value);
                        const errMsg: HTMLDivElement = document.querySelector(
                          ".details .form form div div"
                        )!;
                        errMsg.style.opacity = "0";
                      }}
                    />
                    <div></div>
                  </div>
                  <button type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg">
                      <path
                        fill="#fff"
                        d="m16.667 26.375-5.834-5.833 1.375-1.417 4.459 4.458 11.125-11.125 1.416 1.417Z"
                      />
                    </svg>
                  </button>
                </form>
              )}
              {serverRes && (
                <div className="next">
                  <h4>Choose an avatar</h4>
                  <form
                    action=""
                    className="second-form"
                    onSubmit={(e) => {
                      e.preventDefault();

                      if (avatar.length > 0) setResponse(true);
                      // const radios: NodeListOf<HTMLInputElement> =
                      //   document.querySelectorAll("form.second-form input");
                      // radios?.forEach((item) => {
                      //   item.checked && console.log(item);
                      // });
                    }}
                  >
                    <div className="avatars">
                      <label
                        htmlFor="avatar-1"
                        className="label1"
                        onClick={() => settingAvatar(ava9, 1)}
                      >
                        <input type="radio" name="avatar" id="avatar-1" />
                        <img src={ava9} alt="" />
                      </label>
                      <label
                        htmlFor="avatar-2"
                        className="label2"
                        onClick={() => settingAvatar(ava1, 2)}
                      >
                        <input type="radio" name="avatar" id="avatar-2" />
                        <img src={ava1} alt="" />
                      </label>
                      <label
                        htmlFor="avatar-3"
                        className="label3"
                        onClick={() => settingAvatar(ava2, 3)}
                      >
                        <input type="radio" name="avatar" id="avatar-3" />
                        <img src={ava2} alt="" />
                      </label>
                      <label
                        htmlFor="avatar-4"
                        className="label4"
                        onClick={() => settingAvatar(ava6, 4)}
                      >
                        <input type="radio" name="avatar" id="avatar-4" />
                        <img src={ava6} alt="" />
                      </label>
                      <label
                        htmlFor="avatar-5"
                        className="label5"
                        onClick={() => settingAvatar(ava3, 5)}
                      >
                        <input type="radio" name="avatar" id="avatar-5" />
                        <img src={ava3} alt="" />
                      </label>
                      <label
                        htmlFor="avatar-6"
                        className="label6"
                        onClick={() => settingAvatar(ava8, 6)}
                      >
                        <input type="radio" name="avatar" id="avatar-6" />
                        <img src={ava8} alt="" />
                      </label>
                      <label
                        htmlFor="avatar-7"
                        className="label7"
                        onClick={() => settingAvatar(ava4, 7)}
                      >
                        <input type="radio" name="avatar" id="avatar-7" />
                        <img src={ava4} alt="" />
                      </label>
                      <label
                        htmlFor="avatar-8"
                        className="label8"
                        onClick={() => settingAvatar(ava5, 8)}
                      >
                        <input type="radio" name="avatar" id="avatar-8" />
                        <img src={ava5} alt="" />
                      </label>
                      <label
                        htmlFor="avatar-9"
                        className="label9"
                        onClick={() => settingAvatar(ava7, 9)}
                      >
                        <input type="radio" name="avatar" id="avatar-9" />
                        <img src={ava7} alt="" />
                      </label>
                    </div>
                    <button
                      className="submit"
                      disabled={avatar.length === 0 ? true : false}
                    >
                      Submit
                    </button>{" "}
                  </form>
                </div>
              )}
            </div>
            <div className="images">
              <img src={img} alt="" className="two" />
            </div>
          </div>
          <div className="extra">
            <h3>Over 20 million users across the globe!</h3>
          </div>
        </div>
      )}
      {response && <Messaging avatar={avatar} name={name} id={myId}/>}
    </>
  );
};
