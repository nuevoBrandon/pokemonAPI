import axios,{ AxiosInstance } from "axios";
import { IHttpadapter } from "../interfaces/http-adapter.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
 export class AxiosAdapter implements IHttpadapter{
     private  axios: AxiosInstance = axios
     async get<T>(url: string): Promise<T> {
         try {
            const  {data} = await this.axios.get<T>(url)
            return  data;
         } catch (error) {
            throw new  Error("This error - check log")
         }
     }

 }