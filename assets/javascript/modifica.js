
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');


async function populateForm() {
    try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTczNzg5YmZlMDMxZTAwMTliYTFjNzkiLCJpYXQiOjE3MDIxMjIzNzksImV4cCI6MTcwMzMzMTk3OX0.uokuMAx6YhCi8aZnzunCiwmlkDDD2keYesbygMBERUU", // 
            },
        });

        if (response.ok) {
            const prodotto = await response.json();

            document.getElementById('productName').value = prodotto.name;
            document.getElementById('productDescription').value = prodotto.description;
            document.getElementById('productBrand').value = prodotto.brand;
            document.getElementById('productImageUrl').value = prodotto.imageUrl;
            document.getElementById('productPrice').value = prodotto.price;

            
            document.getElementById('updateProductForm').setAttribute('data-id', productId);
        } else {
            console.error(`Errore durante il recupero del prodotto con ID ${productId}.`, response.status, response.statusText);
        }
    } catch (error) {
        console.error("Errore nel popolamento del form:", error);
    }
}


window.onload = populateForm;

function updateProduct() {
    
    const updatedProductName = document.getElementById('productName').value;
    const updatedProductDescription = document.getElementById('productDescription').value;
    const updatedProductBrand = document.getElementById('productBrand').value;
    const updatedProductImageUrl = document.getElementById('productImageUrl').value;
    const updatedProductPrice = document.getElementById('productPrice').value;

    
    const productId = document.getElementById('updateProductForm').getAttribute('data-id');

  
    const updatedProduct = {
        name: updatedProductName,
        description: updatedProductDescription,
        brand: updatedProductBrand,
        imageUrl: updatedProductImageUrl,
        price: updatedProductPrice,
    };

    
    const authToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTczNzg5YmZlMDMxZTAwMTliYTFjNzkiLCJpYXQiOjE3MDIxMjIzNzksImV4cCI6MTcwMzMzMTk3OX0.uokuMAx6YhCi8aZnzunCiwmlkDDD2keYesbygMBERUU';

    fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
        method: 'PUT',  
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authToken,
        },
        body: JSON.stringify(updatedProduct),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Errore nell'aggiornamento del prodotto: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Prodotto aggiornato con successo:", data);
        
    })
    .catch(error => {
        console.error(error.message);
    });
}
