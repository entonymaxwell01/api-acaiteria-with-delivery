const { Worker: WorkerModel, workerSchema } = require("../modules/Worker");

const workerController = {
    create: async (req, res) => {
        try {

            const worker = ({
                name: req.body.name,
                cpf: req.body.cpf,
                password: req.body.password,
                email: req.body.email,
                phone: req.body.phone,
                office: req.body.office,
            });

            const response = await WorkerModel.create(worker);
            res.status(200).json({ response, msg: "Worker created successfully" });
        } catch (error) {
            console.log(error);
        }
    }
}


module.exports = workerController;