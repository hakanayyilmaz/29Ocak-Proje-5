const url = "https://api.unsplash.com/search/photos?page=1";
const apiKey = "EzSdq5B5ZYUdgfwLOBEQalVe1JBncgh5ZwdHf_Iz5g4";

const form = document.querySelector("form");
const searchInput = document.querySelector("#searchInput");
const row = document.querySelector(".row");
const toggleBtn = document.querySelector("#toggleBtn");
const body = document.querySelector("body");
const clearBtn = document.querySelector("#clearBtn");
const select = document.querySelector("select");
const bilgiMesaj = document.querySelector("#bilgiMesaj")

// ! Gece Modu Yapımı

toggleBtn.addEventListener("click", function(){
    if(body.classList.contains("dark-mode")){
        body.classList.remove("dark-mode");
        toggleBtn.innerHTML = "Dark-Mode"
    }else{
        body.classList.add("dark-mode");
        toggleBtn.innerHTML = "Light-Mode"
    }
})


// ! Form submit olduğunda istek göndermek için
let resimler = [];

form.addEventListener("submit", function(e){
    e.preventDefault();
    // console.log("Deneme")
    row.innerHTML = "";

    let searchTerm = searchInput.value;
    let request = `${url}&query=${searchTerm}&client_id=${apiKey}`

    fetch(request)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data.results)

        resimler = data.results;
        
        önYüzeEkle(resimler)
    })
})

// ! İstekten gelen verileri sayfaya bastırmak için
const önYüzeEkle = (veriler) => {
    veriler.forEach(function(veri){
        // console.log(veri)
        const col = document.createElement("div");
        col.classList = "col-4 mb-3 border border-1 p-2";

        const img = document.createElement("img");
        img.style.width = "100%"
        img.style.height = "200px"
        img.src = veri.urls.small;
        img.style.marginBottom = "20px"

        const deleteBtn = document.createElement("button");
        deleteBtn.classList = "btn btn-warning float-end";
        deleteBtn.innerHTML = "Sil";
        deleteBtn.id = "delete";

        const like = document.createElement("span");
        like.innerHTML = veri.likes;

        row.append(col);
        col.append(img);
        col.append(deleteBtn)
        col.append(like)

        searchInput.value = ""

    })
}

// ! Artan - Azalan Beğeni sayısına göre filtreleme yapmak için

select.addEventListener("change", function(){
    let selectedOption = select.value;
    if(selectedOption === "Artan"){
        resimler.sort((a,b)=> a.likes - b.likes)
    }else if(selectedOption === "Azalan"){
        resimler.sort((a,b)=> b.likes - a.likes)
    }
    row.innerHTML = "";
    önYüzeEkle(resimler);
})

// ! Sil butonuna bastığım zaman ilgili elemanı sildirmek için
row.addEventListener("click", function(e){
    if(e.target.id.includes("delete")){
        // console.log(e.target.parentElement)
        let column = e.target.parentElement;
        column.style.display = "none";


        // ! Bilgi Mesajı Bölümü için
        bilgiMesaj.innerHTML = "Fotoğraf silindi.."
        bilgiMesaj.classList.add("text-success", "text-center", "fw-bold", "mt-4", "bg-warning", "p-3");
        setTimeout(function(){
            bilgiMesaj.innerHTML = "";
            bilgiMesaj.classList.remove("text-success", "text-center", "fw-bold", "mt-4", "bg-warning", "p-3");
        },2000)
    }
})

// ! Temizle butonuna bastığım zaman içeriği temizlemek için
clearBtn.addEventListener("click",function(){
    row.innerHTML = "";
    bilgiMesaj.innerHTML = "Tüm içerik temizlendi.."
    bilgiMesaj.classList.add("text-white", "text-center", "fw-bold", "mt-4", "bg-primary", "p-3");
    setTimeout(function () {
        bilgiMesaj.innerHTML = "";
        bilgiMesaj.classList.remove("text-success", "text-center", "fw-bold", "mt-4", "bg-warning", "p-3");
    }, 2000)
})