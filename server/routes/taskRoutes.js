const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Task = require('../models/Task');
const { protect } = require('../middleware/errorMiddleware');

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Gerenciamento de tarefas do usuário
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *         - user
 *         - completed
 *       properties:
 *         _id:
 *           type: string
 *           description: ID gerado automaticamente para a tarefa
 *         user:
 *           type: string
 *           description: ID do usuário dono da tarefa
 *         title:
 *           type: string
 *           description: Título da tarefa
 *         description:
 *           type: string
 *           description: Descrição opcional da tarefa
 *         completed:
 *           type: boolean
 *           description: Indica se a tarefa está concluída
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         _id: 60d0fe4f5311236168a109ca
 *         user: 60d0fe4f5311236168a109cb
 *         title: Comprar pão
 *         description: Na padaria da esquina
 *         completed: false
 *         createdAt: 2023-10-27T10:00:00.000Z
 *         updatedAt: 2023-10-27T10:00:00.000Z
 *     NewTask:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *     UpdateTask:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         completed:
 *           type: boolean
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Retorna todas as tarefas do usuário logado
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de tarefas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       '401':
 *         description: Não autorizado (token inválido ou ausente)
 */
router.get(
  '/',
  protect,
  asyncHandler(async (req, res) => {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
  })
);

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Cria uma nova tarefa para o usuário logado
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewTask'
 *     responses:
 *       '201':
 *         description: Tarefa criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       '400':
 *         description: Dados inválidos (ex: título faltando)
 *       '401':
 *         description: Não autorizado
 */
router.post(
  '/',
  protect,
  asyncHandler(async (req, res) => {
    const { title, description } = req.body;

    if (!title) {
      res.status(400);
      throw new Error('O título da tarefa é obrigatório');
    }

    const task = new Task({
      title,
      description,
      user: req.user._id,
    });

    const createdTask = await task.save();
    res.status(201).json(createdTask);
  })
);

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Retorna uma tarefa específica pelo ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da tarefa
 *     responses:
 *       '200':
 *         description: Detalhes da tarefa
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       '401':
 *         description: Não autorizado
 *       '404':
 *         description: Tarefa não encontrada ou não pertence ao usuário
 */
router.get(
  '/:id',
  protect,
  asyncHandler(async (req, res) => {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (task) {
      res.json(task);
    } else {
      res.status(404);
      throw new Error('Tarefa não encontrada ou não pertence a este usuário');
    }
  })
);

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Atualiza uma tarefa específica pelo ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da tarefa a ser atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTask'
 *     responses:
 *       '200':
 *         description: Tarefa atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       '400':
 *         description: Dados inválidos
 *       '401':
 *         description: Não autorizado
 *       '404':
 *         description: Tarefa não encontrada ou não pertence ao usuário
 */
router.put(
  '/:id',
  protect,
  asyncHandler(async (req, res) => {
    const { title, description, completed } = req.body;

    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (task) {
      task.title = title || task.title;
      task.description = description !== undefined ? description : task.description;
      task.completed = completed !== undefined ? completed : task.completed;

      const updatedTask = await task.save();
      res.json(updatedTask);
    } else {
      res.status(404);
      throw new Error('Tarefa não encontrada ou não pertence a este usuário');
    }
  })
);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Exclui uma tarefa específica pelo ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da tarefa a ser excluída
 *     responses:
 *       '200':
 *         description: Tarefa excluída com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Tarefa removida
 *       '401':
 *         description: Não autorizado
 *       '404':
 *         description: Tarefa não encontrada ou não pertence ao usuário
 */
router.delete(
  '/:id',
  protect,
  asyncHandler(async (req, res) => {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (task) {
      await task.deleteOne();
      res.json({ message: 'Tarefa removida' });
    } else {
      res.status(404);
      throw new Error('Tarefa não encontrada ou não pertence a este usuário');
    }
  })
);

module.exports = router;
