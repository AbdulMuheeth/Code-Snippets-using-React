import {
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  Button,
  CardActionArea,
  IconButton,
  Tooltip,
} from "@mui/material";
import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { SnippetsData } from "../../App";
import CodeSnippetLayout from "../Editor/CodeSnippetLayout";
import NewSnippet from "./NewSnippet";

const HomePage = () => {
  const { snipData, updateSnip } = React.useContext(SnippetsData);

  // console.log(data);

  const removeSnip = (id) => {
    let i = snipData.length;
    let copySnips = [...snipData];
    while (i--) {
      if (snipData[i] && snipData[i].id === id) {
        copySnips.splice(i, 1);
      }
    }
    updateSnip(copySnips);
  };

  return (
    <>
      <Grid container spacing={4} justifyContent={"center"}>
        {snipData.map((snippet, i) => {
          return (
            <Grid item xs={6} sm={4} md={3} key={snippet.id}>
              <Card
                sx={
                  {
                    // maxWidth: 345,
                    // height: "200px",
                    // display: "flex",
                    // flexDirection: "column",
                    // "& .hoverContent": {
                    //     display: "none"
                    //   },
                    //   "&:hover .hoverContent": {
                    //     display: "block"
                    //   },
                    //   "&:hover .mainContent": {
                    //     display: "none"
                    //   }
                  }
                }
              >
                {/* <CardActionArea > */}
                <CardContent
                  sx={{
                    maxWidth: 345,
                    height: "150px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Link
                    to={"snippet/" + snippet.id}
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      className="mainContent"
                      style={{
                        display: "flex",
                        flex: "1 0 auto",
                        alignItems: "flex-start",
                        justifyContent: "start",
                        flexDirection: "column",
                      }}
                    >
                      <Typography gutterBottom variant="h5" component="div">
                        {snippet.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          display: "-webkit-box",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 3,
                        }}
                      >
                        <b>{snippet.description}</b>
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 12,
                          // display: "flex",
                          // flexDirection: "column",
                          // justifyContent: "space-between",
                          marginTop: "16px",
                        }}
                        color="text.secondary"
                        gutterBottom
                      >
                        {snippet.language}
                      </Typography>
                    </div>
                  </Link>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "16px",
                    }}
                  >
                    <Button onClick={() => removeSnip(snippet.id)}>
                      Remove
                    </Button>
                  </div>
                </CardContent>
                {/* </CardActionArea> */}
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Tooltip open={true} title="Add" placement="top" arrow>
        {/* <IconButton variant='outlined' onClick={""} sx={{ position: "fixed", bottom:60, right:80, zIndex: 2000,width:50,height:50,border:"0.25px solid grey",fontSize:"30px" }}>+</IconButton> */}
        <NewSnippet />
      </Tooltip>
    </>
  );
};

export default HomePage;
