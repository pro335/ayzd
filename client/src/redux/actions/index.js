import axios from 'axios';
import config from '../../config/config';

axios.defaults.baseURL = config.api_url.httpUrl;

if (window.location.protocol == 'https:') {
    axios.defaults.baseURL = config.api_url.httpsUrl;
}

// auth action(s)
export const login = (userData) => {
    return axios.post("/api/auth/login", userData);
}

// category action(s)
export const addCategory = (data) => {
    return axios.put("/api/category/create", data);
}

export const allCategories = () => {
    return axios.post("/api/category/all");
}

export const updateCategory = (data) => {
    return axios.post("/api/category/update", data);
}

export const deleteCategory = (id) => {
    return axios.delete(`/api/category/delete/${id}`);
}

// chain action(s)
export const addChain = (data) => {
    return axios.put("/api/chain/create", data);
}

export const allChains = () => {
    return axios.post("/api/chain/all");
}

export const updateChain = (data) => {
    return axios.post("/api/chain/update", data);
}

export const deleteChain = (id) => {
    return axios.delete(`/api/chain/delete/${id}`);
}

// user action(s)
export const addUser = (data) => {
    return axios.put("/api/user/create", data);
}

export const allUsers = () => {
    return axios.post("/api/user/all");
}

export const updateUser = (data) => {
    return axios.post("/api/user/update", data);
}

export const deleteUser = (id) => {
    return axios.delete(`/api/user/delete/${id}`);
}

// newsfeedSource action(s)
export const addNewsfeedSource = (data) => {
    return axios.put("/api/newsfeedSource/create", data);
}

export const allNewsfeedSources = () => {
    return axios.post("/api/newsfeedSource/all");
}

export const updateNewsfeedSource = (data) => {
    return axios.post("/api/newsfeedSource/update", data);
}

export const deleteNewsfeedSource = (id) => {
    return axios.delete(`/api/newsfeedSource/delete/${id}`);
}

export const updateLivefeeds = () => {
    return axios.post("/api/newsfeedSource/updateLivefeeds");
}

// media action(s)
export const addMedia = (data) => {
    return axios.put("/api/media/create", data);
}

export const allMedias = () => {
    return axios.post("/api/media/all");
}

export const updateMedia = (data) => {
    return axios.post("/api/media/update", data);
}

export const deleteMedia = (id) => {
    return axios.delete(`/api/media/delete/${id}`);
}

export const findAndGenerateFileName = async (name) => {
    return await axios.post(`/api/media/findAndGenerateFileName/${name}`);
}

// project action(s)
export const addProject = (data) => {
    return axios.put("/api/project/create", data);
}

export const allProjects = () => {
    return axios.post("/api/project/all");
}

export const updateProject = (data) => {
    return axios.post("/api/project/update", data);
}

export const updateMainImage = (data) => {
    return axios.post("/api/project/updateMainImage", data);
}

export const createProjectMedia = (data) => {
    return axios.post("/api/project/createMedia", data);
}

export const updateProjectMedia = (data) => {
    return axios.post("/api/project/updateMedia", data);
}

export const deleteProjectMedia = (id, mediaId) => {
    return axios.delete(`/api/project/deleteMedia/${id}/${mediaId}`);
}

export const deleteProject = (id) => {
    return axios.delete(`/api/project/delete/${id}`);
}

export const createProjectGuide = (data) => {
    return axios.post("/api/project/createGuide", data);
}

export const updateProjectGuide = (data) => {
    return axios.post("/api/project/updateGuide", data);
}

export const deleteProjectGuide = (id, guideId) => {
    return axios.delete(`/api/project/deleteGuide/${id}/${guideId}`);
}

export const createProjectMember = (data) => {
    return axios.post("/api/project/createMember", data);
}

export const updateProjectMember = (data) => {
    return axios.post("/api/project/updateMember", data);
}

export const deleteProjectMember = (id, memberId) => {
    return axios.delete(`/api/project/deleteMember/${id}/${memberId}`);
}

export const getTrendingNFTs = (params) => {
    return axios.post(`/api/project/getTrendingNFTs`, params);
}

export const updateDiscordMembersForOneProject = (data) => {
    return axios.post("/api/project/updateDiscordMembersForOneProject", data);
}

export const updateTwitterMembersForOneProject = (data) => {
    return axios.post("/api/project/updateTwitterMembersForOneProject", data);
}

export const getProjectFromUniqueId = (data) => {
    return axios.post("/api/project/getProjectFromUniqueId", data);
}

// livefeed action(s)
export const addLivefeed = (data) => {
    return axios.put("/api/livefeed/create", data);
}

export const allLivefeeds = () => {
    return axios.post("/api/livefeed/all");
}

export const updateLivefeed = (data) => {
    return axios.post("/api/livefeed/update", data);
}

export const deleteLivefeed = (id) => {
    return axios.delete(`/api/livefeed/delete/${id}`);
}

// guide action(s)
export const allGuides = () => {
  return axios.post("/api/guide/all");
}

// get the specific guide from project_unique_id and guide_id
export const getGuideFromUniqueId = (data) => {
  return axios.post("/api/guide/getGuideFromUniqueId", data);
}


// Scrape data
export const fetchTopSales = () => {
    return axios.post("/api/getData/getTopSales");
}
export const fetchTopCollections = () => {
    return axios.post("/api/getData/getTopCollections");
}
export const fetchDaySales = () => {
    return axios.post("/api/getData/getSalesOfDay");
}
export const fetchGainersLoosers = () => {
    return axios.post("/api/getData/getGainersLoosers");
}
export const fetchTrading = () => {
    return axios.post("/api/getData/trading");
}
export const fetchBiggestSalesVolume = () => {
    return axios.post("/api/getData/getBiggestSalesVolume");
}
export const fetchTokensByMarketcap = () => {
    return axios.post("/api/getData/getTokensByMarketcap");
}


// authorization token action(s)
export const setAuthToken = token => {
    if(token) {
        axios.defaults.headers.common["Authorization"] = token;
    } else {
        //Delete auth header
        delete axios.defaults.headers.common["Authorization"];
    }
}