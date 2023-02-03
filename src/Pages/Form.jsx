import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import TextBox from "../Components/TextField";
import Date from "../Components/Date";
import Selects from "../Components/Select";
import { useNavigate, useParams } from "react-router-dom";
import DialogSelect from "../Components/Dialog";
import Buttons from "../Components/Button";
import TableData from "../Components/Table";
import EnhancedTable from "../Components/DataTable";
import "../CSS/styles.css";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://iorbit-tech.com/">
        iOrbit Digital Technologies
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function RegForm({ fields }) {
  const navigate = useNavigate();
  // console.log(fields,"link for json");
  const { aev } = useParams();
  console.log(aev);
  const styles = {
    border: "1px solid rgba(0, 0, 0, 0.3)",
    padding: "5px",
  };

  const [inputDetails, setInputDetails] = React.useState({});
  const [formDetails, setFormDetails] = React.useState({});
  const [search, setSearch] = React.useState("");
  const [view, setView] = React.useState(aev);
  const [edit, setEdit] = React.useState({});
  const [changeView, setChangeView] = React.useState("");
  const [selected, setSelected] = React.useState([]);
  const [isSubmit, setIsSubmit] = React.useState(false);
  const [formErrors, setFormErrors] = React.useState({});

  // if(aev == 'view'){
  //   setTest("hellooo")
  // }
  React.useEffect(() => {
    console.log(view, "view from useeffect");
  }, [view]);
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleSearchButton = () => {
    axios.get("/Details/search.json").then((resp) => {
      console.log(resp.data);
      setInputDetails(resp.data);
    });

    console.log(search, "button click");
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    console.log("value: ", value, "name :", name);

    setInputDetails((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const showData = (url) => {
    console.log(url, "url :");

    axios.post(url, inputDetails).then((resp) => {
      // setFormDetails(resp.data)
      console.log(resp);
    });
  };

  const handleEditButton = () => {
    const ress = {};
    const newDescData = view[0].map((item, index) => {
      ress[view[0][index]] = view[1][0][index];
    });
    setInputDetails(ress);
    console.log(ress, "from handle button");
    navigate("/form/edit");
  };

  React.useEffect(() => {
    console.log(inputDetails);
  }, [inputDetails]);

  React.useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit)
      console.log(inputDetails);
  }, [formErrors]);

  React.useEffect(() => {
    axios.get(fields).then((resp) => setFormDetails(resp.data));
  }, []);
  React.useEffect(() => {
    if (aev != "add") {
      console.log("edit function");
      axios.get("/Details/description.json").then((resp) => {
        console.log(resp.data);
        setInputDetails(resp.data);
      });
    }
  }, [formDetails]);
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 5 }}
          >
            {aev == "list" ? (
              <>
                {/* <TableData inputDetails={inputDetails} /> */}
                <div style={{ display: "flex" }}>
                  <TextField
                    value={search}
                    name="search"
                    id="filled-search"
                    label="Search field"
                    type="search"
                    variant="filled"
                    onChange={(e) => {
                      handleSearch(e);
                    }}
                  />
                  <Button
                    onClick={handleSearchButton}
                    style={{ marginLeft: 10 }}
                    variant="contained"
                  >
                    Search
                  </Button>
                </div>
                <EnhancedTable
                  inputDetails={inputDetails}
                  selected={selected}
                  setSelected={setSelected}
                  setView={setView}
                />
              </>
            ) : aev == "view" ? (
              <div>
                <div>
                  <Grid container spacing={4}>
                    {view &&
                      [...Array(view[0].length).keys()].map((item, index) => {
                        return (
                          <Grid item xs={12} sm={4}>
                            <div style={styles}>
                              <h3>
                                {view[0][index].charAt(0).toUpperCase() +
                                  view[0][index].slice(1)}
                              </h3>
                              <p>{view[1][0][index]}</p>
                            </div>
                          </Grid>
                        );
                      })}
                  </Grid>
                </div>
                <Grid container spacing={4}>
                  <Grid xs={3} sm={3}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 10, mb: 2 }}
                      onClick={() => handleEditButton()}
                    >
                      EDIT
                    </Button>
                  </Grid>
                </Grid>
              </div>
            ) : (
              <Grid
                className="generalDetails"
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                {Object.keys(formDetails).length ? (
                  <Grid className="generalDetails">
                    <span
                      style={{
                        fontSize: "25px",
                        fontWeight: "bold",
                        color: "Black",
                      }}
                    >
                      {formDetails.division.formelements.title}
                    </span>
                    <Grid
                      container
                      spacing={2}
                      style={{
                        border: "3px solid #ace",
                        padding: "5px",
                        boxSizing: "borderBox",
                        margin: "20px",
                      }}
                    >
                      <Grid
                        item
                        xs={10}
                        style={{
                          fontSize: "20px",
                          color: "blue",
                          fontWeight: "bold",
                        }}
                      ></Grid>

                      {formDetails.division.formelements.generalDetails.map(
                        (item, index) => {
                          return (
                            <Grid key={index} item xs={4}>
                              {item.control == "select" ? (
                                <Selects
                                  formDetails={item}
                                  onChange={onChange}
                                  inputDetails={inputDetails}
                                  editFlag={aev}
                                />
                              ) : item.control == "textbox" ? (
                                <TextBox
                                  formDetails={item}
                                  onChange={onChange}
                                  inputDetails={inputDetails}
                                  editFlag={aev}
                                />
                              ) : item.control == "date" ? (
                                <Date
                                  formDetails={item}
                                  onChange={onChange}
                                  inputDetails={inputDetails}
                                  editFlag={aev}
                                />
                              ) : item.control == "dialog" ? (
                                <DialogSelect
                                  formDetails={item}
                                  onChange={onChange}
                                  inputDetails={inputDetails}
                                  editFlag={aev}
                                />
                              ) : (
                                <>No Data Box</>
                              )}
                              {/* // <FormFields FormDetails={item} onChange={onChange} inputDetails={inputDetails} /> */}
                            </Grid>
                          );
                        }
                      )}
                    </Grid>
                    <span
                      style={{
                        fontSize: "25px",
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      {formDetails.division.formelements.title1}
                    </span>
                    <Grid
                      container
                      xs={5}
                      spacing={2}
                      style={{
                        border: "3px solid #ace",
                        padding: "6px",
                        boxSizing: "border-box",
                        margin: "25px",
                      }}
                    >
                      <Grid
                        item
                        xs={9}
                        sm={12}
                        style={{
                          fontSize: "17px",
                        }}
                      ></Grid>
                      {formDetails.division.formelements.paymentDetails.map(
                        (item, index) => {
                          return (
                            <Grid key={index} item xs={4} md={8}>
                              {item.control == "select" ? (
                                <Selects
                                  formDetails={item}
                                  onChange={onChange}
                                  inputDetails={inputDetails}
                                  editFlag={aev}
                                />
                              ) : item.control == "textbox" ? (
                                <TextBox
                                  formDetails={item}
                                  onChange={onChange}
                                  inputDetails={inputDetails}
                                  editFlag={aev}
                                />
                              ) : item.control == "date" ? (
                                <Date
                                  formDetails={item}
                                  onChange={onChange}
                                  inputDetails={inputDetails}
                                  editFlag={aev}
                                />
                              ) : (
                                <>No Data Box</>
                              )}
                              {/* // <FormFields FormDetails={item} onChange={onChange} inputDetails={inputDetails} /> */}
                            </Grid>
                          );
                        }
                      )}
                    </Grid>
                  </Grid>
                ) : (
                  <div>No Data</div>
                )}

                {Object.keys(formDetails).length ? (
                  formDetails.division.buttons.map((item, index) => {
                    return (
                      <Grid key={index} item xs={12} sm={3}>
                        <Buttons
                          formDetails={item}
                          showData={showData}
                          inputDetails={inputDetails}
                          aev={aev}
                        />
                      </Grid>
                    );
                  })
                ) : (
                  <div>No Data</div>
                )}
              </Grid>
            )}
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
}
