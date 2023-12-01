import { instance } from "./instance"
const postUser = async (params) => {
    try {
        const query = new URLSearchParams({ email: params.email }).toString()
        const user = await instance.get(`users?${query}`)
        if (user.data[0]?.id) {
            throw { message: "Пользователь уже существует" };
        } else {
            const { data } = await instance.post('users', params)
            return data
        }
    } catch (error) {
        throw error;
    }
}

const getUser = async (params) => {
    try {
        const query = new URLSearchParams(params).toString();
        const { data } = await instance.get(`users?${query}`);
        if (!data[0]?.id) {
            throw { message: "Неверный пароль или email" }
        }
        return data[0];
    } catch (error) {
        throw error;
    }
}

const getNotes = async (params) => {
    try {
        const query = new URLSearchParams(params).toString();
        const { data } = await instance.get(`notes?${query}`);
        return data;
    } catch (error) {
        throw error;
    }
}

const getNote = async (params) => {
    try {
        const query = new URLSearchParams(params).toString()
        const { data } = await instance.get(`notes?${query}`);
        return data[0]
    } catch (error) {
        throw error;
    }
}

const deleteNote = async (id) => {
    try {
        const { data } = await instance.delete(`notes/${id}`);
        return data
    } catch (error) {
        throw error;
    }
}

const putNote = async ({ title, id, content, userId }) => {
    try {
        const { data } = await instance.put(`notes/${id}`, { title, content, userId, createdAt: Date.now() });
        return data;
    } catch (error) {
        throw error
    }
}

const postNote = async ({ title, content, userId }) => {
    try {
        const { data } = await instance.post(`notes`, { title, content, userId, createdAt: Date.now() });
        return data;
    } catch (error) {
        throw error
    }
}
export const Api = { postUser, getUser, getNotes, getNote, deleteNote, putNote, postNote }