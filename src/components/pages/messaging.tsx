import React, { useEffect, useState } from "react";
import "../styles/messaging.scss";
import { chatProps, payloadType } from "../../type";
import io from "socket.io-client";
import arrow64 from "../images/icons8-arrow-64.png";
import send47 from "../images/icons8-email-send-48.png";
import { useSelector, useDispatch } from "react-redux";
import { monthOfYear, time } from "../components/functions";
import { setDetails, detailsSliceDets } from "../../features/detailsSlice";
import loading from "../images/icons8-loading-24.png";

const socket = io("http://localhost:4000");
// const socket = io("https://sleepy-sea-90825.herokuapp.com/");
interface usersProps {
  name: string;
  color: string;
  avatar: string;
  id: string;
}
const Messaging = () => {
  const dispatch = useDispatch();
  const details = useSelector(detailsSliceDets);
  const { username, email, avatar, password, id } = details;
  const [chat, setChat] = useState<chatProps[]>([]);
  const [msg, setMsg] = useState("");
  const [users, setUsers] = useState<usersProps[]>([]);
  const [usersAvailable, setUsersAvailable] = useState<string[]>([]);
  const [oldLength, setOldL] = useState(0);
  const [list, setList] = useState<"none" | "block">("none");

  socket.on("in-chat", (available: string[], users) => {
    setUsersAvailable(available);
    setUsers(users);
  });
  socket.on("details", (newId, oldId, chatHistory) => {
    if (id === oldId) {
      setChat(chatHistory);
      dispatch(
        setDetails({
          type: payloadType.ID,
          det: newId,
        })
      );
    }
  });
  socket.on("message", (chatHistory) => {
    setChat(chatHistory);
  });
  useEffect(() => {
    socket.emit("get-details", id);
  }, []);
  // useEffect(() => {
  //   document.querySelector(".new")!.focus();
  // }, [chat]);
  const seeUsers = (a_user: string) => {
    let image = "";
    users.map((item) => {
      if (item.name === a_user) image = item.avatar;
    });
    const userChat = chat.filter((item) => item.name === a_user);

    console.log(a_user, userChat);
  };
  return (
    <>
      <div className="messaging">
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
              <p>{username}</p>
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
                <li key={index} onClick={() => seeUsers(item)}>
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
                const local = item.senderId.length === 1 ? true : false;
                const pastDate = new Date(
                  index === 0 ? chat[index].dateSent : chat[index - 1].dateSent
                );
                const currentDate = new Date(item.dateSent);
                const theTime = local ? (
                  <img src={loading} alt="loading icon" />
                ) : (
                  <div className="time">
                    {time(currentDate.getHours()) +
                      " : " +
                      time(currentDate.getMinutes())}
                  </div>
                );
                let names = item.name;
                let colors = item.color;
                if (item.name === username) {
                  names = "me";
                  colors = "red";
                }
                const classname =
                  "text-box " + colors + (index === oldLength ? "new" : " ");
console.log(index === oldLength ? "new" : " ", oldLength, index)
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
                      <div key={index} className={classname}>
                        <div className={`bar`}></div>
                        <div className="second">
                          <div className="dets">
                            <div className={"sender"}>{names}</div>
                            <div className="time-box">{theTime}</div>
                          </div>
                          <div className="msg-content">{item.msg}</div>
                        </div>
                      </div>
                    </>
                  );
                } else if (pastDate !== currentDate) {
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
                        <div key={index} className={classname}>
                          <div className={`bar`}></div>
                          <div className="second">
                            <div className="dets">
                              <div className={"sender"}>{names}</div>
                              <div className="time-box">{theTime}</div>
                            </div>
                            <div className="msg-content">{item.msg}</div>
                          </div>
                        </div>
                      </>
                    );
                  }
                }
                return (
                  <div key={index} className={classname}>
                    <div className={`bar`}></div>
                    <div className="second">
                      <div className="dets">
                        <div className={"sender"}>{names}</div>
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
                chat.push({
                  name: "me",
                  msg,
                  color: "red",
                  senderId: "0",
                  dateSent: Date.now(),
                  avatar,
                });
                socket.emit("msgSent", username, msg, Date.now(), avatar);
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
      </div>
    </>
  );
};

export default Messaging;
