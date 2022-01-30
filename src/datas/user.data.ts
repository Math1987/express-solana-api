import mongoose, { ObjectId } from "mongoose" ;
let db = null ;

export type type = {
    address : string,
    pseudo? : string
};
export type typeInDB = type & {
    _id : ObjectId 
}

export const schema = new mongoose.Schema({
    address : { type : String, index : true, unique : true},
    pseudo : { type : String, required : false },
});
let model : mongoose.Model<type> ;

export const init = ( db_: mongoose.Connection ) => {
    db = db_ ;
    model = db.model('user', schema);
}
export const create = async ( datas : type ) : Promise<typeInDB> => {
    return await new model(datas).save();
}
export const readOne = async ( _id : ObjectId ) : Promise<typeInDB | null>  => {
    return await model.findOne({ _id }) ;
}
export const readOneByAddress = async ( address : string ) : Promise<typeInDB | null>  => {
    return await model.findOne({ address }) ;
}
export const updateOne = async ( _id : ObjectId, datas : { pseudo? : string } ) : Promise<typeInDB | null>  => {
    return await model.findOneAndUpdate({ _id }, { $set : {...datas} }, { returnOriginal : false });
}
export const removeOne = async ( _id : ObjectId ) : Promise<boolean>  => {
    await model.deleteOne({ _id }) ;
    return true ;
}