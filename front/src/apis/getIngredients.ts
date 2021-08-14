import axios from 'axios';
import CONFIG from 'constants/config';

const getIngredients = async () => {
    const { data } = await axios.get(`${CONFIG.API_URL}/food/datas`);

    return data;
};

export default getIngredients;
