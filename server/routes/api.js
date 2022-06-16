const express = require ('express');
const router = express.Router();
const boardsController = require("../controllers/boardsController");
const listsController = require("../controllers/listsController");
const cardsController = require("../controllers/cardsController");
const { validateBoard } = require("../validators/validators");


router.get('/boards',boardsController.getBoards );
router.get('/boards/:id', boardsController.getBoard);
router.post('/boards', validateBoard, boardsController.createBoard );

router.post('/lists', listsController.createList);
router.put('/lists/:id', listsController.editList);

router.post('/cards', cardsController.createCard);
router.get('/cards/:id', cardsController.getCard);

module.exports = router;