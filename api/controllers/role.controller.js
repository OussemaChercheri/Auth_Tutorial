import Role from "../models/Role.js";

export const createRole = async (req, res, next)=>{
    try {
        if(req.body.role && req.body.role !== ''){
            const newRole = new Role(req.body);
            await newRole.save();
            return res.send('Role created:');
        }
    } catch (error) {
        return res.status(500).send('Internal server error');
    }
}

export const UpdateRole = async (req,res,next)=> {
    try {
        const role = await  Role.findById({_id : req.params.id});
        if(role){
            const newData = await Role.findByIdAndUpdate(
                req.params.id,
                {$set: req.body},
                {new: true}
            );
            return res.status(200).send("Role Updated!");
        }else{
            return res.status(404).send("Role not found")
        }
    } catch (error) {
        return res.status(500).send('Internal server error');
    }
}

export const getAllRoles = async (req, res, next) =>{
    try {
        const roles = await Role.find({});
        return res.status(200).json(roles);
    } catch (error) {
        return res.status(500).send('Internal server error');
    }
}

export const deleteRole = async (req , res , next )=>{
    try {
        const roleId = req.params.id;
        const role = await Role.findById({_id: roleId});
        if (role){
            await Role.findByIdAndDelete(roleId);
            return res.status(200).send(`The role has been deleted.`);
        }
        else {
            return res.status(404).send("This role does not exist.");
        }
    } catch (error) {
        return res.status(500).send('Internal server error');
    }

}