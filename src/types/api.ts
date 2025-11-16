import { AxiosResponse } from 'axios'

export type Meta = {
    limit: number;
    page: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type StandardApiResponse<T = any> = {
    success: boolean;
    status: number;
    message: string;
    data: T;
    meta?: Meta;
    errors?: Record<string, string>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type StandardAxiosResponse<T = any> = AxiosResponse<StandardApiResponse<T>>;
