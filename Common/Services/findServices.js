const findServices = async (model, skip, limit, search, fields) => {
    try {
        let data ;
        if(search){
            const columns =[
                ...fields.map((field)=>{
                    return {[field]:{$regex:search}}

                })
            ]
            data = await model.find({$or:columns}).skip(skip).limit(limit)
        }else{
            data = await model.find({}).skip(skip).limit(limit) 
        }
        return data;
    } catch (error) {
        return error;
    }
}


module.exports = findServices