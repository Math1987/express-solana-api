import mongoose, { ObjectId } from "mongoose" ;
let db = null ;

export type type = {
    token : String,
    address : string,
    views : number
};
export type typeInDB = type & {
    _id : ObjectId 
}

export const schema = new mongoose.Schema({
    token : { type : String, index : true, unique : true},
    address : { type : String, required : false },
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
export const readOneByToken = async ( token : string ) : Promise<typeInDB | null>  => {
    return await model.findOne({ token }) ;
}
export const incrementViews = async ( token : string ) : Promise<typeInDB | null>  => {
    return await model.findOneAndUpdate({ token }, { $inc : { views : 1 } }, { returnOriginal : false });
}