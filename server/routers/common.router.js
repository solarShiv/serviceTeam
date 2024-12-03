const express = require('express');
const router = express.Router();
const commonController = require('../controllers/common/common.controller');
const tokenVerify = require('../middlewares/auth/tokenVerify');

router.post("/addState", commonController.addState);
router.get("/showState", commonController.showState);
router.post("/addDistrict", commonController.addDistrict);
router.get("/showDistrict",commonController.showDistrict);
router.post("/addDepartment", commonController.addDepartment);
router.get("/showDepartment", commonController.showDepartment);
router.post("/addProduct", commonController.addProduct);
router.get("/showProduct",commonController.showProduct);
router.post("/addProject", tokenVerify, commonController.addProject);
router.get("/showProject",commonController.showProject);
router.post("/addAuthority", tokenVerify, commonController.addAuthority);
router.get("/showAuthority",commonController.showAuthority);
router.post("/addCompany", tokenVerify, commonController.addCompany);
router.get("/showCompany",commonController.showCompany);
router.post("/addStage", tokenVerify, commonController.addStage);
router.get("/showStage", tokenVerify, commonController.showStage);

module.exports = router;
