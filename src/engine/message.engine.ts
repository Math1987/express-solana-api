export const getMessageSample = async ( code? : number ) : Promise<string> => {
    if ( code === 1 ){
        return "I want to update my datas in this website." ;
    }else if ( code === 2 ){
        return "I want to delete my account on this website." ;
    }
    return "I am the owner of this address." ;
}