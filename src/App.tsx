// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import HomePage from './pages/HomePage';
import SymptomChecker from './pages/SymptomChecker';
import AppointmentBooking from './pages/AppointmentBooking';
import Rehabilitation from './pages/Rehabilitation';
import MentalHealth from './pages/MentalHealth';
import EmergencyResponse from './pages/EmergencyResponse';
import VisuallyImpairedTools from './pages/VisuallyImpairedTools';
import MedicationReminders from './pages/MedicationReminders';
import HealthRecords from './pages/HealthRecords';

import { VoiceProvider } from './context/VoiceContext';

const App: React.FC = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <VoiceProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/symptom-checker" element={<SymptomChecker />} />
                <Route path="/appointment-booking" element={<AppointmentBooking />} />
                <Route path="/rehabilitation" element={<Rehabilitation />} />
                <Route path="/mental-health" element={<MentalHealth />} />
                <Route path="/emergency" element={<EmergencyResponse />} />
                <Route path="/visually-impaired-tools" element={<VisuallyImpairedTools />} />
                <Route path="/medication-reminders" element={<MedicationReminders />} />
                <Route path="/health-records" element={<HealthRecords />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </VoiceProvider>
    </I18nextProvider>
  );
};

export default App;
