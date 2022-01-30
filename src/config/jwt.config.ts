import jwt from "jsonwebtoken" ;
const secret = "74c1ce27-c663-4e6e-b9a9-aa726652dcd2" ;


export const createToken = ( datas : any ) => {
    return jwt.sign(datas, secret);
}
export const readToken = ( token : string ) : Promise<any> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, function(err, decoded) {
            if (decoded) {
                resolve(decoded);
            }else{
                reject(err);
            }
        });
    });

}