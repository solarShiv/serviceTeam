const excelToJSON = require('../../utils/Excel/excelToJSON');
const insertMany = require('../../utils/common/mongoose/insertMany');
const find = require('../../utils/common/mongoose/find');
const Farmer = require('../../models/farmer/farmer.model');
const Complaint = require('../../models/farmer/complaint.model');
const startDateConvertor = require("../../helpers/common/dateConversion/startDate");
const endDateConvertor = require('../../helpers/common/dateConversion/endDate');
const mongoose = require('mongoose')
const addFarmerByExcel = async(req,res) =>{
    try {
        const JSON_Data = await excelToJSON(req.file.buffer);
        // console.log(JSON_Data)
            // Process each row to convert date strings into valid Date objects

        const farmers = JSON_Data.map((row) => ({
            saralId: row['saralId'],
            farmerName: row['farmerName'],
            fatherOrHusbandName: row['fatherOrHusbandName'],
            contact: row['contact'].toString(), // Ensure contact is a string
            state: row['state'],
            district: row['district'] || '', // Default to empty string if undefined
            department: row['department'],
            product: row['product'],
            project: row['project'] || '',
            block: row['block'] || '',
            gram_Panchayat: row['gram_Panchayat'] || '',
            village: row['village'] || '',
            pin: parseInt(row['pin'], 10), // Ensure pin is a number
            address: row['address'] || '',
            installationDate: new Date((row['installationDate'] - 25569) * 86400 * 1000), // Convert to Date
            pump_type: row['pump_type'] || '',
            installer_name: row['installer_name'] || '',
            survey_done: row['survey_done'] === 'true' || row['survey_done'] === true, // Boolean conversion
            survey_done_date: row['survey_done_date'] ? new Date(row['survey_done_date']) : null,
            Supplier_selection: row['supplier_selection'] || '',
            Supplier_selection_come_in_office: row['Supplier_selection_come_in_office'] || '',
            HP: row['HP'] || '',
            AC_DC: row['AC_DC'] || '',
            remark: row['remark'] || ''
        }));
        const insertResponse = await insertMany(Farmer, farmers);
        if(insertResponse){
            return res.status(200).json({
                success:true,
                message:'Excel Uploaded successfully.'
            })
        }
        return res.status(400).json({
            success:false,
            message:'something is wrong'
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:false,
            message:'Something is wrong please connect with developer.'
        })
    }
}

const showFarmer = async(req,res) =>{
    try {
        const saralId = req.query.saralId || req.params['saralId'];
        console.log(saralId)
        let filters ={};
        if(saralId) filters.saralId = { $regex: saralId, $options: 'i' };
        const select = " -__v -created_At -updated_At -created_By -updated_By -remark -Supplier_selection_come_in_office";
        const responseData = await find(Farmer, filters, select);
        console.log(responseData)
        if(responseData.length > 0){
            return res.status(200).json({
                success:true,
                message:'Farmer is Exist',
                response:responseData
            })
        }
        return res.status(200).json({
            success:false,
            message:'Farmer is not exist.'
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:'Something is wrong please connect with developer.'
        })
    }
}

const addFarmer = async(req,res) =>{
    try {
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:'Something is wrong please connect with developer.'
        })
    }
}
const addComplaint = async(req,res) =>{
    try {
        // console.log("empId",req.empId);
        const empId = req.empId;
        // Destructure the data from the request body
        const {
            farmerId,
            complainantName,
            contact,
            address,
            pin,
            authority,
            priority,
            company,
            complaintDetails,
            remark,
        } = req.body;
        if (!farmerId || !complainantName || !contact  || !authority || !priority || !company || !complaintDetails) {
            return res.status(400).json({ 
                success:false,
                message: 'All required fields must be provided.' 
            });
        }
        const trackingId = "T-"+ Date.now();
        const newComplaint = new Complaint({
            farmerId,
            complainantName,
            contact,
            address,
            pin,
            authority,
            priority,
            company,
            complaintDetails,
            remark,
            trackingId,
            created_By:empId
        });

        // Save the complaint to the database
        const savedComplaint = await newComplaint.save();
        // console.log(savedComplaint)
        if(savedComplaint){
            return res.status(201).json({ 
                success:true,
                message: `Complaint register successfully and complaint tracking Id is ${trackingId}`, 
                data: savedComplaint
            });
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

const showComplaint = async(req,res) =>{
    try {
        const {
            complaintId,
            saralId,
            trackingId,
            complainantName, 
            contact,
            address, 
            pin, 
            authority, 
            priority, 
            company, 
            stage,
            page,
            limit,
            startDate,
            endDate,
            specificDate
        } = req.query;
            let filters ={};
            if(saralId){
                const farmerData = await find(Farmer, {saralId:saralId} , "_id");
                filters.farmerId = farmerData[0]?._id;
            }
            if(trackingId) filters.trackingId = trackingId;
            if (complainantName) filters.complainantName = {$regex : complainantName , $options : 'i'}
            if (contact) filters.contact = contact;
            if (pin) filters.pin = pin;
            if (authority) filters.authority = {$regex : authority, options:'i'}
            if (priority) filters.priority = {$regex : priority, options :'i'}
            if (company) filters.company = {$regex : company, options :'i'}
            if (stage) filters.stage = stage;
            if(address) filters.address = { $regex : address , options : 'i'};
            if (specificDate) {
                filters.created_At = {
                    $gte: await startDateConvertor(specificDate),
                    $lte: await endDateConvertor(specificDate)    // Less than or equal to end of the day
                };
            }
            if (startDate && endDate) {
                filters.created_At = {
                    $gte: await startDateConvertor(startDate),
                    $lte: await endDateConvertor(endDate)
                };
            }
            if(complaintId) filters._id = new mongoose.Types.ObjectId(complaintId);
            const pages = parseInt(page);
            const limits = parseInt(limit);
            const skip = (pages - 1) * limits;
            const skipValue = (typeof skip === 'number' && !isNaN(skip)) ? skip : 0;
            const limitValue = (typeof limits === 'number' && !isNaN(limits)) ? limits : undefined;
            const complaintDetails = await Complaint.aggregate([
                {$match : filters},
                {
                    $lookup:{
                        from:'farmers',
                        localField:'farmerId',
                        foreignField:"_id",
                        as :'Farmer'
                    }
                },
                {
                    $lookup:{
                        from:'stages',
                        localField:'stage',
                        foreignField:'_id',
                        as:'Stage'
                    }
                },
                {
                    $lookup:{
                        from:'employees',
                        localField:'created_By',
                        foreignField:'_id',
                        as:'Employee'
                    }
                },
                {
                    $project:{
                        __v:0,
                        farmerId:0,
                        created_At:0,
                        updated_At:0,
                        created_By:0,
                        updated_By:0,
                        stage:0,
                        Farmer:{
                            _id:0,
                            __v:0,
                            created_At:0,
                            updated_At:0,
                            created_By:0,
                            updated_By:0
                        },
                        Stage:{
                            _id:0,
                            __v:0,
                            created_By:0,
                            updated_By:0,
                            created_At:0,
                            updated_At:0,
                            create_At:0
                        },
                        Employee:{
                            _id:0,
                            __v:0,
                            refreshToken:0,
                            password:0,
                            role:0,
                            create_At:0,
                            empId:0,
                            mobile:0
                        }
                    }
                },
                { $sort: { created_At: -1 } },
                { $skip: skipValue },       // Skip documents for pagination
                ...(limitValue !== undefined ? [{ $limit: limitValue }] : [])
            ]);
            if(complaintDetails){
                return res.status(200).json({
                    success:true,
                    data:complaintDetails
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
module.exports = {
    addFarmerByExcel,
    addFarmer,
    showFarmer,
    addComplaint,
    showComplaint
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