let carrinho = [];
let favoritos = [];


window.onload = function(){

    document.getElementById("areaCadastro").style.display="none";

    mostrarProdutos();

};

let produtosSalvos = localStorage.getItem("produtos");

if(produtosSalvos){
    produtos = JSON.parse(produtosSalvos);
}


const areaProdutos = document.getElementById("produtos");


// MOSTRAR PRODUTOS NA TELA

function mostrarProdutos(lista = produtos){

    areaProdutos.innerHTML="";

    lista
    .filter(produto => produto.disponivel)
    .forEach(produto=>{

        let card=document.createElement("div");

        card.className="card";

        card.innerHTML=`

        <img src="imagens/${produto.imagem}">

        <h3>${produto.nome}</h3>

        <p>
        R$ ${produto.preco.toFixed(2)}
        </p>

        <small>
        ${produto.categoria} |
        Tamanho ${produto.tamanho}
        </small>

        <br>

        <button onclick="adicionarCarrinho(${produto.id})">

        🛒 Comprar

        </button>

        `;

        areaProdutos.appendChild(card);

    });

}



// FILTRO

function filtrarProdutos(){


    let busca = document
    .getElementById("busca")
    .value
    .toLowerCase();


    let categoria = document
    .getElementById("categoria")
    .value;


    let tamanho = document
    .getElementById("tamanho")
    .value;



    let resultado = produtos.filter(produto => {


        return (

        produto.nome.toLowerCase().includes(busca)

        &&

        (categoria === "" || produto.categoria === categoria)

        &&

        (tamanho === "" || produto.tamanho === tamanho)

        );


    });



    mostrarProdutos(resultado);

}




// CARRINHO

function adicionarCarrinho(id){


    let produto = produtos.find(p => p.id === id);


    carrinho.push(produto);


    document.getElementById("contador").innerHTML = carrinho.length;


    alert("Peça adicionada ao carrinho 🛒");


}



function abrirCarrinho(){


    document.getElementById("modalCarrinho").style.display="flex";


    let lista = document.getElementById("listaCarrinho");


    lista.innerHTML="";


    carrinho.forEach(item=>{


        lista.innerHTML += `

        <div class="item-carrinho">

        ${item.nome}
        <br>
        R$ ${item.preco.toFixed(2)}

        </div>

        `;


    });


}




function fecharModal(){

    document.getElementById("modalCarrinho").style.display="none";

}





// FAVORITOS


function favoritar(id){


    let produto = produtos.find(p=>p.id===id);


    favoritos.push(produto);


    alert("Adicionado aos favoritos ❤️");


}





function abrirFavoritos(){


    if(favoritos.length===0){

        alert("Nenhuma peça favorita ainda");

        return;

    }


    alert(

        favoritos.map(p=>p.nome).join("\n")

    );


}





// FINALIZAR WHATSAPP


function finalizarCompra(){


    let mensagem =
    "Olá! Tenho interesse nestas peças:%0A";


    carrinho.forEach(item=>{

        mensagem += 
        "- "+item.nome+
        " R$ "+item.preco+
        "%0A";

    });



    let numero="5544999999999";


    window.open(

    "https://wa.me/"+numero+
    "?text="+mensagem,

    "_blank"

    );


}




// CADASTRO DE NOVA PEÇA


function cadastrarProduto(){


    let novoProduto = {


        id: produtos.length + 1,


        nome:
        document.getElementById("nomeProduto").value,


        imagem:
        document.getElementById("imagemProduto").value,


        preco:
        Number(
        document.getElementById("precoProduto").value
        ),


        categoria:
        document.getElementById("categoriaProduto").value,


        tamanho:
        document.getElementById("tamanhoProduto").value,
        disponivel:true


    };



    produtos.push(novoProduto);


    localStorage.setItem(
"produtos",
JSON.stringify(produtos)
);


    mostrarProdutos();


    alert("Nova peça adicionada!");

}


function marcarVendida(id){

let produto = produtos.find(p=>p.id===id);

produto.disponivel=false;


localStorage.setItem(
"produtos",
JSON.stringify(produtos)
);


mostrarProdutos();


alert(
produto.nome+" foi marcada como vendida!"
);


}
function abrirAdmin(){

document.getElementById("adminModal")
.style.display="flex";

}



function fecharAdmin(){

document.getElementById("adminModal")
.style.display="none";

}




function entrarAdmin(){


let senha =
document.getElementById("senhaAdmin").value;



if(senha==="1234"){


alert("Bem-vinda, Jeane!");
document.getElementById("areaCadastro").style.display="block";


mostrarControleAdmin();


fecharAdmin();


}

else{


alert("Senha incorreta");


}


}




function mostrarControleAdmin(){


let area =
document.getElementById("controleAdmin");


area.innerHTML="";



produtos.forEach(produto=>{


area.innerHTML += `


<div class="card">


<img src="imagens/${produto.imagem}">


<h3>${produto.nome}</h3>


<p>
R$ ${produto.preco}
</p>


<p>
Status:
${produto.disponivel ? "Disponível" : "Vendida"}
</p>



<button onclick="alterarStatus(${produto.id})">

Alterar status

</button>


</div>


`;


});


}





function alterarStatus(id){


let produto =
produtos.find(p=>p.id===id);



produto.disponivel =
!produto.disponivel;



localStorage.setItem(

"produtos",

JSON.stringify(produtos)
);

mostrarControleAdmin();

alert("Status alterado!");


}
