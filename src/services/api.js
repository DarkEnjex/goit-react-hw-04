import axios from 'axios';

const ACCESS_KEY = "w74FKc9WKNIzcQgSvRRx1PCr6n6UTF9xyEF812o9DW4"

export const fetchImages = async (query, page, perPage) => {
    try {
        const response = await axios.get(`https://api.unsplash.com/search/photos`, {
            params: {
                query: query,
                client_id: ACCESS_KEY,
                page: page,
                per_page: perPage,
                timestamp: new Date().getTime()
            }
        });
        return {
            results: response.data.results,
            total: response.data.total,
        };
    } catch (error) {
        console.error(error);
        return { results: [], total: 0 };
    }
};


