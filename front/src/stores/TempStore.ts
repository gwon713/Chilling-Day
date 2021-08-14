import { observable } from 'mobx';
import memoize from 'lodash/memoize';
import uploadImage from 'apis/uploadImage';

const createTempStore = () => {
    const $photoUrl = observable.box('');

    const $public = observable({
        get photoUrl() {
            return $photoUrl.get();
        },

        setPhotoUrl(photoUrl) {
            $photoUrl.set(photoUrl);
        },

        async upload(userId) {
            const result = await uploadImage(userId, $public.photoUrl);
            console.log({ result });
        },
    });

    return $public;
};

export const getTempStore = memoize(createTempStore);
