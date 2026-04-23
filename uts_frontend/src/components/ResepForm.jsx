import React, { useState } from 'react';
import axios from 'axios';

const ResepForm = ({ onClose, onSuccess }) => {
  const [form, setForm] = useState({
    nama: '', deskripsi: '', kategori: '', tingkat_kesulitan: '',
    bahan: [{ nama_bahan: '', takaran: '' }],
    langkah: [{ instruksi: '' }]
  });

  const tambahBahan = () => setForm({ ...form, bahan: [...form.bahan, { nama_bahan: '', takaran: '' }] });
  const hapusBahan = (i) => setForm({ ...form, bahan: form.bahan.filter((_, idx) => idx !== i) });
  const tambahLangkah = () => setForm({ ...form, langkah: [...form.langkah, { instruksi: '' }] });
  const hapusLangkah = (i) => setForm({ ...form, langkah: form.langkah.filter((_, idx) => idx !== i) });

  const handleSubmit = async () => {
    if (!form.nama || !form.kategori || !form.tingkat_kesulitan) {
      alert('Nama, kategori, dan kesulitan wajib diisi!');
      return;
    }
    const konfirmasi = window.confirm('Yakin mau tambah resep ini?');
    if (!konfirmasi) return;

    let resepId = null;

    try {
      const resepRes = await axios.post("http://localhost:3000/api/resep", {
        nama: form.nama,
        deskripsi: form.deskripsi,
        kategori: form.kategori,
        tingkat_kesulitan: form.tingkat_kesulitan,
      });
      resepId = resepRes.data.id;

      for (const b of form.bahan) {
        await axios.post(`http://localhost:3000/api/resep/${resepId}/bahan`, b);
      }
      for (const [i, l] of form.langkah.entries()) {
        await axios.post(`http://localhost:3000/api/resep/${resepId}/langkah`, {
          urutan: i + 1, instruksi: l.instruksi
        });
      }
      alert('Resep berhasil ditambahkan! ✅');
      onSuccess();

    } catch (error) {
      alert('Gagal tambah resep! ❌');
      if (resepId) { 
        await axios.delete(`http://localhost:3000/api/resep/${resepId}`);
      }
      console.error(error);
    }
};

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="btn-tutup" onClick={onClose}>✕</button>
        <h2>Tambah Resep Baru</h2>

        <input placeholder="Nama Resep" value={form.nama}
          onChange={(e) => setForm({ ...form, nama: e.target.value })} />
        <textarea placeholder="Deskripsi" value={form.deskripsi}
          onChange={(e) => setForm({ ...form, deskripsi: e.target.value })} />
        <select value={form.kategori} onChange={(e) => setForm({ ...form, kategori: e.target.value })}>
          <option value="">Pilih Kategori</option>
          <option value="Daging">Daging</option>
          <option value="Ayam">Ayam</option>
          <option value="Sayur">Sayur</option>
        </select>
        <select value={form.tingkat_kesulitan} onChange={(e) => setForm({ ...form, tingkat_kesulitan: e.target.value })}>
          <option value="">Pilih Kesulitan</option>
          <option value="mudah">Mudah</option>
          <option value="sedang">Sedang</option>
          <option value="sulit">Sulit</option>
        </select>

        <h3>🥘 Bahan</h3>
        {form.bahan.map((b, i) => (
          <div key={i} className="dynamic-row">
            <input placeholder="Nama Bahan" value={b.nama_bahan}
              onChange={(e) => {
                const arr = [...form.bahan];
                arr[i].nama_bahan = e.target.value;
                setForm({ ...form, bahan: arr });
              }} />
            <input placeholder="Takaran" value={b.takaran}
              onChange={(e) => {
                const arr = [...form.bahan];
                arr[i].takaran = e.target.value;
                setForm({ ...form, bahan: arr });
              }} />
            {form.bahan.length > 1 && (
              <button className="btn-hapus" onClick={() => hapusBahan(i)}>❌</button>
            )}
          </div>
        ))}
        <button className="btn-add" onClick={tambahBahan}>+ Tambah Bahan</button>

        <h3>📋 Langkah</h3>
        {form.langkah.map((l, i) => (
          <div key={i} className="dynamic-row">
            <span>{i + 1}.</span>
            <input placeholder="Instruksi" value={l.instruksi}
              onChange={(e) => {
                const arr = [...form.langkah];
                arr[i].instruksi = e.target.value;
                setForm({ ...form, langkah: arr });
              }} />
            {form.langkah.length > 1 && (
              <button className="btn-hapus" onClick={() => hapusLangkah(i)}>❌</button>
            )}
          </div>
        ))}
        <button className="btn-add" onClick={tambahLangkah}>+ Tambah Langkah</button>

        <button className="btn-submit" onClick={handleSubmit}>Simpan Resep</button>
      </div>
    </div>
  );
};

export default ResepForm;