import mongoose, { ObjectId } from "mongoose" ;
let db = null ;

export type type = {
    cookie_id : String,
    cookie_hash : String,
    address? : string,
    isAuth : boolean,
    views : number
};
export type typeInDB = type & {
    _id : ObjectId 
}

export const schema = new mongoose.Schema({
    cookie_id : { type : String, index : true, unique : true},
    cookie_hash : { type : String, index : true},
    address : { type : String, required : false },
    isAuth : { type : Boolean },
    views : { type : Number }
});
let model : mongoose.Model<type> ;

export const init = ( db_: mongoose.Connection ) => {
    db = db_ ;
    model = db.model('session', schema);
}
export const create = async ( datas : type ) : Promise<typeInDB> => {
    return await new model(datas).save();
}
export const readOne = async ( _id : ObjectId ) : Promise<typeInDB | null>  => {
    return await model.findOne({ _id }) ;
}
export const readOneByHash = async ( hash : string ) : Promise<typeInDB | null>  => {
    return await model.findOne({ cookie_hash : hash }) ;
}
export const incrementViews = async ( cookie_id : string ) : Promise<typeInDB | null>  => {
    return await model.findOneAndUpdate({ cookie_id }, { $inc : { views : 1 } }, { returnOriginal : false });
}
export const updateOneById = async ( cookie_id : string, datas : { pseudo? : string } ) : Promise<typeInDB | null>  => {
    return await model.findOneAndUpdate({ cookie_id }, { $set : {...datas} }, { returnOriginal : false });
}
export const removeOne = async ( _id : ObjectId ) : Promise<boolean>  => {
    await model.deleteOne({ _id }) ;
    return true ;
}