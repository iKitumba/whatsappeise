import "./Message.css";

type MessageProps = {
  content: string;
  isMy: boolean;
  time: Date;
};

const Message = ({ content, isMy, time }: MessageProps) => {
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
