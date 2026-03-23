export interface CurrentUserInterface {
    email: string;
    token: string;
    username: string;
    bio: string | null;
    image: string;
}

export interface AuthResponseInterface {
    user: CurrentUserInterface;
}
