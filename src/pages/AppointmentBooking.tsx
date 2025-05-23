import { useState } from 'react';
import { Calendar, Clock, User, Phone, MapPin, FileText } from 'lucide-react';
import { useVoice } from '../context/VoiceContext';
import VoiceInput from '../components/ui/VoiceInput';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  image: string;
  availability: string[];
}

interface Appointment {
  doctorId: number;
  date: string;
  time: string;
  reason: string;
}

const AppointmentBooking = () => {
  const { speak } = useVoice();
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [appointmentReason, setAppointmentReason] = useState<string>('');
  const [bookingComplete, setBookingComplete] = useState(false);
  const [appointment, setAppointment] = useState<Appointment | null>(null);

  // Mock data for doctors
  const doctors: Doctor[] = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'General Practitioner',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=300',
      availability: ['10:00', '11:30', '14:00', '16:30']
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Cardiologist',
      rating: 4.9,
      image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=300',
      availability: ['09:00', '10:30', '13:00', '15:30']
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialty: 'Pediatrician',
      rating: 4.7,
      image: 'https://images.pexels.com/photos/5214949/pexels-photo-5214949.jpeg?auto=compress&cs=tinysrgb&w=300',
      availability: ['08:30', '11:00', '14:30', '16:00']
    }
  ];

  // Available dates (next 7 days)
  const availableDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date.toISOString().split('T')[0];
  });

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setStep(2);
    speak(`You've selected ${doctor.name}, a ${doctor.specialty}. Please choose an appointment date.`);
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setStep(3);
    speak('Please select a time for your appointment.');
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep(4);
    speak('Please describe the reason for your visit.');
  };

  const handleReasonChange = (transcript: string) => {
    setAppointmentReason(transcript);
  };

  const handleConfirmAppointment = () => {
    if (selectedDoctor && selectedDate && selectedTime) {
      const newAppointment: Appointment = {
        doctorId: selectedDoctor.id,
        date: selectedDate,
        time: selectedTime,
        reason: appointmentReason
      };
      
      setAppointment(newAppointment);
      setBookingComplete(true);
      speak(`Your appointment with ${selectedDoctor.name} has been confirmed for ${formatDate(selectedDate)} at ${selectedTime}. You will receive a confirmation email shortly.`);
    }
  };

  const handleStartOver = () => {
    setSelectedDoctor(null);
    setSelectedDate('');
    setSelectedTime('');
    setAppointmentReason('');
    setBookingComplete(false);
    setStep(1);
    speak('Let\'s start booking a new appointment. Please select a doctor.');
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-700 to-green-900 px-6 py-8 text-white">
            <h1 className="text-3xl font-bold mb-2">Voice-Enabled Appointment Booking</h1>
            <p className="text-green-100">
              Schedule appointments with healthcare professionals using voice commands
            </p>
          </div>

          {/* Progress Steps */}
          {!bookingComplete && (
            <div className="px-6 pt-6">
              <div className="flex items-center justify-between">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= 1 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    <User className="h-5 w-5" />
                  </div>
                  <span className="text-xs mt-1">Doctor</span>
                </div>
                <div className={`flex-1 h-1 mx-2 ${step > 1 ? 'bg-green-600' : 'bg-gray-200'}`}></div>
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= 2 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    <Calendar className="h-5 w-5" />
                  </div>
                  <span className="text-xs mt-1">Date</span>
                </div>
                <div className={`flex-1 h-1 mx-2 ${step > 2 ? 'bg-green-600' : 'bg-gray-200'}`}></div>
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= 3 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    <Clock className="h-5 w-5" />
                  </div>
                  <span className="text-xs mt-1">Time</span>
                </div>
                <div className={`flex-1 h-1 mx-2 ${step > 3 ? 'bg-green-600' : 'bg-gray-200'}`}></div>
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= 4 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    <FileText className="h-5 w-5" />
                  </div>
                  <span className="text-xs mt-1">Reason</span>
                </div>
              </div>
            </div>
          )}

          <div className="p-6 md:p-8">
            {!bookingComplete ? (
              <>
                {step === 1 && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Select a Doctor</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {doctors.map((doctor) => (
                        <div 
                          key={doctor.id} 
                          className="border border-gray-200 rounded-lg p-4 hover:border-green-500 hover:shadow-md transition-all duration-300 cursor-pointer"
                          onClick={() => handleDoctorSelect(doctor)}
                        >
                          <div className="flex items-center">
                            <img 
                              src={doctor.image} 
                              alt={doctor.name} 
                              className="w-16 h-16 rounded-full object-cover mr-4"
                            />
                            <div>
                              <h3 className="font-semibold text-gray-800">{doctor.name}</h3>
                              <p className="text-gray-600 text-sm">{doctor.specialty}</p>
                              <div className="flex items-center mt-1">
                                {[...Array(5)].map((_, i) => (
                                  <svg 
                                    key={i} 
                                    className={`h-4 w-4 ${i < Math.floor(doctor.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                                    fill="currentColor" 
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                                <span className="ml-1 text-sm text-gray-600">{doctor.rating}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {step === 2 && selectedDoctor && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-gray-800">Select a Date</h2>
                      <button 
                        onClick={() => setStep(1)}
                        className="text-sm text-green-600 hover:text-green-800"
                      >
                        Back to Doctors
                      </button>
                    </div>
                    
                    <div className="bg-green-50 rounded-lg p-4 mb-6 flex items-center">
                      <img 
                        src={selectedDoctor.image} 
                        alt={selectedDoctor.name} 
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-800">{selectedDoctor.name}</h3>
                        <p className="text-gray-600 text-sm">{selectedDoctor.specialty}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {availableDates.map((date) => (
                        <button
                          key={date}
                          onClick={() => handleDateSelect(date)}
                          className="py-3 px-2 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                          <div className="text-center">
                            <div className="text-sm font-medium text-gray-600">
                              {new Date(date).toLocaleDateString(undefined, { weekday: 'short' })}
                            </div>
                            <div className="text-lg font-bold text-gray-800 my-1">
                              {new Date(date).getDate()}
                            </div>
                            <div className="text-xs text-gray-500">
                              {new Date(date).toLocaleDateString(undefined, { month: 'short' })}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 3 && selectedDoctor && selectedDate && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-gray-800">Select a Time</h2>
                      <button 
                        onClick={() => setStep(2)}
                        className="text-sm text-green-600 hover:text-green-800"
                      >
                        Back to Dates
                      </button>
                    </div>
                    
                    <div className="bg-green-50 rounded-lg p-4 mb-6">
                      <div className="flex items-center mb-3">
                        <img 
                          src={selectedDoctor.image} 
                          alt={selectedDoctor.name} 
                          className="w-12 h-12 rounded-full object-cover mr-4"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-800">{selectedDoctor.name}</h3>
                          <p className="text-gray-600 text-sm">{selectedDoctor.specialty}</p>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-700">
                        <Calendar className="h-4 w-4 mr-2 text-green-600" />
                        <span>{formatDate(selectedDate)}</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-medium text-gray-800 mb-3">Available Time Slots</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {selectedDoctor.availability.map((time) => (
                        <button
                          key={time}
                          onClick={() => handleTimeSelect(time)}
                          className="py-2 px-4 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                          <div className="flex items-center justify-center">
                            <Clock className="h-4 w-4 mr-2 text-green-600" />
                            <span className="font-medium">{time}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 4 && selectedDoctor && selectedDate && selectedTime && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-gray-800">Appointment Details</h2>
                      <button 
                        onClick={() => setStep(3)}
                        className="text-sm text-green-600 hover:text-green-800"
                      >
                        Back to Times
                      </button>
                    </div>
                    
                    <div className="bg-green-50 rounded-lg p-4 mb-6">
                      <div className="flex items-center mb-4">
                        <img 
                          src={selectedDoctor.image} 
                          alt={selectedDoctor.name} 
                          className="w-12 h-12 rounded-full object-cover mr-4"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-800">{selectedDoctor.name}</h3>
                          <p className="text-gray-600 text-sm">{selectedDoctor.specialty}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-700">
                          <Calendar className="h-4 w-4 mr-2 text-green-600" />
                          <span>{formatDate(selectedDate)}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-700">
                          <Clock className="h-4 w-4 mr-2 text-green-600" />
                          <span>{selectedTime}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-700">
                          <MapPin className="h-4 w-4 mr-2 text-green-600" />
                          <span>123 Medical Center Drive, Suite 200</span>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-lg font-medium text-gray-800 mb-3">Reason for Visit</h3>
                    <div className="mb-6">
                      <VoiceInput
                        placeholder="Describe the reason for your appointment..."
                        onTranscriptChange={handleReasonChange}
                        className="mb-2"
                      />
                      <p className="text-sm text-gray-500">
                        Use voice or text to describe your symptoms or reason for the appointment
                      </p>
                    </div>

                    <button
                      onClick={handleConfirmAppointment}
                      disabled={!appointmentReason.trim()}
                      className={`w-full py-3 px-4 rounded-lg font-medium 
                        ${appointmentReason.trim() 
                          ? 'bg-green-600 text-white hover:bg-green-700' 
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'} 
                        transition-colors duration-300`}
                    >
                      Confirm Appointment
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Appointment Confirmed!</h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Your appointment has been successfully scheduled. A confirmation has been sent to your email.
                </p>
                
                <div className="bg-gray-50 rounded-lg p-6 max-w-md mx-auto mb-8 text-left">
                  <h3 className="font-semibold text-gray-800 mb-4">Appointment Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <User className="h-5 w-5 mr-3 text-green-600 mt-0.5" />
                      <div>
                        <div className="font-medium">{selectedDoctor?.name}</div>
                        <div className="text-sm text-gray-600">{selectedDoctor?.specialty}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-3 text-green-600" />
                      <div>{formatDate(selectedDate)}</div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-3 text-green-600" />
                      <div>{selectedTime}</div>
                    </div>
                    <div className="flex items-start">
                      <FileText className="h-5 w-5 mr-3 text-green-600 mt-0.5" />
                      <div>
                        <div className="font-medium">Reason for Visit:</div>
                        <div className="text-sm text-gray-600">{appointmentReason}</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 mr-3 text-green-600 mt-0.5" />
                      <div>
                        <div className="font-medium">Location:</div>
                        <div className="text-sm text-gray-600">123 Medical Center Drive, Suite 200</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 mr-3 text-green-600 mt-0.5" />
                      <div>
                        <div className="font-medium">Contact:</div>
                        <div className="text-sm text-gray-600">(555) 123-4567</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-4 justify-center">
                  <button
                    onClick={handleStartOver}
                    className="py-2 px-6 bg-white border border-green-600 text-green-600 rounded-lg font-medium hover:bg-green-50 transition-colors duration-300"
                  >
                    Book Another Appointment
                  </button>
                  <button
                    onClick={() => {
                      // In a real app, this would add to calendar
                      speak('Appointment has been added to your calendar.');
                    }}
                    className="py-2 px-6 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors duration-300"
                  >
                    Add to Calendar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;