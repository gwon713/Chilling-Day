import axios from 'axios';
import CONFIG from 'constants/config';

const getUserInfo = async (userId: number) => {
    const { data } = await axios.get(`${CONFIG.API_URL}/user`, {
        params: {
            user_id: userId,
        },
    });

    return data;
};

export default getUserInfo;
