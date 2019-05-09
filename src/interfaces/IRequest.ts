import { Request } from "express";

export default interface IRequest extends Request {
    instance: string | null | undefined;
}
