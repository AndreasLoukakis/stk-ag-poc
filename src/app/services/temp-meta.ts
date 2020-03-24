import { PreFieldConfig } from './../models';

export const tempMeta: {[prop: string]: PreFieldConfig} = {
    branch: {
        title: 'Branch',
        x_updateState: true,
        required: true,
        valueProp: 'id',
        name: 'branch',
        x_isLookup: true
    },
    branchOther: {
        title: 'Branch Other',
        x_updateState: true,
        required: true,
        valueProp: 'id',
        name: 'branchOther',
        x_isLookup: true
    },
    channel: {
        title: 'Channel',
        x_updateState: true,
        required: true,
        valueProp: 'id',
        name: 'channel',
        x_isLookup: true
    },
    loanType: {
        title: 'Loan Type',
        x_updateState: true,
        required: true,
        valueProp: 'id',
        name: 'loanType',
        x_isLookup: true
    },
    consumerProduct: {
        title: 'Consumer Product',
        x_updateState: true,
        required: true,
        valueProp: 'id',
        name: 'consumerProduct',
    },
    productCategory: {
        title: 'Product Category',
        x_updateState: true,
        required: true,
        valueProp: 'id',
        name: 'productCategory',
        x_isLookup: true
    },
    factoryProduct: {
        title: 'Factory Product',
        x_updateState: true,
        required: true,
        valueProp: 'id',
        name: 'factoryProduct',
        x_isLookup: true
    }
};
