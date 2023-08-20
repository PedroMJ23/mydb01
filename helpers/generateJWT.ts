import jwt from "jsonwebtoken";

export const generateJWT = (id: string = ""): Promise<string> => {
  return new Promise((res, rej) => {
    const payload = { id };
    jwt.sign(payload, process.env.SECRETPASS as string, {
      expiresIn: "1h",
    },
    (err: Error | null, token: string | undefined)=>{
        if(err){
            console.log(err)
            rej("Can't generate token!")
        }else{
            res(token as string)
        }
    }
    );
  });
};





