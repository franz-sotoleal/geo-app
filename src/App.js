import "./App.css";
import React, { useState } from "react";
import { Button, CircularProgress, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import GeoApi from "./api/GeoApi";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

function App() {
  const [data, setData] = useState(undefined);
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

      const response = await GeoApi.getInfoFromIP("Argentina");
      setData({ country: response.country, catalog: response.products});
      setAlertState({ type: "success", message: "Info fetched", open: true });
    } catch (e) {
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
        ) : (
          <>
            <p>
              {data
                ? `Your ip is: ${data?.ip}. You are in: ${data?.country}`
                : "Welcome to the app, press the button to get the product catalog for your current location"}
            </p>
            <Button
              disabled={loading}
              variant="contained"
              color="primary"
              onClick={fetchData}
            >
              Get catalog
            </Button>

            {data && (
              <TableContainer component={Paper}>
                <Table stickyHeader aria-label="catalog table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Price</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.catalog.map((row, i) => {
                        return <TableRow key={i}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.count}</TableCell>
                            <TableCell>{`$${row.price}`}</TableCell>
                        </TableRow>
                    }
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </>
        )}

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
