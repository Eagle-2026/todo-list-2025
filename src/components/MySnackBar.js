import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function MySnackBar({ open,message}) {
  //   const action = (
  //     <React.Fragment>
  //       <IconButton size="small" aria-label="close" color="inherit">
  //         <CloseIcon fontSize="small" />
  //       </IconButton>
  //     </React.Fragment>
  //   );

  return (
    <div>
      <Snackbar open={open}>
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
