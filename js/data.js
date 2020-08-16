import { beginRequest, endRequest, showError } from './notifications.js';
import API from './api.js';

const endpoints = {
    RECIPES: 'data/recipes',
    RECIPE_BY_ID: 'data/recipes/'
};

const api = new API(
    '475F2A3C-E914-011F-FF8B-598CB29EDE00',
    '606431FD-E11B-4012-9A22-5622DA875276',
    beginRequest,
    endRequest);

export const login = api.login.bind(api)
export const register = api.register.bind(api)
export const logout = api.logout.bind(api)


export async function getAll() {
    return api.get(endpoints.RECIPES);
}

export async function createRecipe(recipe) {
    return api.post(endpoints.RECIPES, recipe);
}

export async function getRecipeById(id) {
    return api.get(endpoints.RECIPE_BY_ID + id);
}

export async function editRecipe(id, recipe) {
    return api.put(endpoints.RECIPE_BY_ID + id, recipe);
}

export async function likeRecipe(id) {
    const recipe = await getRecipeById(id);
    const likes = Number(recipe.likes) + 1;
    return api.put(endpoints.RECIPE_BY_ID + id, { likes: likes });
}

export async function deleteRecipe(id) {
    return api.delete(endpoints.RECIPE_BY_ID + id);
}

export function checkResult(result) {
    if (result.hasOwnProperty('errorData')) {
        const error = new Error();
        Object.assign(error, result)
        throw error;
    }
}