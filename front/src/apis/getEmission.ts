import axios from 'axios';
import CONFIG from 'constants/config';

const getEmission = async (userId: number, body) => {
    const { data } = await axios.post(`${CONFIG.API_URL}/food/emission`, body, {
        params: {
            user_id: userId,
        },
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return data;
};

export default getEmission;
