import { observable } from 'mobx';
import memoize from 'lodash/memoize';
import getUserInfo from 'apis/getUserInfo';
import { getDay } from 'date-fns';

const createTreeStore = () => {
    const $user = observable.box<{
        id: null | number;
        username: string;
        email: string;
        level: number;
        totalChillingDay: number;
        chillingDays: number[];
    }>({
        id: null,
        username: '',
        email: '',
        level: 1,
        totalChillingDay: 0,
        chillingDays: [],
    });

    const $public = observable({
        async getUser(userId) {
            const {
                user_childay_cnt: totalChillingDay,
                user_chilling_day: chillingDays,
                user_email: email,
                user_id: id,
                user_level: level,
                user_name: username,
            } = await getUserInfo(userId);

            const user = {
                id,
                username,
                email,
                level,
                totalChillingDay,
                chillingDays: [
                    chillingDays.chil_day_sun,
                    chillingDays.chil_day_mon,
                    chillingDays.chil_day_tue,
                    chillingDays.chil_day_wed,
                    chillingDays.chil_day_thu,
                    chillingDays.chil_day_fri,
                    chillingDays.chil_day_sat,
                ],
            };

            $user.set(user);

            return user;
        },

        get userId() {
            return $user.get().id;
        },

        get username() {
            return $user.get().username;
        },

        get totalChillingDay() {
            return $user.get().totalChillingDay;
        },

        get isChillingDay() {
            const chillingDays = $user.get().chillingDays;
            const day = getDay(new Date());

            return chillingDays[day];
        },

        get remainingDaysUntilChilling() {
            const chillingDays = $user.get().chillingDays;
            const day = getDay(new Date());

            let remainingDays = 0;
            let index = day;

            while (1) {
                if (chillingDays[index % chillingDays.length]) {
                    break;
                }

                index += 1;
                remainingDays += 1;

                if (remainingDays >= 100) {
                    break;
                }
            }

            return remainingDays;
        },
    });

    return $public;
};

export const getUserStore = memoize(createTreeStore);
