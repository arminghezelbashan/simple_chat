import React from "react";

const styles = {
  separator: {
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "rgba(255, 255, 255, 1)",
    width: "90%",
  },
};

function UserSeparator(props) {
  return <div style={styles.separator}></div>;
}

export default UserSeparator;
