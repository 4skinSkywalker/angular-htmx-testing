import { IUser, mem } from "../models/user.model";

export const find = (opts?: { name?: string }) => (opts?.name) ? mem.filter(u => u.name.toLowerCase().includes(opts.name?.toLocaleLowerCase() || "")) : mem;

export const create = (u: IUser) => (mem.push(u), mem);

export const deleteUser = (id: number) => {
    const found = mem.findIndex(u => u.id === Number(id));
    if (found < 0) {
        return;
    }
    mem.splice(found, 1);
    return mem;
};