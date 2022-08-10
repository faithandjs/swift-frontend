import React, { useState, useRef, useEffect } from "react";
import "../styles/style.scss";
import "../styles/get-started.css";
import io from "socket.io-client";
import img from "../images/The Little Things - UI Design.png";
import imgx from "../images/Brainstorming.png";
import { gsap } from "gsap";

const socket = io("http://localhost:4000");
interface chatProps {
  name: string;
  msg: string;
  color: string;
  senderId: string;
}
export const GetStarted = () => {
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState<chatProps[]>([]);
  const [usersAvailable, setUsersAvailable] = useState<string[]>([]);
  const myId = useRef("");
  const [response, setResponse] = useState<boolean>(false);

  socket.on(
    "message",
    (name: string, msg: string, colorCode: number, senderId: string) => {
      let color = "brown";
      if (senderId == myId.current) {
        let name = "me";
        color = "blue";
        setChat([...chat, { name, msg, color, senderId }]);
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
            color = "yellow";
            break;
        }
        setChat([...chat, { name, msg, color, senderId }]);
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
    setResponse(res);
    !res ? (errMsg.style.opacity = "1") : (errMsg.style.opacity = "0");
  });
  useEffect(() => {
    const img1 = document.querySelector(".images .one");
    const img2 = document.querySelector(".images .two");
    const rotate = gsap.timeline({ delay: 7, repeat: -1, repeatDelay: 5 });

    rotate.to(img1, { x: "-50%", duration: 2, ease: "expo.out" });
    rotate.to(img2, { x: "100vw", duration: 2 }, "<");
    rotate.to(img2, {
      x: 0,
      duration: 2,
      delay: 7,
      ease: "expo.out",
    });
    rotate.to(img1, { x: "-100vw", duration: 2, ease: "sine.out" }, "<");
  });

  return (
    <>
      <div
        className="get-started"
        style={{ display: response ? "none" : "block" }}
      >
        <div className="intro">
          <h1>swift.</h1>
          <p>your friends at your fingertips</p>
        </div>
        <div className="details">
          <div className="images">
            <img src={imgx} alt="" className="one" />
            <img src={img} alt="" className="two" />
          </div>
          <div className="form">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                socket.emit("username", name);
              }}
            >
              <div>
                <input
                  type="text"
                  placeholder="Enter username"
                  name="username"
                  id="username"
                  onChange={(e) => setName(e.target.value)}
                />
                <div>Username not available</div>
              </div>

              <button type="submit">submit</button>
            </form>
          </div>
        </div>
        <div className="extra">
          <h3>Over 20 million users across the globe!</h3>
        </div>
      </div>
      <div
        className="messaging"
        style={{ display: response ? "block" : "none" }}
      >
        <header>
          <h1>swift.</h1>
        </header>
        <div className="extra-details">
          <div className="hi-msg">
            {usersAvailable.length > 0 && (
              <p>
                hi <span>{name}</span>
              </p>
            )}
          </div>
          <div className="in-chat-box">
            {/* <label>Online</label> */}
            {usersAvailable.length > 0 && (
              <select defaultValue={"online"}>
                <option value="online">online</option>
                {usersAvailable.map((item, index) => (
                  <option key={index}>{item}</option>
                ))}
              </select>
            )}
          </div>
        </div>
        <div className="msg-box">
          <div className="msg-area">
            {chat.map((item, index) => (
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
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (msg.trim() != "") {
                socket.emit("msgSent", name, msg, myId.current);
                setMsg("");
              }
            }}
          >
            <input
              type="text"
              value={msg}
              className="chat-input"
              onChange={(e) => setMsg(e.target.value)}
            />
            <button type="submit">submit</button>
          </form>
        </div>
      </div>
    </>
  );
};
