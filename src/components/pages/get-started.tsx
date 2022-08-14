import React, { useState, useRef, useEffect } from "react";
import "../styles/style.scss";
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
import arrow64 from "../images/icons8-arrow-64.png";
import send47 from "../images/icons8-email-send-48.png";
import blob from "../images/magicpattern-blob-1660424805603.png";

// const socket = io("https://git.heroku.com/sleepy-sea-90825.git");
// const socket = io("http://localhost:4000");
const socket = io("https://sleepy-sea-90825.herokuapp.com/");
interface chatProps {
  name: string;
  msg: string;
  color: string;
  senderId: string;
  dateSent: number;
}
export const GetStarted = () => {
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState<chatProps[]>([
    {
      color: "teal",
      dateSent: 1529656291000,
      msg: "Hi this is a test",
      name: "debs_admin",
      senderId: "WtyB3Gix_bPfa9UbAAAH",
    },
    {
      color: "teal",
      dateSent: 1655160593000,
      msg: "hellooooo",
      name: "debs_admin",
      senderId: "WtyB3Gix_bPfa9UbAAAH",
    },
    {
      color: "purple",
      dateSent: 1660431061315,
      msg: "so?",
      name: "debs",
      senderId: "IUpPrb5G661KWBUKAAAR",
    },
    {
      color: "purple",
      dateSent: 1660431119697,
      msg: "ikdrxxxxxxxxxxxjkkjjjkkaxxxxxxxxxxxxkkkkkxddddddlaala",
      name: "debs",
      senderId: "IUpPrb5G661KWBUKAAAR",
    },
    {
      color: "pink",
      dateSent: 1660431395801,
      msg: "can i?",
      name: "joel",
      senderId: "2B4CWEeyIQDudIkaAAAb",
    },
    {
      color: "pink",
      dateSent: 1660431706226,
      msg: "sup",
      name: "joel",
      senderId: "2B4CWEeyIQDudIkaAAAb",
    },
    {
      color: "pink",
      dateSent: 1660431726734,
      msg: "fr?",
      name: "joel",
      senderId: "2B4CWEeyIQDudIkaAAAb",
    },
  ]);
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
      color: string,
      senderId: string,
      dateSent: number
    ) => {
      let sender = name;
      if (senderId === myId.current) {
        sender = "me";
        color = "red";
      }

      let temp: chatProps = { name: sender, msg, color, senderId, dateSent };
      if (chat.includes(temp)) {
        console.log("includes");
      } else {
        setChat([...chat, temp]);
      }
    }
  );
  socket.on("details", (id, chatHistory) => {
    myId.current = id;
    setChat(chatHistory);
    console.log(chatHistory);
  });
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
      errMsg.textContent = "Username not available";
      errMsg.style.opacity = "1";
    }
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
  const monthOfYear = (num: number) => {
    switch (num + 1) {
      case 1:
        return "January";
      case 2:
        return "Febuary";
      case 3:
        return "March";
      case 4:
        return "April";
      case 5:
        return "May";
      case 6:
        return "June";
      case 7:
        return "July";
      case 8:
        return "August";
      case 9:
        return "September";
      case 10:
        return "October";
      case 11:
        return "November";
      case 12:
        return "December";
      default:
        return "This Month";
    }
  };
  const time = (num: number) => {
    if (num.toLocaleString().length === 1) return "0" + 1;
    return num;
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
                const errMsg: HTMLDivElement = document.querySelector(
                  ".details .form form div div"
                )!;
                if (name.trim().length > 0) {
                  if (name.trim().length > 10) {
                    errMsg.textContent = "Username should be 1-10 characters";
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
        <header
          className="header"
          onClick={() => (list === "block" ? setList("none") : null)}
        >
          <div className="img-box">
            <img src={avatar} alt="" />
          </div>
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
        </header>
        <div
          className="msg-box"
          onClick={() => (list === "block" ? setList("none") : "")}
        >
          <div className="msg-area">
            {chat.length > 0 ? (
              chat.map((item, index) => {
                const pastDate = new Date(
                  index === 0 ? chat[index].dateSent : chat[index - 1].dateSent
                );
                const currentDate = new Date(item.dateSent);
                const theTime = (
                  <div className="time">
                    {time(currentDate.getHours()) +
                      " : " +
                      time(currentDate.getMinutes())}
                  </div>
                );

                if (
                  pastDate.getFullYear() < currentDate.getFullYear() ||
                  index === 0
                ) {
                  return (
                    <>
                      <div className="date-box">
                        <div>
                          {currentDate.getDate() +
                            " " +
                            monthOfYear(currentDate.getMonth()) +
                            ", " +
                            currentDate.getFullYear()}
                        </div>
                      </div>
                      <div key={index} className={"text-box " + item.color}>
                        <div className={`bar`}></div>
                        <div className="second">
                          <div className="dets">
                            <div className={"sender"}>{item.name}</div>
                            <div className="time-box">{theTime}</div>
                          </div>
                          <div className="msg-content">{item.msg}</div>
                        </div>
                      </div>
                    </>
                  );
                } else if (pastDate !== currentDate) {
                  console.log();
                  if (
                    pastDate.getMonth() < currentDate.getMonth() ||
                    pastDate.getMonth() < currentDate.getMonth() ||
                    pastDate.getDate() !== currentDate.getDate()
                  ) {
                    return (
                      <>
                        <div className="date-box">
                          <div>
                            {currentDate.getDate() +
                              " " +
                              monthOfYear(currentDate.getMonth())}
                          </div>
                        </div>
                        <div key={index} className={"text-box " + item.color}>
                          <div className={`bar`}></div>
                          <div className="second">
                            <div className="dets">
                              <div className={"sender"}>{item.name}</div>
                              <div className="time-box">{theTime}</div>
                            </div>
                            <div className="msg-content">{item.msg}</div>
                          </div>
                        </div>
                      </>
                    );
                  }
                }
                const pastId = index !== 0 ? chat[index].senderId : null;
                const diff = item.dateSent - chat[index - 1].dateSent;
                // if (index > 0) {
                //   if (pastId === item.senderId && diff <= 900000) {
                //     console.log(diff, pastId, item.senderId);
                //     return (
                //       <div key={index} className={"text-box " + item.color}>
                //         <div className={`bar`}></div>
                //         <div className="second">
                //           <div className="msg-content">{item.msg}</div>
                //         </div>
                //       </div>
                //     );
                //   } else {
                //     console.log(diff, pastId, item.senderId);
                //   }
                // }

                return (
                  <div key={index} className={"text-box " + item.color}>
                    <div className={`bar`}></div>
                    <div className="second">
                      <div className="dets">
                        <div className={"sender"}>{item.name}</div>
                        <div className="time-box">{theTime}</div>
                      </div>
                      <div className="msg-content">{item.msg}</div>
                    </div>
                  </div>
                );
              })
            ) : (
              <>
                <div className="no-chat">
                  <div className="img-box">
                    <img src={arrow64} alt="" />
                  </div>
                  <p>See users in chat</p>
                </div>
                <div className="no-chat">
                  <div className="img-box">
                    <img src={arrow64} alt="" />
                  </div>
                  <p>Send a message</p>
                </div>
              </>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (msg.trim() !== "") {
                socket.emit("msgSent", name, msg, myId.current, Date.now());
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
              <img src={send47} alt="" />
            </button>
          </form>
        </div>
      </main>
    </>
  );
};
