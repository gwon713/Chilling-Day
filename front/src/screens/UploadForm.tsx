import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Image, Text } from 'react-native';
import { getTempStore } from 'stores/TempStore';

const UploadForm = observer(() => {
    const { upload } = getTempStore();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        upload().finally(() => {
            setLoading(false);
        });
    }, [upload]);

    if (isLoading) {
        return <></>;
    }

    return <Text>{isLoading ? 'loading' : 'done'}</Text>;
});

export default UploadForm;
