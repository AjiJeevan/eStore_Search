
fetch('https://fakestoreapi.com/products')
.then(res=>res.json())
.then(json=>{
    let productsEl = ""

    for (let product of json){
        productsEl += `
        <div class="card col-12 col-md-6 col-lg-4 col-xl-3 card-style">
            <img src="${product.image}" class="card-img mt-2"> 
            <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                <p class="text-success">$${product.price}</p>
                <p class="card-text">${product.description}</p>
                <button type="button" class="btn btn-warning">View Product</button>
                <a href="#" class="btn btn-primary">Add to Cart</a>
            </div>
        </div>`
    }

    let productList = document.getElementById("productDisplay")
    productList.innerHTML = productsEl
})


      
const searchValue = document.getElementById("searchForm")
searchValue.addEventListener("submit", (event)=>{
    event.preventDefault()
    let product = document.getElementById("searchProduct").value
    fetch('https://fakestoreapi.com/products')
    .then(res=>res.json())
    .then(productList =>{

        let searchProductsEl = ""
        let searchProductsList = document.getElementById("productDisplay")
        searchProductsList.innerHTML = searchProductsEl

        for (let eachProduct of productList){
            let productName = eachProduct.title
            // let position = productName.search(product)


            var rgxp = new RegExp(product, "gi")
            let search = productName.match(rgxp)
            
            if(Array.isArray(search)) {
                console.log(productName)
                searchProductsEl += `
                        <div class="card col-12 col-md-6 col-lg-4 col-xl-3 card-style">
                            <img src="${eachProduct.image}" class="card-img mt-2">
                            <div class="card-body">
                                <h5 class="card-title">${eachProduct.title}</h5>
                                <p class="text-success">$${eachProduct.price}</p>
                                <p class="card-text">${eachProduct.description}</p>
                                <button type="button" class="btn btn-warning">View Product</button>
                                <a href="#" class="btn btn-primary">Add to Cart</a>  
                            </div>
                        </div>`

            }
        }
        
        if(searchProductsEl == ""){
            searchProductsEl += `
                        <div class="card col-lg-6 card-style not-found">
                        <div class="card-body">
                                <h1 class="card-title text-center text-danger">Result Not Found for "${product}"</h1>
                        </div>
                        <img src="https://media.istockphoto.com/id/1038232966/vector/upset-magnifying-glass-vector-illustration.jpg?s=612x612&w=0&k=20&c=cHpDD-xX8wlruAOi-RsTNpaZKtBYtAjP32GpoRGKEmM=" class="card-img-top">
                        </div>`
                        searchProductsList.innerHTML = searchProductsEl
        }
        else{
            searchProductsList.innerHTML = `<h1 class="card-title text-center text-danger" >Results for "${product}"</h1> <br> ` + searchProductsEl
        }
        document.getElementById("searchProduct").value = ""
        
    })
})



