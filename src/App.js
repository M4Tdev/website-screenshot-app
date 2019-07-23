import React, { useState } from 'react';
import backendAxios from './backendAxios';
import './App.css';

function App() {

  const [url, setUrl] = useState('');
  const [status, setStatus] = useState('');

  const inputChange = (e) => {
    setUrl(e.currentTarget.value);
    if (status !== '') {
      setStatus('');
    }
  }

  const takeScreenshot = async (e) => {
    e.preventDefault();

    if (url === '') {
      setStatus('Provide the URL');

      return;
    }

    setStatus('Request sent');
    const encodedUrl = encodeURIComponent(url);
    const res = await backendAxios.get(`/url/${encodedUrl}`);
    setStatus(res.data.downloadUrl);

    setUrl('');
  };

  return (
    <div className="App">
      <header>
        <h1>Screenshot any website</h1>
      </header>
      <main>
        <form className="form" onSubmit={takeScreenshot}>
          <label htmlFor="url">URL</label>
          <input type="text" name="url" id="url" value={url} onChange={inputChange} />
          <button type="submit">Take a screenshot</button>
        </form>
      </main>
      <div className="status-section">
        {status !== '' ? (
          <div className="status" dangerouslySetInnerHTML={{ __html: status }} ></div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
