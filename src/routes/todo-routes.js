// routes/todo-routes.js
const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo-controller');

// CRUD routes
router.get('/', todoController.renderHalamanTodo)
router.get('/daftarkegiatan', todoController.getAllKegiatan);
router.post('/', todoController.createKegiatan);
router.put('/:id', todoController.updateKegiatan);
router.delete('/:id', todoController.deleteKegiatan);

module.exports = router;
