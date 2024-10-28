import React from "react";
import "../Style/footer.css";
import { Box, IconButton, Typography } from "@mui/material";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export const Footer = () => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "auto",
          background: "#fff",
          p: "50px 0px",
          background: "linear-gradient(to right, #2678ec, #333)",
        }}
      >
        <Box
          sx={{
            width: "90%",
            m: "auto",
          }}
        >
          <Box
            className="footerContainer"
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Box className="logo-box" sx={{ display: "flex", gap: "5px" }}>
                <Typography
                  sx={{
                    fontSize: "32px",
                    fontWeight: 600,
                    fontStyle: "normal",
                    lineHeight: "normal",
                    // color: "#2678ec",
                    color: "#fff",
                  }}
                >
                  GATHERPRO
                </Typography>
              </Box>
              {/*Social  Logo */}
              <Box
                className="logo-box"
                sx={{
                  mt: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <a
                  href="https://www.instagram.com/yashuvaishnav2299/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconButton
                    sx={{
                      p: "5px",
                      color: "#fff",
                    }}
                  >
                    <InstagramIcon />
                  </IconButton>
                </a>

                <a
                  href=""
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconButton
                    sx={{
                      p: "5px",
                      color: "#fff",
                    }}
                  >
                    <YouTubeIcon />
                  </IconButton>
                </a>

                <a
                  href="https://www.facebook.com/yash.vaishnav.7146"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconButton
                    sx={{
                      p: "5px",
                      color: "#fff",
                    }}
                  >
                    <FacebookOutlinedIcon />
                  </IconButton>
                </a>

                <a
                  href="https://www.linkedin.com/in/yash-vaishnav-b55473261/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconButton
                    sx={{
                      p: "5px",
                      color: "#fff",
                    }}
                  >
                    <LinkedInIcon />
                  </IconButton>
                </a>
              </Box>
              <Box className="logo-box" sx={{ mt: 3 }}>
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: 300,
                    lineHeight: "24px",
                    color: "#fff",
                  }}
                >
                  <span style={{ fontSize: "16px", fontWeight: "600" }}>©</span>{" "}
                  2024 GATHERPRO All Rights Reserved
                </Typography>
              </Box>
            </Box>
            <Box
              className="footerItemBox"
              sx={{ display: "flex", gap: "100px" }}
            >
              <Box className="needHelpBox">
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: "24px",
                    fontWeight: 400,
                    lineHeight: "30px",
                    textTransform: "uppercase",
                    mb: 1,
                    letterSpacing: "0.05em",
                  }}
                >
                  Company
                </Typography>
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "27px",
                    mt: 1,
                  }}
                >
                  GATHERPRO TECH SERVICES LTD
                </Typography>
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "27px",
                    mt: 1,
                    width: "200px",
                  }}
                >
                  412, 2 floor LBS Road, Chattarpur Hills, New Delhi-110074
                </Typography>
              </Box>
              <Box className="needHelpBox">
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: "24px",
                    fontWeight: 400,
                    lineHeight: "30px",
                    textTransform: "uppercase",
                    mb: 1,
                    letterSpacing: "0.05em",
                  }}
                >
                  Menu
                </Typography>
                <Typography
                  sx={{
                    color: "#2678ec",
                    fontSize: "16px",
                    fontWeight: 700,
                    lineHeight: "27px",
                    cursor: "pointer",
                    "&:hover": {
                      color: "#2678ec",
                    },
                  }}
                >
                  Home
                </Typography>
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "27px",
                    mt: 1,
                    cursor: "pointer",
                    "&:hover": {
                      color: "#2678ec",
                    },
                  }}
                >
                  Testimonial
                </Typography>
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "27px",
                    mt: 1,
                    cursor: "pointer",
                    "&:hover": {
                      color: "#2678ec",
                    },
                  }}
                >
                  Services
                </Typography>
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "27px",
                    mt: 1,
                    cursor: "pointer",
                    "&:hover": {
                      color: "#2678ec",
                    },
                  }}
                >
                  Contact Us
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
