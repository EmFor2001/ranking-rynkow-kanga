import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const DepthDialog = ({ open, handleClose, modalData }) => {
  // console.log("modalData", modalData.name);
  const [depth, setDepth] = useState([]);

  useEffect(() => {
    modalData.name &&
      axios
        .get(`https://public.kanga.exchange/api/market/depth/${modalData.name}`)
        .then((response) => {
          // console.log("response", response.data);
          setDepth(response.data);
        });
  }, [modalData.name]);


  // console.log("depth - state", depth);
  // console.log(
  //   "depth - asks - max price",
  //   depth.asks &&
  //     depth.asks.length > 0 &&
  //     depth.asks.reduce(
  //       (acc, curr) => Math.max(acc, parseFloat(curr.price)),
  //       depth.asks[0].price
  //     )
  // );
  // console.log(
  //   "depth - asks - min price",
  //   depth.asks &&
  //     depth.asks.length > 0 &&
  //     depth.asks.reduce(
  //       (acc, curr) => Math.min(acc, parseFloat(curr.price)),
  //       depth.asks[0].price
  //     )
  // );
  // console.log(
  //   "depth - bids - max price",
  //   depth.bids &&
  //     depth.bids.length > 0 &&
  //     depth.bids.reduce(
  //       (acc, curr) => Math.max(acc, parseFloat(curr.price)),
  //       depth.bids[0].price
  //     )
  // );
  // console.log(
  //   "depth - bids - min price",
  //   depth.bids &&
  //     depth.bids.length > 0 &&
  //     depth.bids.reduce(
  //       (acc, curr) => Math.min(acc, parseFloat(curr.price)),
  //       depth.bids[0].price
  //     )
  // );

  let asksDepth =
    depth.asks &&
    depth.asks.length > 0 &&
    depth.asks.reduce((acc, curr) => acc + parseFloat(curr.quantity), 0);

  let bidsDepth =
    depth.bids &&
    depth.bids.length > 0 &&
    depth.bids.reduce((acc, curr) => acc + parseFloat(curr.quantity), 0);

  let asksMaxPrice =
    depth.asks &&
    depth.asks.length > 0 &&
    depth.asks.reduce(
      (acc, curr) => Math.max(acc, parseFloat(curr.price)),
      parseFloat(depth.asks[0].price)
    );

  let asksMinPrice =
    depth.asks &&
    depth.asks.length > 0 &&
    depth.asks.reduce(
      (acc, curr) => Math.min(acc, parseFloat(curr.price)),
      parseFloat(depth.asks[0].price)
    );

  let bidsMaxPrice =
    depth.bids &&
    depth.bids.length > 0 &&
    depth.bids.reduce(
      (acc, curr) => Math.max(acc, parseFloat(curr.price)),
      parseFloat(depth.bids[0].price)
    );
  
  let bidsMinPrice =
    depth.bids &&
    depth.bids.length > 0 &&
    depth.bids
      .reduce(
        (acc, curr) => Math.min(acc, parseFloat(curr.price)),
        parseFloat(depth.bids[0].price)
      );

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{modalData.name}</DialogTitle>
        <DialogContent>
          <h3>Asks depth</h3>
          <p>{asksDepth}</p>
          <h3>Bids depth</h3>
          <p>{bidsDepth}</p>
          <h3>Asks max price</h3>
          <p>{asksMaxPrice}</p>
          <h3>Asks min price</h3>
          <p>{asksMinPrice}</p>
          <h3>Bids max price</h3>
          <p>{bidsMaxPrice}</p>
          <h3>Bids min price</h3>
          <p>
            {bidsMinPrice && bidsMinPrice < 0.000001 ? bidsMinPrice.toFixed(8) : bidsMinPrice}
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DepthDialog;
