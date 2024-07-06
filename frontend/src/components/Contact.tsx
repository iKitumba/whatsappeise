import "./Contact.css";

const Contact = ({
  active,
  avatar,
  username,
  time,
  bio,
  unread,
  numRecived,
}) => (
  <div className={active ? `block active ${unread && "unread"}` : "block"}>
    <div className="imgbx">
      <img src={avatar} className="cover" />
    </div>
    <div className="details">
      <div className="listHead">
        <h4>{username}</h4>
        <p className="time">{time}</p>
      </div>
      <div className="message_p">
        <p>{bio}</p>
        {numRecived > 0 && <b>{numRecived}</b>}
      </div>
    </div>
  </div>
);

export default Contact;
