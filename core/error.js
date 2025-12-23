export default class AppErrors{
    static handleServerError(error,res) {
    console.error(error);
    return res.status(500).json({message: 'Server Error'});
    }

    static handleClientError(statusCode,message,res){
        const message = message ?? "Client Error";
        const statusCode = statusCode ?? 400;
        res.status(statusCode).json({message: message});
    }
}



