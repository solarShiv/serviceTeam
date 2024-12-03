const insertMany = async (modelName , data) =>{
    // console.log("MN",modelName)
    try {
        const insertResponse = await modelName.insertMany(data);
        if(insertResponse) return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}
module.exports = insertMany;