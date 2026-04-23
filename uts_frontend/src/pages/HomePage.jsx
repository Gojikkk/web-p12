import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ResepList from '../components/ResepList';
import ResepForm from '../components/ResepForm';

const HomePage = () => {
  const [resep, setResep] = useState([]);
  const [filter, setFilter] = useState({ kategori: '', kesulitan: '' });
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 6;

  useEffect(() => {
    fetchResep();
  }, []);

  const fetchResep = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/resep");
      setResep(res.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const resepFiltered = resep.filter((item) => {
    return (
      (filter.kategori === '' || item.kategori === filter.kategori) &&
      (filter.kesulitan === '' || item.tingkat_kesulitan === filter.kesulitan)
    );
  });

  const totalPage = Math.ceil(resepFiltered.length / itemPerPage);
  const resepPaginated = resepFiltered.slice(
    (currentPage - 1) * itemPerPage,
    currentPage * itemPerPage
  );

  return (
    <div className="container">
      <h1 className="title">🍜 Resep Masakan Nusantara</h1>

      {/* Filter Bar */}
      <div className="filter-bar">
        <select onChange={(e) => { setFilter({ ...filter, kategori: e.target.value }); setCurrentPage(1); }}>
          <option value="">Semua Kategori</option>
          <option value="Daging">Daging</option>
          <option value="Ayam">Ayam</option>
          <option value="Sayur">Sayur</option>
        </select>
        <select onChange={(e) => { setFilter({ ...filter, kesulitan: e.target.value }); setCurrentPage(1); }}>
          <option value="">Semua Kesulitan</option>
          <option value="mudah">Mudah</option>
          <option value="sedang">Sedang</option>
          <option value="sulit">Sulit</option>
        </select>
        <button className="btn-tambah" onClick={() => setShowModal(true)}>
          + Tambah Resep
        </button>
      </div>

      {/* List Resep */}
      <ResepList resep={resepPaginated} onRefresh={fetchResep} />

      {/* Pagination */}
      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>◀</button>
        {Array.from({ length: totalPage }, (_, i) => (
          <button
            key={i + 1}
            className={currentPage === i + 1 ? 'active' : ''}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button disabled={currentPage === totalPage} onClick={() => setCurrentPage(currentPage + 1)}>▶</button>
      </div>

      {/* Modal Tambah Resep */}
      {showModal && (
        <ResepForm
          onClose={() => setShowModal(false)}
          onSuccess={() => { fetchResep(); setShowModal(false); }}
        />
      )}
    </div>
  );
};

export default HomePage;