import { ExtendedFieldConfig } from './../stk/interfaces';

export const tempMeta: { [key: string]: {[key: string]: ExtendedFieldConfig} } = {
    // branch: {
    //     branch: {
    //         title: 'Branch',
    //         required: true,
    //         valueProp: 'id',
    //         descriptionProp: 'description',
    //         properties: ['id', 'code', 'description', 'disabled'],
    //         name: 'branch',
    //         x_isLookup: true
    //     }
    // },
    // branchOther: {
    //     branchOther: {
    //         title: 'Branch Other',
    //         required: true,
    //         valueProp: 'id',
    //         descriptionProp: 'description',
    //         properties: ['id', 'code', 'description', 'disabled'],
    //         name: 'branchOther',
    //         x_isLookup: true
    //     }
    // },
    // channel: {
    //     channel: {
    //         title: 'Channel',
    //         required: true,
    //         valueProp: 'id',
    //         descriptionProp: 'name',
    //         properties: ['id', 'name'],
    //         name: 'channel',
    //         x_isLookup: true
    //     }
    // },
    // loanType: {
    //     loanType: {
    //         title: 'Loan Type',
    //         x_updateState: true,
    //         required: true,
    //         valueProp: 'id',
    //         descriptionProp: 'name',
    //         resources: ['consumerProduct'],
    //         properties: ['id', 'name'],
    //         name: 'loanType',
    //         x_isLookup: true
    //     }
    // },
    // consumerProduct: {
    //     consumerProduct: {
    //         title: 'Consumer Product',
    //         x_updateState: true,
    //         required: true,
    //         valueProp: 'id',
    //         resources: ['productCategory', 'factoryProduct', 'currency'],
    //         properties: ['id'],
    //         name: 'consumerProduct',
    //     }
    // },
    // mortgageProduct: {
    //     mortgageProduct: {
    //         title: 'Mortgage Product',
    //         x_updateState: true,
    //         required: true,
    //         valueProp: 'id',
    //         resources: ['productCategory', 'factoryProduct', 'currency'],
    //         properties: ['id'],
    //         name: 'consumerProduct',
    //     }
    // },
    // productCategory: {
    //     productCategory: {
    //         title: 'Product Category',
    //         x_updateState: true,
    //         required: true,
    //         valueProp: 'id',
    //         descriptionProp: 'name',
    //         properties: ['id', 'code', 'description', 'disabled'],
    //         resources: ['loanType'],
    //         name: 'productCategory',
    //         x_isLookup: true
    //     }
    // },
    // factoryProduct: {
    //     factoryProduct: {
    //         title: 'Factory Product',
    //         x_updateState: true,
    //         required: true,
    //         valueProp: 'id',
    //         descriptionProp: 'description',
    //         properties: ['id', 'code', 'description', 'disabled', 'duration'],
    //         resources: ['loanType', 'currency'],
    //         name: 'factoryProduct',
    //         x_isLookup: true
    //     }
    // },
    // application: {
    //     get branch() { return this.branch.branch; },
    //     get channel() { return this.channel; }
    // }
};
