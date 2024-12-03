const find = async(modelNames, filters, select) =>{
    try {
        const farmerResponse = await modelNames.find(filters).select(select).lean();
        return farmerResponse;
    } catch (error) {
        return false;
    }
}
module.exports = find;