import mongoose, { ObjectId } from "mongoose" ;
let db = null ;

export type type = {
    address : string,
    pseudo? : string,
    sol? : number
};
export type typeInDB = type & {
    _id : ObjectId 
}

export const schema = new mongoose.Schema({
    address : { type : String, index : true, unique : true},
    pseudo : { type : String, required : false },
    sol : { type : Number, required : false},
});
let model : mongoose.Model<type> ;

export const init = ( db_: mongoose.Connection ) => {
    db = db_ ;
    model = db.model('example', schema);
}
export const create = async ( datas : type ) : Promise<typeInDB> => {
    return await new model(datas).save();
}
export const readOne = async ( _id : ObjectId ) : Promise<typeInDB | null>  => {
    return await model.findOne({ _id }) ;
}