import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import MovingText from "react-moving-text";
import { MyButton } from "../components/MyButton";
import MyCard from "../components/Card";

const Home = () => {
  return (
    <>
      <Box
        component="section"
        sx={{
          height: { sm: "80vh", xs: "50vh" },
          justifyContent: "center",
          marginTop: 16,
          alignItems: "center",
          display: "flex",
        }}
      >
        <Box
          component="section"
          sx={{
            padding: "20px",
            height: "60vh",
            width: "80vw",
            // background:
            //   "linear-gradient(150deg, #281483 15%, #8f6ed5 70%, #d782d9 94%)",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Stack direction={"column"} sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h3"
                    sx={{
                      textAlign: "center",
                      // color: "white",

                      fontWeight: "bold",
                    }}
                  >
                    Hi there! 👋 I am Amanuel
                  </Typography>
                  <Typography variant="h3">
                    A dedicated web developer with a passion for creating
                    elegant and innovative Websites.
                  </Typography>
                  <Stack
                    direction={"row"}
                    sx={{
                      alignItems: "center",
                      marginLeft: "auto",
                      marginRight: "auto",
                      marginTop: 3,
                    }}
                  >
                    <Link to={"/researcherDashboard"}>
                      <Box sx={{ margin: 2 }}>
                        <MyButton
                          text={"Co$nta$ct"}
                          width={"160px"}
                          height={"50px"}
                        >
                          Contact
                        </MyButton>
                      </Box>
                    </Link>
                    <Link to={"/resume"}>
                      <Box sx={{ margin: 2 }}>
                        <MyButton
                          text={"Vi$ew R$esume"}
                          width={"160px"}
                          height={"50px"}
                        >
                          View Resume
                        </MyButton>
                      </Box>
                    </Link>
                  </Stack>
                </Stack>
              </Box>
            </Grid>
            <Grid sx={{ display: { xs: "none", sm: "block" } }} item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  height: "100%",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={"https://photos.app.goo.gl/e7ZuzBLR5bZrJ3KE8"}
                  alt="hero"
                  style={{
                    width: "60%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <div style={{ display: "flex" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            // paddingLeft: "30px",
            // paddingRight: "30px",
            backgroundColor: "#282741",
            width: "100vw",
            // height: "100vh",
            // marginLeft: "auto",
            overflow: "hidden",
          }}
        >
          {/* <Box sx={{ marginTop: "2rem" }}> */}

          <Typography
            variant="h2"
            component="h1"
            sx={{ mb: 10, color: "white" }}
          >
            Skills
          </Typography>
          <MyCard />

          {/* </Box> */}
          {/* <Box
              sx={{
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: 3,
                marginBottom: 4,
                zIndex:4,
              }}
            >
              <Typography variant={"h2"}>Skills</Typography>
            </Box>

            <Box
            
              sx={{
                position: "absolute",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 15,
                marginRight: "auto",
                marginLeft: "auto",
              }}
            >
              <Typography variant="h1" sx={{ marginTop: 11 }}>
                HEloo
              </Typography>
            </Box> */}
        </Box>
      </div>
    </>
  );
};
export default Home;
//TODO submit research
