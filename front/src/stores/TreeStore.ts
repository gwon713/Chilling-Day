import { observable } from 'mobx';
import memoize from 'lodash/memoize';
import getTreeInfo from 'apis/getTreeInfo';

const createTreeStore = () => {
    const $tree = observable.box({
        totalCountOfTree: 0,
        treeProgress: 0,
        remainingDaysForComplete: 0,
    });

    const $public = observable({
        async getTreeInfo(userId) {
            const {
                user_tree: { total_tree: totalCountOfTree, tree_progress: treeProgress, tree_remaining: remainingDaysForComplete },
            } = await getTreeInfo(userId);

            $tree.set({
                totalCountOfTree,
                treeProgress,
                remainingDaysForComplete,
            });
        },

        get totalCountOfTree() {
            return $tree.get().totalCountOfTree;
        },

        get treeProgress() {
            return $tree.get().treeProgress;
        },

        get remainingDaysForComplete() {
            return $tree.get().remainingDaysForComplete;
        },
    });

    return $public;
};

export const getTreeStore = memoize(createTreeStore);
