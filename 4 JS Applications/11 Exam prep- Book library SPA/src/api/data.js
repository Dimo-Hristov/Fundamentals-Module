import * as api from './api.js';
import page from '../../node_modules/page/page.mjs';

const user = api.getUser()


const endPoints = {
    getBooks: '/data/books?sortBy=_createdOn%20desc',
    addbook: '/data/books',
    details: '/data/books/',
    edit: '/data/books/',
    userBooks: `/data/books?where=_ownerId%3D%22${user ? user._id : null}%22&sortBy=_createdOn%20desc`,
    deleteBook: '/data/books/'
}

export const getAllBooks = () => {
    return api.get(endPoints.getBooks)
}

export const addNewBook = (data) => {
    return api.post(endPoints.addbook, data)
}

export const getDetails = (id) => {
    return api.get(endPoints.details + id)
}

export const editMovie = (data, id) => {
    return api.put(endPoints.edit + id, data)
}

export const getUserBooks = () => {
    return api.get(endPoints.userBooks)
}

export const deleteMovie = (ctx) => {
    const movieId = ctx.params.id;

    api.del(endPoints.deleteBook + movieId)
    page.redirect('/')
}
