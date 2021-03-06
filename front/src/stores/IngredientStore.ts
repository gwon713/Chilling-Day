import { observable } from 'mobx';
import memoize from 'lodash/memoize';
import getIngredients from 'apis/getIngredients';

type Ingredient = {
    id: number;
    name: string;
    size: number;
    emissions: number;
};
const createIngredientStore = () => {
    const $ingredients = observable.box<Ingredient[]>([]);

    const $public = observable({
        async getIngredients() {
            const { food_data } = await getIngredients();

            const ingredients = food_data.map(({ food_id, food_name, food_size, food_emissions }) => ({
                id: food_id,
                name: food_name,
                size: food_size,
                emissions: food_emissions,
            }));

            $ingredients.set(ingredients);
        },

        get ingredients(): Ingredient[] {
            return $ingredients.get();
        },
    });

    return $public;
};

export const getIngredientStore = memoize(createIngredientStore);
