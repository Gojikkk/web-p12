import React from 'react';
import ResepCard from './ResepCard';

const ResepList = ({ resep, onRefresh }) => {
  return (
    <div className="card-grid">
      {resep.length === 0 ? (
        <p className="kosong">Tidak ada resep ditemukan.</p>
      ) : (
        resep.map((item) => (
          <ResepCard key={item.id} resep={item} onRefresh={onRefresh} />
        ))
      )}
    </div>
  );
};

export default ResepList;