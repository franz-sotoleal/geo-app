import "./App.css";
import React, { useState } from "react";
import { Button, CircularProgress, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import GeoApi from "./api/GeoApi";

function App() {
  const [info, setInfo] = useState(undefined);
  const [alertState, setAlertState] = useState({
    type: "info",
    message: undefined,
    open: false,
  });
  const [loading, setLoading] = useState(false);

  const fetchIp = () =>
    fetch("https://www.cloudflare.com/cdn-cgi/trace").then((res) => res.text());

  const fetchData = async () => {
    setLoading(true);
    try {
      const ipResponse = await fetchIp();
      const ipRegex = /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/;
      const ip = ipResponse.match(ipRegex)[0];

      const response = await GeoApi.getInfoFromIP(ip);
      setInfo({ country: response.country, state: response.state, ip: ip });

      setAlertState({ type: "success", message: "Info fetched", open: true });
    } catch (e) {
      console.log(e);
      setAlertState({
        type: "error",
        message: "An error ocurred while fetching your location",
        open: true,
      });
    }
    setLoading(false);
  };
  return (
    <div className="App">
      <header className="App-header">
        {loading ? (
          <CircularProgress style={{ marginBottom: "30px" }} />
        ) : info ? (
          <p>
            Your ip is: {info?.ip}. You are in: {info?.country} in the state of:{" "}
            {info?.state}
          </p>
        ) : (
          <p>Welcome to the geo app, press the button to know your location</p>
        )}

        <Button
          disabled={loading}
          variant="contained"
          color="primary"
          onClick={fetchData}
        >
          Get location info
        </Button>

        <Snackbar
          open={alertState.open}
          autoHideDuration={6000}
          onClose={() => setAlertState({ ...alertState, open: false })}
        >
          <Alert
            severity={alertState.type}
            onClose={() => setAlertState({ ...alertState, open: false })}
          >
            {alertState.message}
          </Alert>
        </Snackbar>
      </header>
    </div>
  );
}

export default App;
