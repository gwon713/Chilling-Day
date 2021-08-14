import axios from 'axios';
import CONFIG from 'constants/config';

const getTreeInfo = async (userId: number) => {
    const { data } = await axios.get(`${CONFIG.API_URL}/lending`, {
        params: {
            user_id: userId,
        },
    });

    return data;
};

export default getTreeInfo;
