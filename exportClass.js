function Cart(){
    this.items=[]
}

Cart.prototype.addItem=function(name,price){
    return this.items.push({
        name1:name,
        price1:price
    })
}

Cart.prototype.total=function(){
    return this.items.reduce(function(total,b){
        return total+b.price1
    },0)
}

module.exports=Cart