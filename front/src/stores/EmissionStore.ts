import { observable } from 'mobx';
import memoize from 'lodash/memoize';
import getEmission from 'apis/getEmission';

const createEmissionStore = () => {
    const $emissionPercent = observable.box(0);

    const $public = observable({
        async getEmission(userId, ingredients, thisChillingDay) {
            const body = {
                image_childay: thisChillingDay,
                food_name: '샐러드',
                food_person: 200,
                food_data: ingredients.map((ingredient) => ({
                    food_id: ingredient.id,
                    food_name: ingredient.name,
                    food_size: ingredient.size,
                    food_emissions: ingredient.emissions,
                })),
            };

            const { emission_persent } = await getEmission(userId, body);

            $emissionPercent.set(emission_persent);
        },

        get emissionPercent() {
            return $emissionPercent.get();
        },
    });

    return $public;
};

export const getEmissionStore = memoize(createEmissionStore);
