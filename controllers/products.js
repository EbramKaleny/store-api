import product from "../models/product.js"

const getAllProductsStatic = async (req,res)=>{
    const products = await product.find({})
    res.status(200).json({products})
}

const getAllProducts = async (req,res) => {
    const {name,featured,company,sort, fields, numericFilters} = req.query
    const queryObject = {}
    if(featured){
        queryObject.featured = featured === 'true' ? true : false
    }
    if(company){
        queryObject.company = company
    }
    if(name){
        queryObject.name = {$regex: name, $options: 'i'}
    }
    if(numericFilters){
        const operatorMap = {
            '>' : '$gt',
            '>=' : '$gte',
            '=' : '$eq',
            '<' : '$lt',
            '<=' : '$lte'
        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g
        let filters = numericFilters.replace(regEx, (match)=>`-${operatorMap[match]}-`)
        const options = ['price','rating']
        filters = filters.split(',').forEach(item => {
            const [field,operator,value] = item.split('-')
            if(options.includes(field)){
                queryObject[field] = {[operator]:Number(value)}
            }
        });
    }
    // console.log(queryObject)
    let result = product.find(queryObject)
    if(sort){
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    }else{
        result = result.sort('createdAt')
    }
    if(fields){
        const fieldList = fields.split(',').join(' ')
        result = result.select(fieldList)
    }
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page-1) * limit
    result = result.skip(skip).limit(limit)
    const products = await result
    if(products.length === 0){
       return res.status(404).send('there is no more products')
    }
    res.status(200).json({products, nbHits: products.length})
}

export {
    getAllProducts,
    getAllProductsStatic
}