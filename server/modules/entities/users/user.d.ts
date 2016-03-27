export declare class User {
    private _data;
    data: any;
    constructor(data: any);
    static findOne(query: any, queryParams: any): any;
    static createOne(fname: any, lname: any, email: any, password: any): any;
    static auth(email: any, password: any): any;
    static generateHash(password: any): any;
}
