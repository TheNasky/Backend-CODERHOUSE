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
    this.loadDB()
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
const rom??n = new ProductManager("./products.json");

//              <---Busca Productos---> //producto de prueba deber??a estar en products.json
console.log(rom??n.getProducts());
//              <---Agrega producto prueba 2 y busca--->
console.log(rom??n.addProduct("producto prueba2","Este es un producto prueba", 200, "Sin imagen","abc124",25));
console.log(rom??n.getProducts());
//              <---Agrega producto prueba 3 y busca--->
console.log(rom??n.addProduct("producto prueba3","Este es un producto prueba", 200, "Sin imagen","abc125",25));
console.log(rom??n.getProducts());
//              <---Busca producto prueba por Id---> //producto de prueba deber??a estar en products.json
console.log(rom??n.getProductById("1675133404619"));
//              <---Busca producto que no existe--->
console.log(rom??n.getProductById(1));
//              <---Actualiza producto de prueba---> //producto de prueba deber??a estar en products.json
console.log(rom??n.updateProduct("1675133404619", "producto prueba actualizado","Este es un producto prueba actualizado", 200, "Sin imagen","abc123",250))
//              <---Elimina producto de prueba y busca---> //producto de prueba deber??a estar en products.json si no fue borrado
console.log(rom??n.deleteProduct("1675133404619"))
console.log(rom??n.getProducts());

*/