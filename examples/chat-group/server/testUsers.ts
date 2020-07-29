import {IUser} from "./interfaces";

export const testUsers: IUser[] = [
    {
        id: "1",
        name: "Стэнли Кубрик",
        avatar: {
            url: "images/stan.jpg"
        },
        lastLogin: new Date(1990, 2, 7),
        lastLogout: new Date(1999, 2, 7)
    },
    {
        id: "2",
        name: "Джеффри Ансуорт",
        avatar: {
            url: "images/unsworth.jpg"
        },
        lastLogin: new Date(1970, 2, 7),
        lastLogout: new Date(1978, 9, 28)
    },
    {
        id: "3",
        name: "Кир Дуллеа",
        avatar: {
            url: "images/keir.jpg"
        },
        lastLogin: new Date(1960, 0, 1)
    },
    {
        id: "4",
        name: "Хезер Даунхэм",
        avatar: {
            url: "images/downham.jpg"
        },
        lastLogin: new Date(1960, 0, 1)
    },
    {
        id: "5",
        name: "Маргарет Тайзэк",
        avatar: {
            url: "images/margaret.jpg"
        },
        lastLogin: new Date(1960, 0, 1),
        lastLogout: new Date(2011, 5, 25)
    },
    {
        id: "6",
        name: "Уильям Сильвестр",
        lastLogin: new Date(1960, 0, 1)
    },
    {
        id: "7",
        name: "Дэниэл Риктер",
        lastLogin: new Date(1960, 0, 1)
    },
    {
        id: "8",
        name: "Леонард Росситер",
        lastLogin: new Date(1960, 0, 1)
    },
    {
        id: "9",
        name: "Роберт Битти",
        lastLogin: new Date(1960, 0, 1)
    }
    
];