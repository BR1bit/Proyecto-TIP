import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
//import { useNavigate } from 'react-router-dom';

const Upload = () => {
  const [documents, setDocuments] = useState([]);
  const [file, setFile] = useState(null);
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');

  const onFileChange = (e) => setFile(e.target.files[0]);
  const onAuthorChange = (e) => setAuthor(e.target.value);
  const onCategoryChange = (e) => setCategory(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('Archivo', file);
    formData.append('Autor', author);
    formData.append('Categoría', category);

    try {
      const response = await axios.post(`http://127.0.0.1:5000/documents/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response ? error.response.data.message : 'Error al subir el archivo');
    }
  };

  return (
    <div>
      <h1>Subir Archivo</h1>
      <form onSubmit={onSubmit}>
        <input type="file" onChange={onFileChange} required />
        <input type="text" placeholder="Autor" value={author} onChange={onAuthorChange} required />
        <input type="text" placeholder="Categoría" value={category} onChange={onCategoryChange} required />
        <button type="submit">Subir</button>
        
      </form>
      
      {message && <p>{message}</p>}
       {/* Lista de documentos */}
       <h2>Lista de documentos</h2>
      <SearchBar setDocuments={setDocuments} />
      <ul>
        {documents.map((document) => (
          <li key={document._id}>
            <p>Nombre de archivo: {document.filename}</p>
            <p>Autor: {document.author}</p>
            <p>Categoría: {document.category}</p>
            <p>Fecha: {new Date(document.uploadDate).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Upload;
