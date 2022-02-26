import mongoose, { ObjectId } from "mongoose" ;
let db = null ;

export type type = {
    address : string,
    message : string
};
export type typeInDB = type & {
    _id : ObjectId 
}

export const schema = new mongoose.Schema({
    address : { type : String, index : true, sparse : true},
    message : { type : String },
});
let model : mongoose.Model<type> ;

export const init = ( db_: mongoose.Connection ) => {
    db = db_ ;
    model = db.model('message', schema);
}
export const create = async ( datas : type ) : Promise<typeInDB> => {
    return await new model(datas).save();
}
export const readOne = async ( _id : ObjectId ) : Promise<typeInDB | null>  => {
    return await model.findOne({ _id }) ;
}
export const readOneByDatas = async ( datas : any) : Promise<typeInDB | null> => {
    return await model.findOne(datas) ;
}
export const readByAddress = async ( address : string ) : Promise<any[]>  => {
    return await model.find({ address }) ;
}
export const removeOne = async ( _id : ObjectId ) : Promise<boolean>  => {
    await model.deleteOne({ _id }) ;
    return true ;
}