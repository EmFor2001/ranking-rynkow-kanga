import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

const DialogWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const StyledDialogTitle = styled(DialogTitle)`
  text-align: center;
`;

const StyledDialogContent = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

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
    depth.bids.reduce(
      (acc, curr) => Math.min(acc, parseFloat(curr.price)),
      parseFloat(depth.bids[0].price)
    );

  return (
    <DialogWrapper>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth={"xs"}>
        <StyledDialogTitle>{modalData.name}</StyledDialogTitle>
        <StyledDialogContent>
          <h3>Asks depth</h3>
          <p>{asksDepth ? asksDepth : "Brak Danych"}</p>
          <h3>Bids depth</h3>
          <p>{bidsDepth ? bidsDepth : "Brak Danych"}</p>
          <h3>Asks max price</h3>
          <p>
            {asksMaxPrice
              ? asksMaxPrice && asksMaxPrice < 0.000001
                ? asksMaxPrice.toFixed(8)
                : asksMaxPrice
              : "Brak Danych"}
          </p>
          <h3>Asks min price</h3>
          <p>
            {asksMinPrice
              ? asksMinPrice && asksMinPrice < 0.000001
                ? asksMinPrice.toFixed(8)
                : asksMinPrice
              : "Brak Danych"}
          </p>
          <h3>Bids max price</h3>
          <p>
            {bidsMaxPrice
              ? bidsMaxPrice && bidsMaxPrice < 0.000001
                ? bidsMaxPrice.toFixed(8)
                : bidsMaxPrice
              : "Brak Danych"}
          </p>
          <h3>Bids min price</h3>
          <p>
            {bidsMinPrice
              ? bidsMinPrice && bidsMinPrice < 0.000001
                ? bidsMinPrice.toFixed(8)
                : bidsMinPrice
              : "Brak Danych"}
          </p>
        </StyledDialogContent>
      </Dialog>
    </DialogWrapper>
  );
};

export default DepthDialog;
