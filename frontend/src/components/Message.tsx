import "./Message.css";

const Message = ({ content, isMy, time }) => {
  return (
    <div className={isMy ? "message my_message" : "message frnd_message"}>
      <p>
        {content} <br />
        <span>{new Date(time).toLocaleTimeString()}</span>
      </p>
    </div>
  );
};

export default Message;
