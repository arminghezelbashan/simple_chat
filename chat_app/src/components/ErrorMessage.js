import React from "react";

const styles = {
  container: {
    marginLeft: 30,
    fontSize: 14,
    color: "#ff1e1e",
  },
};

function ErrorMessage({ errorMessage }) {
  return <span style={styles.container}>{errorMessage}</span>;
}

export default ErrorMessage;
