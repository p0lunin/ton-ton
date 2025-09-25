"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeExtendedAction = storeExtendedAction;
const core_1 = require("@ton/core");
function storeExtendedAction(action) {
    return (builder) => {
        switch (action.type) {
            case 'sendMsg':
                builder.storeUint(0, 8);
                for (let m of action.messages) {
                    builder.storeUint(action.sendMode ?? core_1.SendMode.NONE, 8);
                    builder.storeRef((0, core_1.beginCell)().store((0, core_1.storeMessageRelaxed)(m)));
                }
                break;
            case 'addAndDeployPlugin':
                builder.storeUint(1, 8);
                builder.storeInt(action.workchain, 8);
                builder.storeCoins(action.forwardAmount);
                builder.storeRef((0, core_1.beginCell)().store((0, core_1.storeStateInit)(action.stateInit)));
                builder.storeRef(action.body);
                break;
            case 'addPlugin':
                builder.storeUint(2, 8);
                builder.storeInt(action.address.workChain, 8);
                builder.storeBuffer(action.address.hash);
                builder.storeCoins(action.forwardAmount);
                builder.storeUint(action.queryId ?? 0n, 64);
                break;
            case 'removePlugin':
                builder.storeUint(3, 8);
                builder.storeInt(action.address.workChain, 8);
                builder.storeBuffer(action.address.hash);
                builder.storeCoins(action.forwardAmount);
                builder.storeUint(action.queryId ?? 0n, 64);
                break;
            default:
                throw new Error(`Unsupported plugin action`);
        }
    };
}
