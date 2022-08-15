import React, { useEffect, useState } from "react";
import "../styles/messaging.scss";
import { chatProps, payloadType } from "../../type";
import io from "socket.io-client";
import arrow64 from "../images/icons8-arrow-64.png";
import send47 from "../images/icons8-email-send-48.png";
import { useSelector, useDispatch } from "react-redux";
import { monthOfYear, time } from "../components/functions";
import { setDetails, detailsSliceDets } from "../../features/detailsSlice";
// const socket = io("http://localhost:4000");
const socket = io("https://sleepy-sea-90825.herokuapp.com/");

const Messaging = () => {
  const dispatch = useDispatch();
  const details = useSelector(detailsSliceDets);
  const { username, email, avatar, password, id } = details;
  console.log(details);
  const [chat, setChat] = useState<chatProps[]>([]);
  const [msg, setMsg] = useState("");
  const [usersAvailable, setUsersAvailable] = useState<string[]>([]);
  const [list, setList] = useState<"none" | "block">("none");

  socket.on("in-chat", (users: string[]) => {
    setUsersAvailable(users);
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
      if (name === username) {
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
  useEffect(() => {
    socket.emit("get-details", id);
  }, []);
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
                socket.emit("msgSent", username, msg, Date.now());
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
