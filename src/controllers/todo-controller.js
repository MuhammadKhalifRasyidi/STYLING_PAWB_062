// controllers/todo-controller.js
const database = require('../configs/database');  // Pastikan koneksi database sudah benar

// Create (Menambahkan kegiatan)
const createKegiatan = (req, res) => {
  const { jenis_kegiatan, deskripsi } = req.body;

  // Validasi input
  if (!jenis_kegiatan || !deskripsi) {
    return res.status(400).json({ message: 'Jenis kegiatan dan deskripsi diperlukan' });
  }

  const sql = 'INSERT INTO kegiatan (jenis_kegiatan, deskripsi) VALUES (?, ?)';

  database.query(sql, [jenis_kegiatan, deskripsi], (err, result) => {
    if (err) {
      console.error('Error saat menambah kegiatan:', err);
      return res.status(500).json({ message: 'Terjadi kesalahan saat menambah kegiatan' });
    }

    return res.status(201).json({
      id: result.insertId,
      jenis_kegiatan,
      deskripsi
    });
  });
};

// Read (Mengambil semua kegiatan)
const getAllKegiatan = (req, res) => {
  const sql = 'SELECT * FROM kegiatan';

  database.query(sql, (err, result) => {
    if (err) {
      console.error('Error saat mengambil kegiatan:', err);
      return res.status(500).json({ message: 'Terjadi kesalahan saat mengambil kegiatan' });
    }

    return res.status(200).json(result);
  });
};


// Update (Memperbarui kegiatan)
const updateKegiatan = (req, res) => {
  const { id } = req.params;
  const { jenis_kegiatan, deskripsi } = req.body;

  if (!jenis_kegiatan || !deskripsi) {
    return res.status(400).json({ message: 'Jenis kegiatan dan deskripsi diperlukan' });
  }

  const sql = 'UPDATE kegiatan SET jenis_kegiatan = ?, deskripsi = ? WHERE id = ?';

  database.query(sql, [jenis_kegiatan, deskripsi, id], (err, result) => {
    if (err) {
      console.error('Error saat memperbarui kegiatan:', err);
      return res.status(500).json({ message: 'Terjadi kesalahan saat memperbarui kegiatan' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Kegiatan tidak ditemukan' });
    }

    return res.status(200).json({
      id,
      jenis_kegiatan,
      deskripsi
    });
  });
};

// Delete (Menghapus kegiatan)
const deleteKegiatan = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM kegiatan WHERE id = ?';

  database.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error saat menghapus kegiatan:', err);
      return res.status(500).json({ message: 'Terjadi kesalahan saat menghapus kegiatan' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Kegiatan tidak ditemukan' });
    }

    return res.status(200).json({ message: 'Kegiatan berhasil dihapus' });
  });
};

 
// Controller to render sign-up page
const renderHalamanTodo = (req, res) => {
    res.render('todo', {
        layout: 'layouts/main-layouts',
        title: 'Kegiatan',
        showNavbar: true,
        showFooter: true,
    });
};

// Export semua controller
module.exports = {
  createKegiatan,
  getAllKegiatan,
  updateKegiatan,
  renderHalamanTodo,
  deleteKegiatan,
};
