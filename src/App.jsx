import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

function App() {
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [pairs, setPairs] = useState([]);
  const [summary, setSummary] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleRowClick = (params) => {
    setModalData(params.row);
    handleClickOpen();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getPairs = async () => {
    await axios
      .get("https://public.kanga.exchange/api/market/pairs")
      .then((response) => {
        // console.log("pairs - po pobraniu", response.data);
        setPairs(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getSummary = async () => {
    await axios
      .get("https://public.kanga.exchange/api/market/summary")
      .then((response) => {
        // console.log("summary - po pobraniu", response.data.summary);
        setSummary(response.data.summary);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getPairs();
    getSummary();
  }, []);

  // useEffect(() => {
  //   console.log("pairs - state", pairs);
  //   console.log("summary - state", summary);
  // }, [pairs, summary]);

  const columns = [
    {
      field: "name",
      headerName: "Nazwa rynku",
      width: 150,
    },
    {
      field: "highestBid",
      headerName: "Highest Bid",
      type: "number",
      width: 110,
    },
    {
      field: "lowestAsk",
      headerName: "Lowest Ask",
      type: "number",
      width: 110,
    },
    {
      field: "spread",
      headerName: "Spread [%]",
      width: 110,
    },
    // {
    //   field: "rag",
    //   headerName: "RAG",
    //   width: 80,
    // },
    {
      field: "rag",
      headerName: "RAG",
      width: 70,
      renderCell: (params) => (
        <div
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            backgroundColor:
              parseFloat(params.row.spread) <= 2
                ? "green"
                : parseFloat(params.row.spread) > 2
                ? "gold"
                : "red",
          }}
        ></div>
      ),
    },
  ];

  const countSpread = (bid, ask) => {
    const A = parseFloat(ask);
    const B = parseFloat(bid);
    return (((A - B) / (0.5 * (A + B))).toFixed(3) * 100).toFixed(2);
  };

  const rows =
    summary.length !== 0 &&
    summary.map((element, index) => ({
      id: index,
      name: element.trading_pairs,
      highestBid: element.highest_bid,
      lowestAsk: element.lowest_ask,
      spread: countSpread(element.highest_bid, element.lowest_ask) + "%",
    }));

  if (pairs.length === 0 || summary.length === 0) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <DataGrid
        rows={rows}
        columns={columns}
        plowestAskSize={5}
        rowsPerlowestAskOptions={[5]}
        onRowClick={handleRowClick}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Dialog</DialogTitle>
        <DialogContent>
          <p>{modalData.name}</p>
          <p>{modalData.highestBid}</p>
          <p>{modalData.lowestAsk}</p>
          <p>{modalData.spread}</p>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default App;
