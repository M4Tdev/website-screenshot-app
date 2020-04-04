import React, { useState } from 'react';
import backendAxios from './backendAxios';
import './App.scss';

function App() {

  const [url, setUrl] = useState('');
  const [status, setStatus] = useState('');
  const [selected, setSelected] = useState('header');

  const inputChange = (e) => {
    setUrl(e.currentTarget.value);
    if (status !== '') {
      setStatus('');
    }
  }

  const selectChange = (e) => {
    setSelected(e.currentTarget.value);
  };

  const takeScreenshot = async (e) => {
    e.preventDefault();

    if (url === '') {
      setStatus('Provide the URL');

      return;
    }

    setStatus('Request sent');
    const encodedUrl = encodeURIComponent(url);
    const res = await backendAxios.get(`/url/${encodedUrl}?mode=${selected}`);
    console.log(res.data);
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
          <label className="center" htmlFor="screenshot-mode">Screenshot mode</label>
          <select id="screenshot-mode" value={selected} onChange={selectChange}>
            <option value="header">Header</option>
            <option value="fullpage">Full page</option>
          </select>
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
