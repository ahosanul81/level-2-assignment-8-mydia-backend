"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryBuilder = void 0;
const queryBuilder = (queryFilter, defaultFilter) => {
    var _a;
    let andCondtion = [];
    if (Object.values(queryFilter).some((value) => value !== undefined)) {
        const orCondition = (_a = Object.keys(queryFilter)) === null || _a === void 0 ? void 0 : _a.map((key) => {
            const typedKey = key; //type issue solved by gpt
            const value = queryFilter[typedKey];
            if (key === "category") {
                return {
                    category: {
                        categoryName: {
                            equals: value,
                        },
                    },
                };
            }
            if (key === "isPaid") {
                return {
                    isPaid: {
                        equals: value === "true" ? true : false,
                    },
                };
            }
            if (key === "isDeleted") {
                return {
                    isDeleted: {
                        equals: value === "true" ? true : false,
                    },
                };
            }
            return {
                [key]: {
                    equals: value,
                },
            };
        });
        andCondtion.push({ AND: orCondition });
    }
    else {
        andCondtion.push(defaultFilter);
    }
    return andCondtion;
};
exports.queryBuilder = queryBuilder;
