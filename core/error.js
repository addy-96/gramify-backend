// export class ValidationError extends Error {
//     constructor(message,fields){
//         super(message);
//         this.name = 'ValidationError';
//         this.field=fields;
//     }
// } 

export default class AppErrors{
    static handleServerError(error,res) {
        console.error(error);
        return res.status(500).json({msg: 'Server Error'});
    }

    static handleClientError(statusCode,message,res){
        message = message ?? "Client Error";
        statusCode = statusCode ?? 400;
        res.status(statusCode).json({msg: message});
    }
}



