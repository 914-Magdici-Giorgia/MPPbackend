import express from "express";
import mill from "../controllers/millsController.js";
import country from "../controllers/countriesController.js";
import {getUserByToken, registerUser, signInUser, verifyJwt} from "../controllers/userController.js";

const router = express.Router();

router.get('/mill', mill.getAllMills);
router.get('/mill/:id', mill.getMill);
router.post('/mill', mill.createMill);
router.put('/mill/:id', mill.updateMill);
router.delete('/mill/:id', mill.deleteMill);

router.get('/country', country.getAllCountries);
router.get('/country/:id', country.getCountry);
router.post('/country',country.createCountry);
router.put('/country/:id',country.updateCountry);
router.delete('/country/:id',country.deleteCountry);


router.post('/sign-up', registerUser);
router.post('/sign-in', signInUser);
router.get('/private',verifyJwt,getUserByToken);
export default router;