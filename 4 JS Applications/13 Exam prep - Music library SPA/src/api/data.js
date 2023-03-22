import * as api from './api.js';

const user = api.getUser()


const endPoints = {
    getAlbums: '/data/albums?sortBy=_createdOn%20desc',
    addbook: '/data/offers',
    details: '/data/offers/',
    edit: '/data/offers/',
    userBooks: `/data/books?where=_ownerId%3D%22${user ? user._id : null}%22&sortBy=_createdOn%20desc`,
    deleteOffer: '/data/offers/'
}

export const getAllAlbums = () => {
    return api.get(endPoints.getAlbums)
}

export const addNewOffer = (data) => {
    return api.post(endPoints.addbook, data)
}

export const getDetails = (id) => {
    return api.get(endPoints.details + id)
}

export const editOffer = (data, id) => {
    return api.put(endPoints.edit + id, data)
}

export const getUserBooks = () => {
    return api.get(endPoints.userBooks)
}

export const deleteOffer = (ctx) => {

    const confirmed = confirm('Are you sure you want to delete this offer');

    if (confirmed) {
        api.del(endPoints.deleteOffer + ctx.params.id)
            .then(() => {
                ctx.redirect('/dashboard')
            })
            .catch(err => alert(err.message))
    } else {
        return;
    }
}
