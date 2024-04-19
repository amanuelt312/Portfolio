import React from "react";
import { motion, useTransform, useViewportScroll } from "framer-motion";
import { Box, Card, CardContent, Typography } from "@mui/material";

const MyCard = () => {
  const skills = [
    {
      skill: "react",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/React_Logo_SVG.svg/768px-React_Logo_SVG.svg.png",
    },
    {
      skill: "TExt",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/React_Logo_SVG.svg/768px-React_Logo_SVG.svg.png",
    },
    {
      skill: "Texdddt",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/React_Logo_SVG.svg/768px-React_Logo_SVG.svg.png",
    },
  ];
  const { scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [0.2, 2]);
  return (
    // <motion.div
    //   initial={{ opacity: 0 }}
    //   animate={{ opacity: 1 }}
    //   transition={{ duration: 0.75 }}
    // >
    <>
      {/* {skills.map(({ skill, image }) => ( */}
      <Box sx={{ marginTop: 10 }}>
        <motion.div style={{ scale }}>
          <motion.div
            style={{
              scaleY: scrollYProgress,
            }}
          >
            <Card sx={{ minWidth: 275, backgroundColor: "#1a202c" }}>
              <CardContent>
                <div style={{ alignItems: "center" }}>
                  <img
                    src={
                      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/React_Logo_SVG.svg/768px-React_Logo_SVG.svg.png"
                    }
                    alt={"skill"}
                    style={{ width: 50, height: 50, marginRight: 16 }}
                  />
                  <Typography variant="h6" color="white">
                    "skill"
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </Box>
      <Box sx={{ marginTop: 30 }}>
        <motion.div style={{ scale }}>
          <motion.div
            style={{
              scaleY: scrollYProgress,
            }}
          >
            <Card sx={{ minWidth: 275, backgroundColor: "#1a202c" }}>
              <CardContent>
                <div style={{ alignItems: "center" }}>
                  <img
                    src={
                      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/React_Logo_SVG.svg/768px-React_Logo_SVG.svg.png"
                    }
                    alt={"skill"}
                    style={{ width: 50, height: 50, marginRight: 16 }}
                  />
                  <Typography variant="h6" color="white">
                    Heloo
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </Box>
      {/* ))} */}
    </>
  );
};

export default MyCard;
