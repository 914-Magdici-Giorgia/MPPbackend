import Country from "../models/Country.js";
import Mill from "../models/Mill.js";

const getAllCountries = async (req, res) => {
    try {
        const countries = await Country.findAll();
        res.json(countries);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getCountry = async (req, res) => {
    const id = parseInt(req.params.id);
    const country = await Country.findByPk(id,{include:Mill});
    if (country) {
        res.json(country);
    } else {
        res.status(404).send({country: country, message: `Country with id ${id} not found`});
    }
}

const createCountry = async (req, res) => {


    try {

        const id = Math.floor(Math.random() * 1000000);
        const newCountry = {id:id, ...req.body}
        console.log(newCountry);
        const country = await Country.create(newCountry);
        res.status(201).json({country: country, message: 'Country created successfully'});
    } catch (error) {
        res.status(400).send({error, message: 'Error creating country'});
    }
}

const updateCountry = async (req, res) => {
    const id = parseInt(req.params.id);
    const updatedCountry = req.body;

    try {
        const country = await Country.findByPk(id);
        if (!country) {
            res.status(404).send({country: country, message: `Country with id ${id} not found`});
        }
        await country.update(updatedCountry);
        res.status(200).send({message:"Country Updated"});
    } catch (error) {
        res.status(400).send({error, message: 'Error updating Country'});
    }
}


const deleteCountry = async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await Country.findByPk(id);
    console.log(result);
    try {
        if (!result) {
            res.status(404).send({message: `Country with id ${id} not found`});
        }
        await result.destroy();
        res.status(200).send({message:"Country deleted succesfully"})
    } catch (error) {
        res.status(400).send({error, message: 'Error deleting Country'});
    }

}

export default{
    getAllCountries,
    getCountry,
    createCountry,
    updateCountry,
    deleteCountry
};