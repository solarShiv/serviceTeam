const State = require('../../models/common/state.model');
const District = require('../../models/common/district.model');
const Department = require('../../models/common/department.model');
const Product = require('../../models/common/product.model');
const Authority = require('../../models/common/authority.model');
const find = require('../../utils/common/mongoose/find');
const insertMany = require('../../utils/common/mongoose/insertMany');
const Company = require('../../models/common/company.model');
const Stage = require('../../models/common/stage.model');
const mongoose = require('mongoose');
const addState = async(req,res) =>{
    try {
        const states = req.body.state;
        if (!Array.isArray(states)) {
            return res.status(400).json({
                success:false,
                message:'Please send state name in array format'
            })
        }
    
        const stateDocuments = states.map((stateName) => ({
            state: stateName,
        }));
        const insertedStates = await State.insertMany(stateDocuments);
        if(insertedStates){
            return res.status(200).json({
                success:true,
                message:'States added successfully'
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:false,
            message:'Something is wrong please connect with developer.'
        })
    }
}
const showState = async(req,res) =>{
    try {
        const states = await State.find().select("-__v -create_At").lean();
        return res.status(200).json({
            success:true,
            message:'List of all states',
            states
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:'Something is wrong please connect with developer.'
        })
    }
}
const addDistrict = async(req,res) =>{
    try {
        // const _id = req.body._id || req.query._id || req.params['_id'];
        const { stateId, districts } = req.body;

        // Validate input
        if (!stateId || !Array.isArray(districts) || districts.length === 0) {
            return res.status(400).json({
                success:false,
                message: 'stateId and an array of districts are required.',
            });
        }

        // Create a new District document
        const newDistrict = new District({
            stateId,
            district: districts,
        });

        // Save the document to the database
        const savedDistrict = await newDistrict.save();
        if(savedDistrict){
            res.status(201).json({
                success:true,
                message: 'Districts saved successfully!',
                data: savedDistrict,
            });
        }
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:'Something is wrong please connect with developer.'
        })
    }
}
const showDistrict = async(req,res) =>{
    try {
        const stateId = req.body.stateId || req.query.stateId || req.params['stateId'];
        if (!mongoose.Types.ObjectId.isValid(stateId)) {
            return res.status(400).json({
                success:false,
                message: 'Invalid stateId provided.',
            });
        }
        const districts = await District.find({ stateId }).select("-stateId -create_At -__v");

        if (!districts || districts.length === 0) {
            return res.status(404).json({
                success:false,
                message: 'No districts found for the provided stateId.',
            });
        }

        res.status(200).json({
            successL:true,
            message: 'Districts retrieved successfully!',
            districts,
        });
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:false,
            message:'Something is wrong please connect with developer.'
        })
    }
}
const addDepartment = async(req,res) =>{
    try {
        const {stateId, department, created_By } = req.body;
        if (!mongoose.Types.ObjectId.isValid(stateId)) {
            return res.status(400).json({
                success:false,
                message: 'Invalid stateId provided.',
            });
        }
        const departmentsToSave = Array.isArray(department) ? department : [department];
        const departmentData = departmentsToSave.map(dep => ({
            stateId,
            department: dep,
            created_By
        }));

        // Save the data to the database
        const savedDepartments = await Department.insertMany(departmentData);
        if(savedDepartments){
            res.status(201).json({
                success:true,
                message: 'Department(s) saved successfully!',
                data: savedDepartments,
            });
        }
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:'Something is wrong please connect with developer.'
        })
    }
}


const showDepartment = async(req,res) =>{
    try {
        const stateId = req.query.stateId ||req.params['stateId'];

        // Validate stateId
        if (!mongoose.Types.ObjectId.isValid(stateId)) {
            return res.status(400).json({
                success:true,
                message: 'Invalid stateId provided.',
            });
        }

        // Fetch departments for the given stateId
        const departments = await Department.find({ stateId }).select("-__v -created_By -create_At");

        if (!departments || departments.length === 0) {
            return res.status(400).json({
                success:false,
                message: 'No departments found for the provided stateId.',
            });
        }
        res.status(200).json({
            success:true,
            message: 'Departments retrieved successfully!',
            data: departments,
        });
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:'Something is wrong please connect with developer.'
        })
    }
}

const addProduct = async(req,res) =>{
    try {
        // const empId = req.empId;
        // console.log(empId);
        const {departmentId, products} = req.body;
        if (!departmentId || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ 
                success:false,
                message: 'Invalid input. Ensure departmentId, products array, and createdBy are provided.' });
        }

        // Prepare product data for bulk insertion
        const productData = products.map((product) => ({
            departmentId,
            product,
            created_By: "673b155a03106300fba4fe25"
        }));

        // Insert multiple products
        const insertedProducts = await Product.insertMany(productData);
        if(insertedProducts){

            return res.status(201).json({ 
                success:true,
                message: 'Products added successfully',
                products: insertedProducts || []
            });

        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:false,
            message:'Something is wrong please connect with developer.'
        })
    }
}

const showProduct = async(req,res) =>{
    try {
        const departmentId = req.body.departmentId || req.query.departmentId || req.params['departmentId'];
        console.log("DID",departmentId);
        const products = await Product.find({departmentId}).select("_id product");
        if(products){
            return res.status(200).json({
                success:true,
                products : products || []
            })
        }
        return res.status(400).json({
            success:false,
            message:'Something is wrong please try again.'
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:false,
            message:'Something is wrong please connect with developer.'
        })
    }
}

const addProject = async(req,res) =>{
    try {
        const empId = req.empId;
        const {productId, projects} = req.body;
        if (!productId || !Array.isArray(projects) || projects.length === 0) {
            return res.status(400).json({ 
                success:false,
                message: 'Invalid input. Ensure departmentId, project array, and createdBy are provided.' });
        }

        // Prepare product data for bulk insertion
        const projectData = projects.map((project) => ({
            productId,
            project,
            created_By: empId
        }));

        // Insert multiple products
        const insertedProjects = await Product.insertMany(projectData);
        if(insertedProjects){

            return res.status(201).json({ 
                success:true,
                message: 'Projects added successfully',
                projects: insertedProjects || []
            });

        }
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:'Something is wrong please connect with developer.'
        })
    }
}

const showProject = async(req,res) =>{
    try {
        const productId = req.body.productId || req.query.productId || req.params['productId'];
        const projects = await Product.find({productId}).select("_id project");
        if(projects){
            return res.status(200).json({
                success:true,
                projects : projects || []
            })
        }
        return res.status(400).json({
            success:false,
            message:'Something is wrong please try again.'
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:'Something is wrong please connect with developer.'
        })
    }
}

const addAuthority = async(req,res) =>{
    try {
        const { name } = req.body;
        const empId = req.empId;
        // Validate required fields
        if (!name) {
            return res.status(400).json({ 
                success:false,
                message: 'Name and created_By are required.' 
            });
        }
        const newAuthority = new Authority({
            name,
            created_By:empId
        });

        // Save the authority to the database
        const savedAuthority = await newAuthority.save();

        res.status(201).json({ 
            success:true, 
            message: 'Authority added successfully.', 
            authority: savedAuthority 
        });
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:'Something is wrong please connect with developer.'
        })
    }
}

const showAuthority = async(req,res) =>{
    try {
        const modelNames = Authority;
        const filters = {};
        const select ="-__v -created_At -updated_At -created_By -updated_By -_id";
        const authorities = await find(modelNames, filters, select);
        if(authorities){
            return res.status(200).json({
                success:true,
                data:authorities
            })
        }
        return res.status(400).json({ 
            success:false,
            message: 'Please try again.' 
        });
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:'Something is wrong please connect with developer.'
        })
    }
}

const addCompany = async(req,res) =>{
    try {
        const { name } = req.body;
        const empId = req.empId;
        // Validate required fields
        if (!name ) {
            return res.status(400).json({success:false, message: 'Name  are required.' });
        }

        // Create a new company document
        const newCompany = new Company({
            name,
            created_By:empId
        });
        const savedCompany = await newCompany.save();
        res.status(201).json({success:true, message: 'Company added successfully.', company: savedCompany });
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:'Something is wrong please connect with developer.'
        })
    }
}

const showCompany = async(req,res) =>{
    try {
        const modelNames = Company;
        const filters = {};
        const select ="name -_id";
        const company = await find(modelNames, filters, select);
        if(company){
            return res.status(200).json({
                success:true,
                data:company
            })
        }
        return res.status(400).json({ 
            success:false,
            message: 'Please try again.' 
        });
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:'Something is wrong please connect with developer.'
        })
    }
}
const addStage = async(req,res) =>{
    try {
        const modelName = Stage;
        const stages = req.body.stages;
        const empId = req.empId;
        const data = [];
        for(let index = 0; index<stages.length; ++index){
            data.push(
                {
                    stage:stages[index],
                    created_By:empId
                }
            )
        }
        const stageResponse = await insertMany(modelName, data);
        if(stageResponse){
            return res.status(200).json({
                success:false,
                message:'stage added successfully.'
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success:false,
            message:'Something is wrong please connect with developer.'
        })
    }
}
const showStage = async(req,res) =>{
    try {
        const stages = await find(Stage, null ,"_id stage");
        if(stages){
            return res.status(200).json({
                success:true,
                data:stages
            })
        }
        return res.status(400).json({
            success:false,
            message:'Something is wrong'
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:'Something is wrong please connect with developer.'
        })
    }
}
module.exports ={
    addState,
    showState,
    addDistrict,
    showDistrict,
    addDepartment,
    showDepartment,
    addProduct,
    showProduct,
    addProject,
    showProject,
    addAuthority,
    showAuthority,
    addCompany,
    showCompany,
    addStage,
    showStage
}


// const  = async(req,res) =>{
//     try {
        
//     } catch (error) {
//         return res.status(400).json({
//             success:false,
//             message:'Something is wrong please connect with developer.'
//         })
//     }
// }