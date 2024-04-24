const { User: UserModel, userSchema } = require('../modules/User.js');

const userController = {
    // POST METHODS
    async create(req, res) {
        try {  

            const { cpf, email, phone } = req.body;
            const userExists = await UserModel.findOne ({ cpf: cpf }) || await UserModel.findOne ({ email: email }) || await UserModel.findOne ({ phone: phone });

            if(!req.body.name || !req.body.cpf || !req.body.password || !req.body.email || !req.body.phone){
                res.status(406).json({msg: "Missing required fields"});
                return;
            }

            if(userExists){
                res.status(409).json({msg: "User already exists"});
                return;
            }

            const user = {
                name: req.body.name,
                cpf: req.body.cpf,
                password: req.body.password,
                email: req.body.email,
                phone: req.body.phone,
            }

            const response = await UserModel.create(user);

            res.status(201).json({response, msg: "User created successfully"});

        } catch (error) {
            console.log(error);
        }
    },


    // GET METHODS
    getAll: async (req,res) => {
        try {
            const users = await UserModel.find();
            res.status(200).json({users});
        } catch (error) {   
            console.log(error);
        }
    },

    getOne: async (req,res) => {
        try {
            const id = req.params.id;
            const user = await UserModel.findById(id);

            if(!user){
                res.status(404).json({msg: "User not found"});
                return
            }

            res.status(200).json({user});
        } catch (error) {
            console.log(error);
        }
    },

    // PUT METHODS

    update:  async (req,res) => {
        try {
            const { cpf, email, phone } = req.body;
            const id = req.params.id;
            const user = {
                name: req.body.name,
                cpf: req.body.cpf,
                password: req.body.password,
                email: req.body.email,
                phone: req.body.phone,
            }

            if(!req.body.name || !req.body.cpf || !req.body.password || !req.body.email || !req.body.phone){
                res.status(406).json({msg: "Missing required fields"});
                return;
            }
    
            const existingUser = await UserModel.findOne({
                $or: [
                    { cpf: cpf },
                    { email: email },
                    { phone: phone }
                ],
                _id: { $ne: id } // Exclua o usuário atual da pesquisa
            });

            if (existingUser) {
                res.status(409).json({ msg: "CPF, email or phone number already exists" });
                return;
            }

            const userUpdate = await UserModel.findByIdAndUpdate(id,user);

            if(!userUpdate){
                res.status(404).json({msg: "User not found"});
                return;
            }


            res.status(200).json({userUpdate, msg: "User updated successfully"});

        } catch (error) {
            console.log(error);
        }
    },

    //DELETE METHODS
    delete: async (req,res) => {
        try {
            const id = req.params.id;
            const user = await UserModel.findById(id);

            if(!user){
                res.status(404).json({msg: "User not found"});
                return;
            }

            const deletedUser = await UserModel.findByIdAndDelete(id);

            res.status(200).json({deletedUser, msg: "User deleted successfully"});

        } catch (error) {
            console.log(error);
        }
    },

    login: async (req,res) => {
        const { email, cpf, phone, password } = req.body;
        const user = await UserModel.findOne({ email: email }) || await UserModel.findOne({ cpf: cpf }) || await UserModel.findOne({phone: phone});

        if(!user){
            res.status(404).json({msg: "User not found"});
            return;
        }

        if(!await user.checkPassword(password)){
            res.status(401).json({msg: "Invalid password"});
            return;
        }

        res.status(200).json({
            _id:user.id,
            name:user.name,
            email: user.email,
            phone: user.phone,
            msg: "Login successfully",
        });
    }
}

module.exports = userController;