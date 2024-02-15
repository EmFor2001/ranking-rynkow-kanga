import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import DepthDialog from "./DepthDialog";
import { TextField } from "@mui/material";

function App() {
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [pairs, setPairs] = useState([]);
  const [summary, setSummary] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  let filterModel = {
    items: [
      { field: "name", operator: "contains", value: filterValue },
    ],
  };

  useEffect(() => {
    console.log("filter", filterValue);
    console.log("filterModel", filterModel);
  }, [filterValue]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleRowClick = (params) => {
    setModalData(params.row);
    handleOpen();
  };

  const countSpread = (bid, ask) => {
    const A = parseFloat(ask);
    const B = parseFloat(bid);
    return ((A - B) / (0.5 * (A + B))) * 100;
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
      width: 110,
    },
    {
      field: "lowestAsk",
      width: 110,
    },
    {
      field: "spread",
      headerName: "Spread [%]",
      width: 250,
    },
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

  const combinedData = pairs.map((pair) => {
    const matchingSummary = summary.find(
      (item) => item.trading_pairs === pair.base + "-" + pair.target
    );
    return { ...pair, ...matchingSummary };
  });

  // console.log("combinedData", combinedData);

  const rows =
    combinedData.length !== 0 &&
    combinedData.map((element, index) => ({
      id: index,
      name: element.base + "-" + element.target,
      highestBid: element.highest_bid ? element.highest_bid : "-",
      lowestAsk: element.lowest_ask ? element.lowest_ask : "-",
      spread: isNaN(countSpread(element.highest_bid, element.lowest_ask))
        ? "-"
        : countSpread(element.highest_bid, element.lowest_ask),
    }));

  if (pairs.length === 0 || summary.length === 0) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <h1>Ranking Rynków</h1>
      <TextField
        id="search"
        label="Szukaj"
        variant="outlined"
        onChange={(e) => {
          setFilterValue(e.target.value);
        }}
      />
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        onRowClick={handleRowClick}
        filterModel={filterValue !=="" ? filterModel : undefined}
        onFilterModelChange={(model) => {
          console.log("model", model);
        }}
      />
      <DepthDialog
        open={open}
        handleClose={handleClose}
        modalData={modalData}
      />
    </>
  );
}

export default App;
