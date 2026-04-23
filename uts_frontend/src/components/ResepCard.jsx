import React, { useState } from 'react';
import axios from 'axios';

const ResepCard = ({ resep, onRefresh }) => {
  const [bahan, setBahan] = useState([]);
  const [langkah, setLangkah] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);

  const fetchDetail = async () => {
    try {
      const [bahanRes, langkahRes] = await Promise.all([
        axios.get(`http://localhost:3000/api/resep/${resep.id}/bahan`),
        axios.get(`http://localhost:3000/api/resep/${resep.id}/langkah`)
      ]);
      setBahan(bahanRes.data);
      setLangkah(langkahRes.data);
      setShowDetail(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async () => {
    const konfirmasi = window.confirm(`Yakin hapus resep "${resep.nama}"?`);
    if (!konfirmasi) return;
    try {
      await axios.delete(`http://localhost:3000/api/resep/${resep.id}`);
      alert('Resep berhasil dihapus! ✅');
      onRefresh();
    } catch (error) {
      alert('Gagal hapus resep! ❌');
    }
  };

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">{resep.nama}</h2>
          <span className={`badge ${resep.tingkat_kesulitan}`}>
            {resep.tingkat_kesulitan}
          </span>
        </div>
        <p className="card-deskripsi">{resep.deskripsi}</p>
        <div className="card-footer">
          <span className="kategori">🍽️ {resep.kategori}</span>
          <div className="card-actions">
            <button className="btn-detail" onClick={fetchDetail}>Lihat</button>
            <button className="btn-hapus-card" onClick={handleDelete}>🗑️</button>
          </div>
        </div>
      </div>

      {showDetail && (
        <div className="overlay" onClick={() => setShowDetail(false)}>
          <div className="detail-modal" onClick={(e) => e.stopPropagation()}>
            <button className="btn-tutup" onClick={() => setShowDetail(false)}>✕</button>
            <h2>{resep.nama}</h2>
            <p className="detail-deskripsi">{resep.deskripsi}</p>
            <div className="detail-info">
              <span className={`badge ${resep.tingkat_kesulitan}`}>{resep.tingkat_kesulitan}</span>
              <span className="kategori">🍽️ {resep.kategori}</span>
            </div>

            <div className="accordion">
              <button className="accordion-header"
                onClick={() => setOpenAccordion(openAccordion === 'bahan' ? null : 'bahan')}>
                🥘 Bahan-Bahan
                <span>{openAccordion === 'bahan' ? '▲' : '▼'}</span>
              </button>
              <div className={`accordion-body ${openAccordion === 'bahan' ? 'open' : ''}`}>
                <ul>
                  {bahan.map((b) => (
                    <li key={b.id}>{b.nama_bahan} — {b.takaran}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="accordion">
              <button className="accordion-header"
                onClick={() => setOpenAccordion(openAccordion === 'langkah' ? null : 'langkah')}>
                📋 Langkah-Langkah
                <span>{openAccordion === 'langkah' ? '▲' : '▼'}</span>
              </button>
              <div className={`accordion-body ${openAccordion === 'langkah' ? 'open' : ''}`}>
                <ol>
                  {langkah.map((l) => (
                    <li key={l.id}>{l.instruksi}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResepCard;