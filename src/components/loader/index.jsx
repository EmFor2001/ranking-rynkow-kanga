import { Backdrop, CircularProgress } from "@mui/material";

export const LoadingBackDrop = ({ open }) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularProgress />
    </Backdrop>
  );
};
