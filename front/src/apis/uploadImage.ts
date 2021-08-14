import axios from 'axios';
import CONFIG from 'constants/config';

const uploadImage = async (userId: number, photoUrl) => {
    console.log('uploadImage');
    const formData = new FormData();
    formData.append('image', photoUrl, 'bb.jpg');
    // formData.append('image', { uri: photoUrl, name: 'bb.jpg' });
    // const { data } = await axios.post(`${CONFIG.API_URL}/upload`, formData, {
    //     params: {
    //         user_id: userId,
    //     },
    //     data: ㅇ
    //         image_childay: 2,
    //     },
    //     headers: {
    //         'Content-Type': 'multipart/form-data',
    //         Accept: 'application/json',
    //     },
    // });

    // return data;
};

export default uploadImage;
