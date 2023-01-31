import fs from "fs";

class ProductManager{
  constructor(path){
    this.products = [];
    this.path = path;
  }
  loadDB(){
    if(fs.existsSync(this.path)){
      this.products = JSON.parse(fs.readFileSync(this.path))
    }
  }
  addProduct(title, description, price, thumbnail, code, stock){
    this.loadDB()
    const repeatedProduct = this.products.some(product => product.code === code)
    if(repeatedProduct === false && title && description && price && thumbnail && stock){
      this.products.push({
        id: Date.now(),
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock
      });
      fs.writeFileSync(this.path, JSON.stringify(this.products))
      return "Product Added"
    }else{
      return "Duplicated product or wrong arguments"
    }
  }
  getProducts(){
    return this.products
  }
  getProductById(id){
    this.loadDB()
    const productExists = this.products.find(product => product.id === id)
    if (productExists){
      return productExists
    }else{
      return `Failed to get Product, Product ${id} was not found`
    }
  }
  updateProduct(id, title, description, price, thumbnail, code, stock){
    this.loadDB()
    const productIndex = this.products.findIndex(product => product.id === id)
    if(productIndex !== -1){
      this.products[productIndex] = {
        id: id,
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock
      }
      fs.writeFileSync(this.path, JSON.stringify(this.products))
      return `Product ${id} was updated`
    }else{
      return `Failed to Update Product, Product ${id} was not found`
    }
  }
  deleteProduct(id){
    this.loadDB()
    const productIndex = this.products.findIndex(product => product.id === id)
    if(productIndex !== -1){
      this.products.splice(productIndex,productIndex+1)
      fs.writeFileSync(this.path, JSON.stringify(this.products))
      return `Product ${id} DELETED`
    }else{
      return `Failed to Delete Product, Product ${id} was not found`
    }
  }
}

/*
// Tests
const román = new ProductManager("./products.json");

//              <---Busca Productos---> //producto de prueba debería estar en products.json
román.loadDB()
console.log(román.getProducts());
//              <---Agrega producto prueba 2 y busca--->
console.log(román.addProduct("producto prueba2","Este es un producto prueba", 200, "Sin imagen","abc124",25));
console.log(román.getProducts());
//              <---Agrega producto prueba 3 y busca--->
console.log(román.addProduct("producto prueba3","Este es un producto prueba", 200, "Sin imagen","abc125",25));
console.log(román.getProducts());
//              <---Busca producto prueba por Id---> //producto de prueba debería estar en products.json
console.log(román.getProductById("1675133404619"));
//              <---Busca producto que no existe--->
console.log(román.getProductById(1));
//              <---Actualiza producto de prueba---> //producto de prueba debería estar en products.json
console.log(román.updateProduct("1675133404619", "producto prueba actualizado","Este es un producto prueba actualizado", 200, "Sin imagen","abc123",250))
//              <---Elimina producto de prueba y busca---> //producto de prueba debería estar en products.json si no fue borrado
console.log(román.deleteProduct("1675133404619"))
console.log(román.getProducts());

*/