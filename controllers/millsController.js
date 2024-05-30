import Country from "../models/Country.js";
import Mill from "../models/Mill.js";

const getAllMills = async (req, res) => {
    console.log("getAllMills");
    try {
        const Mills = await Mill.findAll();
        res.json(Mills);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getMill = async (req, res) => {
    const id = parseInt(req.params.id);
    const mill = await Mill.findByPk(id,{include:Country});

    if (mill) {
        res.json(mill);
    } else {
        res.status(404).send({mill: mill, message: `Mill with id ${id} not found`});
    }
}

const createMill = async (req, res) => {


    try {

        const id = Math.floor(Math.random() * 1000000);
        const newMill = {id:id, ...req.body}
        console.log(newMill);
        const mill = await Mill.create(newMill);
        res.status(201).json({mill: mill, message: 'Mill created successfully'});
    } catch (error) {
        res.status(400).send({error, message: 'Error creating mill'});
    }
}

const updateMill = async (req, res) => {
    const id = parseInt(req.params.id);
    const updatedMill = req.body;

    try {
        const mill = await Mill.findByPk(id);
        if (!mill) {
            res.status(404).send({mill: mill, message: `Mill with id ${id} not found`});
        }
        await mill.update(updatedMill);
        res.status(200).send({message:"Mill Updated"});
    } catch (error) {
        res.status(400).send({error, message: 'Error updating Mill'});
    }
}


const deleteMill = async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await Mill.findByPk(id);
    console.log(result);
    try {
        if (!result) {
            res.status(404).send({message: `Mill with id ${id} not found`});
        }
        await result.destroy();
        res.status(200).send({message:"Mill deleted succesfully"})
    } catch (error) {
        res.status(400).send({error, message: 'Error deleting Mill'});
    }

}

export default{
    getAllMills,
    getMill,
    createMill,
    updateMill,
    deleteMill
};