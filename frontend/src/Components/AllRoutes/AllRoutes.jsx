import React from "react";
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../../Pages/Dashboard";
import { RegistrationForm } from "../../Form/RegistrationForm";
import { FeedbackForm } from "../../Form/FeedbackForm";
import { EventRegistrationForm } from "../../Form/EventRegistrationForm";
import { Service } from "../../Pages/Service";
import { Testimonial } from "../../Pages/Testimonial";
import { Contact } from "../../Pages/Contact";
import { ClientParticipants } from "../../Pages/ClientParticipants";
import { Participated } from "../../Pages/Participated";
import { HostEvents } from "../../Pages/HostEvents";
import { Login } from "../../Pages/Login";
import { Signup } from "../../Pages/Signup";
import { PrivateRoute } from "../AllRoutes/PrivateRoute";
import { AllEvents } from "../../Pages/AllEvents";
import { HomePage } from "../../Pages/HomePage"
import { DummyGoogleCalendar } from "../../Pages/DummyGoogleCalendar";


export const AllRoutes = () => {
  return (
    <Routes>
      {/* Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/service" element={<Service />} />
      <Route path="/testimonial" element={<Testimonial />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* private routes */}
      <Route path="/adminDashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}/>
      <Route path="/allEvents" element={<PrivateRoute><AllEvents /></PrivateRoute>} />
      <Route path="/participants" element={<PrivateRoute><ClientParticipants /></PrivateRoute>}/>
      <Route path="/participated" element={<PrivateRoute><Participated /></PrivateRoute>} />
      {/* <Route path="/eventHost" element={<PrivateRoute><HostEvents /></PrivateRoute>} /> */}
      <Route path="/dummyHostEvent" element={<PrivateRoute><DummyGoogleCalendar /></PrivateRoute>} />

      {/* forms */}
      <Route path="/eventRegistrationForm" element={<EventRegistrationForm />}/>
      <Route path="/registrationForm" element={<RegistrationForm />} />
      <Route path="/feedbackForm" element={<FeedbackForm />} />
    </Routes>
  );
};
