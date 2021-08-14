import axios from 'axios';
import CONFIG from 'constants/config';
import RNFetchBlob from 'rn-fetch-blob';


const uploadImage = async (userId: number, photoUrl) => {
    console.log('uploadImage');
    const formData = new FormData();
    formData.append('image', photoUrl, 'bb.jpg');

    // const base64ToBlob = async (encoded) => {
    //     const url = `data:image/jpg;base64,${encoded}`;
    //     const res = await fetch(url);
    //     const blob = await res?.blob();
    //     return blob;
    // }

    RNFetchBlob.fetch(
        'POST',
        `${CONFIG.API_URL}/upload`, {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json'
    }, [
        JSON.stringify({ user_id: userId }),
        { name: 'bb.jpg', filename: 'bb.png', data: photoUrl }
    ]
    ).then((res) => {
        console.log(res);
    }).catch((err) => console.log(err));

    // formData.append('image', { uri: photoUrl, name: 'bb.jpg' });
    // const { data } = await axios.post(`${CONFIG.API_URL}/upload`, formData, {
    //     params: {
    //         user_id: userId,
    //     },
    //     data: 
    //         image_childay: 2,
    //     },
    //     headers: {
    //         'Content-Type': 'multipart/form-data',
    //         Accept: 'application/json',
    //     },
    // });

    //return data;
};

export default uploadImage;
