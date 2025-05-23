import React, { useState, useEffect } from 'react';

interface Reminder {
  id: number;
  medicationName: string;
  time: string;
}

const MedicationReminders: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [medicationName, setMedicationName] = useState('');
  const [time, setTime] = useState('');

  // Load reminders from localStorage on mount
  useEffect(() => {
    const savedReminders = localStorage.getItem('medicationReminders');
    if (savedReminders) {
      setReminders(JSON.parse(savedReminders));
    }
  }, []);

  // Save reminders to localStorage whenever reminders change
  useEffect(() => {
    localStorage.setItem('medicationReminders', JSON.stringify(reminders));
  }, [reminders]);

  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!medicationName.trim() || !time.trim()) return;

    const newReminder: Reminder = {
      id: Date.now(),
      medicationName: medicationName.trim(),
      time,
    };

    setReminders(prev => [...prev, newReminder]);
    setMedicationName('');
    setTime('');
  };

  const handleDeleteReminder = (id: number) => {
    setReminders(prev => prev.filter(reminder => reminder.id !== id));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-semibold mb-4">Medication Reminders</h1>

      <form onSubmit={handleAddReminder} className="mb-6 space-y-4">
        <div>
          <label className="block mb-1 font-medium" htmlFor="medicationName">
            Medication Name
          </label>
          <input
            type="text"
            id="medicationName"
            value={medicationName}
            onChange={e => setMedicationName(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="e.g. Ibuprofen"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="time">
            Time
          </label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={e => setTime(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Add Reminder
        </button>
      </form>

      {reminders.length === 0 ? (
        <p className="text-gray-600">No medication reminders added yet.</p>
      ) : (
        <ul className="space-y-3">
          {reminders.map(({ id, medicationName, time }) => (
            <li
              key={id}
              className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded"
            >
              <div>
                <p className="font-semibold">{medicationName}</p>
                <p className="text-sm text-gray-600">{time}</p>
              </div>
              <button
                onClick={() => handleDeleteReminder(id)}
                className="text-red-600 hover:text-red-800 font-bold"
                aria-label={`Delete reminder for ${medicationName}`}
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MedicationReminders;
