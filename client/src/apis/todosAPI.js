import api from "./config"

export const todosAPI = {
    createToDo: async ({ priority, ...input }) => {
        const { data } = await api.request({
            url: "/todo",
            method: "POST",
            data: { ...input, priority: +priority }
        })

        return data.ToDo
    },
    updateToDo: async (id, input) => {
        const { data } = await api.request({
            url: `/todo/${id}`,
            method: "PUT",
            data: input
        })

        return data
    },
    deleteToDo: async id => {
        const { data } = await api.request({
            url: `/todo/${id}`,
            method: "DELETE",
        })

        return data
    },
    getToDos: async () => {
        const { data } = await api.request({
            url: `/todo/all`,
            method: "GET"
        })

        return data.ToDos
    }
}