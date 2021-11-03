
export function randomString( username : any, size = 4) {  
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < size; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return username+result;
}