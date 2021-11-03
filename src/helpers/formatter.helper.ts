interface Response {
    msg:string,
    data: any,
    errors: any
}

export function successMsg(msg:string, data:any) : Response {
    return {
        msg: msg,
        data: data,
        errors: ""
    };
}

export function errorMsg(msg:string, err:any) : Response {
    return {
        msg: msg,
        data: "",
        errors: err
    };
}