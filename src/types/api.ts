import { AxiosResponse } from 'axios'

export type Meta = {
    limit: number;
    page: number;
}

export type StandardApiResponse<T = any> = {
    success: boolean;
    status: number;
    message: string;
    data: T;
    meta?: Meta;
    errors?: Record<string, string>;
};

export type StandardAxiosResponse<T = any> = AxiosResponse<StandardApiResponse<T>>;
