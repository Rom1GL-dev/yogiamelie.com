export interface TNavbar {
    label: string;
    href: string;
    subItems?: TNavbar[];
    type?: string;
}