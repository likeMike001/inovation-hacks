import { useState } from 'react';
import axios from 'axios';

const JobAutoApply = () => {
  const [jobUrl, setJobUrl] = useState('');
  const [resume, setResume] = useState(null);
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('job_url', jobUrl);
    formData.append('resume', resume);

    try {
      const res = await axios.post('http://localhost:5000/apply', formData);
      setStatus(res.data.message);
    } catch (err) {
      setStatus('Failed to apply. Check your inputs or try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Auto Job Apply</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={jobUrl}
          onChange={(e) => setJobUrl(e.target.value)}
          placeholder="Paste job URL"
          required
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setResume(e.target.files[0])}
          required
          className="mb-4"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Apply
        </button>
      </form>
      {status && <p className="mt-4">{status}</p>}
    </div>
  );
};

export default JobAutoApply;
