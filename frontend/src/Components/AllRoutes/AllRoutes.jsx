import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Dashboard } from "../../Pages/Dashboard";
import { RegistrationForm } from "../../Form/RegistrationForm";
import { FeedbackForm } from "../../Form/FeedbackForm";
import { EventRegistrationForm } from "../../Form/EventRegistrationForm";
import { Service } from "../../Pages/Service";
import { Testimonial } from "../../Pages/Testimonial";
import { Contact } from "../../Pages/Contact";
import { ClientParticipants } from "../../Pages/ClientParticipants";
import { Participated } from "../../Pages/Participated";
import { Login } from "../../Pages/Login";
import { Signup } from "../../Pages/Signup";
import { PrivateRoute } from "../AllRoutes/PrivateRoute";
import { AllEvents } from "../../Pages/AllEvents";
import { HomePage } from "../../Pages/HomePage";
import { DummyGoogleCalendar } from "../../Pages/DummyGoogleCalendar";
import { AdminNavbar } from "../../Pages/AdminNavbar";
import { Navbar } from "../../Pages/Navbar";
import { Footer } from "../../Pages/Footer";

export const AllRoutes = () => {
  const [accessTokenTemp, setAccessTokenTemp] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [tokenClient, setTokenClient] = useState(null);

  const gapi = window.gapi;
  const google = window.google;

  const CLIENT_ID =
    "643520224272-j46gqdpdct7599l8ss7p2bc0b48jjpa2.apps.googleusercontent.com";
  const API_KEY = "AIzaSyCA_aNZjpV6CQNDmq4zVv46PldHsfF2Ji0";
  const DISCOVERY_DOC =
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";
  const SCOPES = "https://www.googleapis.com/auth/calendar.events";

  useEffect(() => {
    gisLoaded();
  }, []);

  // useEffect(() => {
  //   tokenCheck();
  // }, [accessTokenTemp]);

  function tokenCheck() {
    const storedAccessToken = localStorage.getItem("access_token");
    const storedExpiresIn = localStorage.getItem("expires_in");
    // console.log("gapi", gapi.client);
    if (storedAccessToken && storedExpiresIn) {
      gapi?.client?.setToken({ access_token: storedAccessToken });
      setIsAuthorized(true);
    }
  }
  function gapiLoaded() {
    gapi.load("client", initializeGapiClient);
  }

  async function initializeGapiClient() {
    await gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });
    // console.log("initial-1", gapi.client);
    tokenCheck();
  }

  async function gisLoaded() {
    const tokenClientInstance = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: "",
      // callback: handleTokenCallback,
    });
    gapiLoaded();
    // console.log("initial-2", gapi.client);
    // console.log("gisLoaded", tokenClientInstance);
    tokenCheck();
    setTokenClient(tokenClientInstance);
  }

  async function handleAuthClick() {
    tokenClient.callback = async (resp) => {
      if (resp.error !== undefined) {
        throw resp;
      }
      console.log("gisLoaded11", gapi.client.getToken());
      // console.log("resp", resp);

      const { access_token, expires_in } = gapi.client.getToken();
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("expires_in", expires_in);
      setAccessTokenTemp(access_token);
      setIsAuthorized(true);
    };

    const storedAccessToken = localStorage.getItem("access_token");
    const storedExpiresIn = localStorage.getItem("expires_in");

    if (!(storedAccessToken && storedExpiresIn)) {
      tokenClient.requestAccessToken({ prompt: "consent" });
    } else {
      tokenClient.requestAccessToken({ prompt: "" });
    }
  }

  function handleSignoutClick() {
    const storedAccessToken = localStorage.getItem("access_token");
    if (storedAccessToken) {
      google.accounts.oauth2.revoke(storedAccessToken, () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("expires_in");
        setAccessTokenTemp("");
        setIsAuthorized(false);
      });
    }
  }

  const location = useLocation();
  const pathArr = [
    "/adminDashboard",
    "/allEvents",
    "/participants",
    "/participated",
    "/dummyHostEvent",
  ];


  return (
    <div>
        {pathArr.includes(location.pathname) ? <AdminNavbar isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized} /> : <Navbar />}
      <Routes>
        {/* Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/service" element={<Service />} />
        <Route path="/testimonial" element={<Testimonial />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* private routes */}
        <Route
          path="/adminDashboard"
          element={
            <PrivateRoute>
              <Dashboard
                handleAuthClick={handleAuthClick}
                handleSignoutClick={handleSignoutClick}
                isAuthorized={isAuthorized}
              />
            </PrivateRoute>
          }
        />
        <Route
          path="/allEvents"
          element={
            <PrivateRoute>
              <AllEvents gapi={gapi} />
            </PrivateRoute>
          }
        />
        <Route
          path="/participants"
          element={
            <PrivateRoute>
              <ClientParticipants />
            </PrivateRoute>
          }
        />
        <Route
          path="/participated"
          element={
            <PrivateRoute>
              <Participated />
            </PrivateRoute>
          }
        />
        <Route
          path="/dummyHostEvent"
          element={
            <PrivateRoute>
              <DummyGoogleCalendar gapi={gapi} />
            </PrivateRoute>
          }
        />

        {/* forms */}
        <Route
          path="/eventRegistrationForm"
          element={<EventRegistrationForm />}
        />
        <Route path="/registrationForm" element={<RegistrationForm />} />
        <Route path="/feedbackForm" element={<FeedbackForm />} />
      </Routes>
      {!pathArr.includes(location.pathname) && <Footer />}
    </div>
  );
};
