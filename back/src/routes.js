const Express = require('express');

const router = Express.Router();

const LancamentosController = require("./controllers/LancamentosController");

router.get("/livrocaixa/lancamentos", LancamentosController.listarLancamentos);
router.get("/livrocaixa/lancamentos/:data", LancamentosController.listaLancamento);
router.post("/livrocaixa/lancamentos", LancamentosController.cadastrarLancamento);
router.delete("/livrocaixa/lancamento", LancamentosController.excluirLancamento);
router.put("/livrocaixa/lancamento", LancamentosController.editarLancamento);

module.exports = router;