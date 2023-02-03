import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

export default function DialogSelect() {
  const [open, setOpen] = React.useState(false);
  //   const [age, setAge] = React.useState("");
  const [street, setStreet] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [pin, setPin] = React.useState("");

  const handleChangeStreet = (event) => {
    setStreet(String(event.target.value) || "");
  };
  const handleChangeCity = (event) => {
    setCity(String(event.target.value) || "");
  };
  const handleChangeState = (event) => {
    setState(String(event.target.value) || "");
  };
  const handleChangePin = (event) => {
    setPin(Number(event.target.value) || "");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  return (
    <div>
      <TextField
        onClick={handleClickOpen}
        variant="outlined"
        size="small"
        fullWidth
        label="Address Book"
      ></TextField>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle align="center">Fill the Address</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
            {/* <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel htmlFor="demo-dialog-native">Street</InputLabel>
              <Select
                native
                value={street}
                onChange={handleChangeStreet}
                input={<OutlinedInput label="Street" id="demo-dialog-native" />}
              >
                <option aria-label="None" value="" />
                <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option>
              </Select>
            </FormControl> */}
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel htmlFor="demo-dialog-native"></InputLabel>
              <TextField
                id="street"
                value={street}
                onChange={handleChangeStreet}
                label="Street"
                variant="outlined"
              />
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel htmlFor="demo-dialog-native"></InputLabel>
              <TextField
                id="city"
                value={city}
                onChange={handleChangeCity}
                label="City"
                variant="outlined"
              />
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel htmlFor="demo-dialog-native"></InputLabel>
              <TextField
                id="state"
                value={state}
                onChange={handleChangeState}
                label="State"
                variant="outlined"
              />
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel htmlFor="demo-dialog-native"></InputLabel>
              <TextField
                id="pin"
                value={pin}
                onChange={handleChangePin}
                label="PIN"
                variant="outlined"
              />
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Back</Button>
          <Button onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
