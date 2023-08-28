import { Request, Response, NextFunction } from "express";
import { Result, validationResult, ValidationError } from "express-validator";

export const recolectarErrores = (req: Request, res: Response, next: NextFunction): void =>{

    const errores: Result<ValidationError> = validationResult(req);
/*
Alternativa:
    if(!errores.isEmpty){
        res.status(400).json(errores)
    }else{
        next()
    }
    */
   if(errores.isEmpty()){
    next()
   }else{
    res.status(400).json(errores)
   }


}
