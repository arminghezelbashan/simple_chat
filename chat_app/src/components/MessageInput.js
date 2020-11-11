import React, { createRef, useState, useEffect } from "react";

const styles = {
  container: {
    display: "flex",
    padding: 20,
    alignItems: "flex-end",
  },
  textInput: {
    flex: 1,
    wrap: "soft",
    outline: "none",
    resize: "none",
    padding: 10,
    borderRadius: 25,
    maxHeight: 100,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    border: "1px solid",
    borderColor: "#9f9f9f",
    fontFamily: "sans-serif",
  },
  sendButton: {
    marginLeft: 20,
    borderRadius: 25,
    width: 75,
    outline: "none",
    border: "1px solid",
    borderColor: "#9f9f9f",
    color: "#fff",
    fontFamily: "sans-serif",
    height: 37,
  },
};

function MessageInput({ onSendMessage }) {
  const textAreaRef = createRef();
  const [currentText, setCurrentText] = useState("");
  const [textAreaHeight, setTextAreaHeight] = useState(15);

  useEffect(() => {
    if (!currentText.trim()) {
      setTextAreaHeight(15);
      setCurrentText("");
    }
  });

  const handleInput = () => {
    const emojiMap = {
      ":)": "\uD83D\uDE01",
      ":(": "\uD83D\uDE41",
      ":'D": "\uD83D\uDE02",
      ":'(": "\uD83D\uDE22",
      ":o": "\uD83D\uDE32",
    };
    let currentText = textAreaRef.current.value;
    for (const emoji in emojiMap) {
      currentText = currentText.replaceAll(emoji, emojiMap[emoji]);
    }

    setCurrentText(currentText);
    setTextAreaHeight(textAreaRef.current.scrollHeight - 20);
  };

  const handleKeyDown = (e) => {
    if (e.which === 13) {
      handleSend();
    }
  };

  const handleSend = () => {
    onSendMessage(currentText);
    setCurrentText("");
    setTextAreaHeight(15);
  };

  return (
    <div style={styles.container}>
      <textarea
        style={{ height: textAreaHeight, ...styles.textInput }}
        value={currentText}
        placeholder="Enter Message..."
        ref={textAreaRef}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
      />
      <button
        className="sendMessageButton"
        style={styles.sendButton}
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
}

export default MessageInput;
