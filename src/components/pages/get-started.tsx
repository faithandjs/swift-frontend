import React, { useState, useRef, useEffect } from "react";
import "../styles/style.scss";
import io from "socket.io-client";
import img from "../images/The Little Things - UI Design.png";
import imgx from "../images/Brainstorming.png";
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

const socket = io("http://localhost:4000");
interface chatProps {
  name: string;
  msg: string;
  color: string;
  senderId: string;
  dateSent: Date;
}
export const GetStarted = () => {
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState<chatProps[]>([]);
  const [usersAvailable, setUsersAvailable] = useState<string[]>([]);
  const myId = useRef("");
  const [response, setResponse] = useState<boolean>(false);
  const [avatar, setAvatar] = useState("");
  const [list, setList] = useState<"none" | "block">("none");

  socket.on(
    "message",
    (
      name: string,
      msg: string,
      colorCode: number,
      senderId: string,
      dateSent: Date
    ) => {
      let color = "brown";
      let sender = name;
      if (senderId === myId.current) {
        sender = "me";
        color = "default-green";
      } else {
        switch (colorCode) {
          case 1:
            color = "red";
            break;
          case 2:
            color = "green";
            break;
          case 3:
            color = "orange";
            break;
          case 4:
            color = "brown";
            break;
          case 5:
            color = "purple";
            break;
          case 6:
            color = "blue";
            break;
          case 7:
            color = "deep-blue";
            break;
        }
      }

      let temp: chatProps = { name: sender, msg, color, senderId, dateSent };

      if (chat.includes(temp)) {
        console.log("includes");
      } else {
        setChat([...chat, temp]);
      }
    }
  );
  socket.on("my-id", (id) => (myId.current = id));
  socket.on("in-chat", (users: string[]) => {
    setUsersAvailable(users);
  });
  socket.on("response", (res) => {
    const errMsg: HTMLDivElement = document.querySelector(
      ".details .form form div div"
    )!;
    const transi = gsap.timeline();
    if (res && name.length > 0) {
      errMsg.style.opacity = "0";
      transi.to(".form form", {
        x: "-100vw",
        height: "0px",
        opacity: 0,
        duration: 0,
      });
      transi.to(
        ".form .next",
        {
          height: "max-content",
          x: 0,
          opacity: 1,
          duration: 0.2,
        },
        "<"
      );
    } else if (!res && name.length > 0) {
      errMsg.style.opacity = "1";
    }
  });
  useEffect(() => {
    // const one = document.querySelector(".images .one");
    // const two = document.querySelector(".images .two");
    // const rotate = gsap.timeline({ repeat: -1 });
    // const delay = 25;
    // rotate.to(one, { x: "-50%", duration: 2, delay: delay, ease: "expo.out" });
    // rotate.to(two, { x: "100vw", duration: 2 }, "<");
    // rotate.to(one, { x: "-2000px", duration: 2, delay: delay }, "<");
    // rotate.to(two, { x: 0, duration: 2, ease: "expo.out" }, "<");
  });
  const settingAvatar = (ava: string, classname: string) => {
    document.querySelectorAll(".avatars button").forEach((item) => {
      if (
        item.classList.contains("selected") &&
        !item.classList.contains(classname)
      ) {
        item.classList.remove("selected");
      }
      if (
        item.classList.contains(classname) &&
        !item.classList.contains("selected")
      ) {
        item.classList.add("selected");
      }
    });
    setAvatar(ava);
  };

  return (
    <>
      <div
        className="get-started"
        style={{ display: response ? "none" : "block" }}
      >
        <div className="intro">
          <h1>swift.</h1>
          <p>Connection at your fingertips.</p>
        </div>
        <div className="details">
          <div className="form">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (name.trim().length > 0) socket.emit("username", name);
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
                <div>Username not available</div>
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
            <div className="next">
              <h4>Choose an avatar</h4>
              <div className="avatar-box">
                <div className="avatars">
                  <button
                    className="ava9"
                    onClick={() => settingAvatar(ava9, "ava9")}
                  >
                    <img src={ava9} alt="" />
                  </button>
                  <button
                    className="ava1"
                    onClick={() => settingAvatar(ava1, "ava1")}
                  >
                    <img src={ava1} alt="" />
                  </button>
                  <button
                    className="ava2"
                    onClick={() => settingAvatar(ava2, "ava2")}
                  >
                    <img src={ava2} alt="" />
                  </button>
                  <button
                    className="ava6"
                    onClick={() => settingAvatar(ava6, "ava6")}
                  >
                    <img src={ava6} alt="" />
                  </button>
                  <button
                    className="ava3"
                    onClick={() => settingAvatar(ava3, "ava3")}
                  >
                    <img src={ava3} alt="" />
                  </button>
                  <button
                    className="ava8 "
                    onClick={() => settingAvatar(ava8, "ava8")}
                  >
                    <img src={ava8} alt="" />
                  </button>
                  <button
                    className="ava4"
                    onClick={() => settingAvatar(ava4, "ava4")}
                  >
                    <img src={ava4} alt="" />
                  </button>
                  <button
                    className="ava5"
                    onClick={() => settingAvatar(ava5, "ava5")}
                  >
                    <img src={ava5} alt="" />
                  </button>
                  <button
                    className="ava7"
                    onClick={() => settingAvatar(ava7, "ava7")}
                  >
                    <img src={ava7} alt="" />
                  </button>
                </div>
              </div>

              <button
                className="submit"
                disabled={avatar.length === 0 ? true : false}
                onClick={() => {
                  if (avatar.length > 0) setResponse(true);
                }}
              >
                Submit
              </button>
            </div>
          </div>
          <div className="images">
            {/* <img src={imgx} alt="" className="one" /> */}
            <img src={img} alt="" className="two" />
          </div>
        </div>
        <div className="extra">
          <h3>Over 20 million users across the globe!</h3>
        </div>
      </div>
      <main
        className="messaging"
        style={{ display: response ? "block" : "none" }}
      >
        <header className="header">
          <div className="first">
            <h1>swift.</h1>
            <div className="img-box">
              <img src={avatar} alt="" />
            </div>
          </div>
          <div className="second">
            <div className="users">
              <button
                className="me"
                onClick={() =>
                  list === "block" ? setList("none") : setList("block")
                }
              >
                <p>{name}</p>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill="#fff"
                      d="M12 15.45 5.95 9.425 7.475 7.9 12 12.425 16.525 7.9l1.525 1.525Z"
                    />
                  </svg>
                </div>
              </button>
              <ul className="others" style={{ display: list }}>
                <li>Users</li>
                {usersAvailable.map((item, index) => (
                  <li key={index}>
                    <span>{item}</span>
                    <span></span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </header>
        <div
          className="msg-box"
          onClick={() => (list === "block" ? setList("none") : "")}
        >
          <div className="msg-area">
            {chat.length > 0 ? (
              chat.map((item, index) => (
                <div
                  key={index}
                  className={"text-box " + item.color + " " + item.senderId}
                >
                  <div className={`bar`}></div>
                  <div className="second">
                    <div className={"sender"}>{item.name}</div>
                    <div className="msg-content">{item.msg}</div>
                  </div>
                </div>
              ))
            ) : (
              <>
                <div className="no-chat">
                  <svg xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill="#949494"
                      d="M32.833 20.708H6.625q-.333 0-.521-.208-.187-.208-.187-.5 0-.292.187-.479.188-.188.521-.188h26.208l-4.291-4.291q-.209-.209-.188-.459.021-.25.188-.458.208-.208.479-.208t.521.208l5.041 5.042q.167.208.271.416.104.209.104.417 0 .25-.104.458-.104.209-.271.375L29.5 25.958q-.208.167-.458.167t-.459-.208q-.208-.209-.208-.479 0-.271.208-.521Z"
                    />
                  </svg>{" "}
                  <p>See users in chat </p>
                </div>
                <div className="no-chat">
                  <svg xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill="#949494"
                      d="M32.833 20.708H6.625q-.333 0-.521-.208-.187-.208-.187-.5 0-.292.187-.479.188-.188.521-.188h26.208l-4.291-4.291q-.209-.209-.188-.459.021-.25.188-.458.208-.208.479-.208t.521.208l5.041 5.042q.167.208.271.416.104.209.104.417 0 .25-.104.458-.104.209-.271.375L29.5 25.958q-.208.167-.458.167t-.459-.208q-.208-.209-.208-.479 0-.271.208-.521Z"
                    />
                  </svg>{" "}
                  <p>Send a message</p>
                </div>
              </>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (msg.trim() !== "") {
                socket.emit("msgSent", name, msg, myId.current, new Date());
                setMsg("");
              }
            }}
          >
            <input
              type="text"
              value={msg}
              className="chat-input"
              onChange={(e) => setMsg(e.target.value)}
              placeholder="Message"
            />
            <button type="submit">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                <path
                  fill="#fff"
                  d="M3.025 19.95V4.025l18.825 7.95Zm2.05-3.1 11.45-4.875-11.45-4.85v3.325L11 11.975l-5.925 1.55Zm0 0V7.125v6.4Z"
                />
              </svg>
            </button>
          </form>
        </div>
      </main>
    </>
  );
};
