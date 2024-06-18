import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = ({ setDocuments }) => {
  const [query, setQuery] = useState('');
  const [searchBy, setSearchBy] = useState('filename');

  const onSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://127.0.0.1:5000/documents/search?${searchBy}=${query}`);
      setDocuments(response.data);
    } catch (error) {
      console.error('Error al buscar documento', error);
    }
  };

  return (
    <form onSubmit={onSearch}>
      <input
        type="text"
        placeholder="Buscar..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <select onChange={(e) => setSearchBy(e.target.value)} value={searchBy}>
        <option value="Nombre de archivo">Nombre de archivo</option>
        <option value="Autor">Autor</option>
        <option value="categoría">Categoría</option>
      </select>
      <button type="submit">Buscar</button>
    </form>
  );
};

export default SearchBar;
