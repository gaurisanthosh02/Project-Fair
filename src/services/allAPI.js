import commonAPI from "./commonAPI.JS"
import SERVER_URL from "./serverURL"

// registerAPI called by auth component
export const registerAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVER_URL}/register`, reqBody)
}

// loginAPI called by auth component (req send chyan ullond we used post method)
export const loginAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVER_URL}/login`, reqBody)
}

// addProjectAPI called by add component when user clicks add button
export const addProjectAPI = async (reqBody, reqHeader) => {
    return await commonAPI("POST", `${SERVER_URL}/add-project`, reqBody, reqHeader)
}

// addHomeProjectAPI called by home component when page loaded
export const addHomeProjectAPI = async () => {
    return await commonAPI("GET",`${SERVER_URL}/home-project`,{})
}

// allProjectAPI called by project component when page loaded
export const allProjectAPI = async (searchKey, reqHeader) => {
    return await commonAPI("GET",`${SERVER_URL}/all-projects?search=${searchKey}`,{},reqHeader)
}

// userProjectAPI called by project component when page loaded
export const userProjectAPI = async (reqHeader) => {
    return await commonAPI("GET",`${SERVER_URL}/user-projects`,{},reqHeader)
}

// updateProjectAPI called by project component when page loaded
export const updateProjectAPI = async (id, reqBody, reqHeader) => {
    return await commonAPI("PUT",`${SERVER_URL}/projects/${id}/edit`, reqBody, reqHeader)
}

// userDeleteProjectAPI called by view component when user clicks on delete button
export const userDeleteProjectAPI = async (id, reqHeader) => {
    return await commonAPI("DELETE",`${SERVER_URL}/project/${id}/remove`, {}, reqHeader)
}

// updateDeleteProjectAPI called by profile component when user clicks on delete button
export const updateUserProfileAPI = async (reqBody, reqHeader) => {
    return await commonAPI("PUT",`${SERVER_URL}/project/edit-user`, reqBody, reqHeader)
}