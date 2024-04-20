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
    },

    getAll: async (req,res) => {
        try {
            const workers = await WorkerModel.find();
            res.status(200).json({workers});
        } catch (error) {   
            console.log(error);
        }
    },

    getOne: async (req,res) => {
        try {
            const worker = await WorkerModel.findById(req.params.id);

            if(!worker){
                return res.status(404).json({msg: "Worker not found"});
            }

            res.status(200).json({worker});
        } catch (error) {
            console.log(error);
        }
    },

    update: async (req,res) => {
        try {
            const id = req.params.id;
            const worker = {
                name: req.body.name,
                cpf: req.body.cpf,
                password: req.body.password,
                email: req.body.email,
                phone: req.body.phone,
                office: req.body.office,
            };

            const workerUpdate = await WorkerModel.findByIdAndUpdate(id,worker);

            if(!req.body.name || !req.body.cpf || !req.body.password || !req.body.email || !req.body.phone || !req.body.office){
                res.status(400).json({msg: "Missing fields"});
                return 
            }
            if(!worker){
                res.status(404).json({msg: "Worker not found"});
                return 
            }

            res.status(200).json({workerUpdate,msg: "Worker updated successfully"});

        } catch (error) {
            console.log(error);
        }
    },
}


module.exports = workerController;