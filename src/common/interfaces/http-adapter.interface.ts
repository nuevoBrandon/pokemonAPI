export interface IHttpadapter{
    get<T>(url:string): Promise<T>
}