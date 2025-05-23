import React from 'react';

const HealthRecords: React.FC = () => {
  // Example static data, replace with real data fetching later
  const records = [
    { id: 1, date: '2025-05-01', type: 'Blood Test', result: 'Normal' },
    { id: 2, date: '2025-04-15', type: 'X-Ray', result: 'No issues detected' },
    { id: 3, date: '2025-03-20', type: 'MRI Scan', result: 'Follow-up required' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-6">Health Records</h1>
      {records.length === 0 ? (
        <p className="text-gray-600">No health records available.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Result</th>
            </tr>
          </thead>
          <tbody>
            {records.map(({ id, date, type, result }) => (
              <tr key={id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{date}</td>
                <td className="border border-gray-300 px-4 py-2">{type}</td>
                <td className="border border-gray-300 px-4 py-2">{result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HealthRecords;
