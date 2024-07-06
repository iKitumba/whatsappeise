import "./Contact.css";

type ContactProps = {
  active?: boolean;
  avatar: string;
  username: string;
  time: Date;
  bio: string;
  unread?: boolean;
  numRecived?: number;
};

const Contact = ({
  active,
  avatar,
  username,
  time,
  bio,
  unread,
  numRecived = 0,
}: ContactProps) => (
  <div className={active ? `block active ${unread && "unread"}` : "block"}>
    <div className="imgbx">
      <img src={avatar} className="cover" />
    </div>
    <div className="details">
      <div className="listHead">
        <h4>{username}</h4>
        <p className="time">{time.toLocaleDateString()}</p>
      </div>
      <div className="message_p">
        <p>{bio}</p>
        {numRecived > 0 && <b>{numRecived}</b>}
      </div>
    </div>
  </div>
);

export default Contact;
