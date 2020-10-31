module.exports = {
    rules: {
        proId: 'required',
        proName: 'required',    
        trademark: 'required',
        proType: 'required',
        description: 'required',
        rate: 'min:0|max:5',
        price: 'required'
    },
    rulesForModify: {
        id: 'required',
        rate: 'min:0|max:5'
    },
    productAttriName: {
        proId: 'Product Id',
        proName: 'Product name',
        trademark: ' Trademark',
        proType: 'Product type',
        description: 'Description',
        rate: 'Rate',
        price: 'Price'
    }
}