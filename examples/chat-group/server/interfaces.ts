
export interface IImage {
    url: string;
}

export interface IChatGroup {
    name: string;
    avatar?: IImage;
    usersIds: string[];
}

export interface IUser {
    id: string;
    name: string;
    avatar?: IImage;
    lastLogin?: Date;
    lastLogout?: Date;
}
