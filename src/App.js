import "./App.css";
import React, {useEffect, useState} from "react";
import {Button, CircularProgress, Snackbar} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import GeoApi from "./api/GeoApi";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const CATALOGS_PRODUCTS = [
  {name: 'test1', price: 10, count: 10},
  {name: 'test2', price: 8, count: 2},
  {name: 'test3', price: 60, count: 1},
  {name: 'test4', price: 35.5, count: 8},
  {name: 'test4', price: 35.5, count: 8},
  {name: 'test4', price: 35.5, count: 8},
  {name: 'test4', price: 35.5, count: 8},
  {name: 'test4', price: 35.5, count: 8},
  {name: 'test4', price: 35.5, count: 8},
  {name: 'test4', price: 35.5, count: 8},
  {name: 'test4', price: 35.5, count: 8},
  {name: 'test4', price: 35.5, count: 8},
  {name: 'test4', price: 35.5, count: 8},
  {name: 'test4', price: 35.5, count: 8},
  {name: 'test4', price: 35.5, count: 8},
  {name: 'test4', price: 35.5, count: 8},
  {name: 'test4', price: 35.5, count: 8},
  {name: 'test4', price: 35.5, count: 8},
  {name: 'test4', price: 35.5, count: 8},
  {name: 'test4', price: 35.5, count: 8},
  {name: 'test5', price: 2, count: 2},
];

function App() {
  const [info, setInfo] = useState(undefined);
  const [data, setData] = useState([]);
  const [alertState, setAlertState] = useState({
    type: "info",
    message: undefined,
    open: false,
  });
  const [loading, setLoading] = useState(false);

  useEffect(()=> {
    // todo sacar cuando tengamos la data de la request
    setData(CATALOGS_PRODUCTS);
  }, []);

  const fetchIp = () =>
    fetch("https://www.cloudflare.com/cdn-cgi/trace").then((res) => res.text());

  const fetchData = async () => {
    setLoading(true);
    try {
      const ipResponse = await fetchIp();
      const ipRegex = /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/;
      const ip = ipResponse.match(ipRegex)[0];

      const response = await GeoApi.getInfoFromIP(ip); //todo o nueva request o usamos esta con otra url
      // esto si queres lo podemos dejar en este objeto separado de info. y en data solo va la lista de productos
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

        {data.length > 0 &&
        <TableContainer component={Paper}>
          <Table className={''} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.count}</TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        }


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
