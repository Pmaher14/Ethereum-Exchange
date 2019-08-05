const express = require("express");

const AccountController = require("../controllers/account");

const router = express.Router();

router.post("", AccountController.createAccount);

router.put("/:id", AccountController.updateAccount);

router.get("/:id", AccountController.getAccount);

module.exports = router;
