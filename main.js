let createNewCard = document.getElementById("create");
let unCreateNewCard = document.getElementById("un_create");
let title_do = document.getElementById("title_do");
let post_do = document.getElementById("post_do");
let card = document.getElementById("card");
let add_card = document.getElementById("add_card");

// get posts from the fake api by Ajax
function getPosts() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let data = JSON.parse(xhr.response);
            let card = "";
            data.forEach((post) => {
                card += `
                        <div class="todo_card">
                            <h2 class="card_title">${post.title}</h2>
                            <p class="card_post">${post.body}</p>
                        </div>
                        
                        `;
            });
            document.getElementById("card").innerHTML = card;
        } else if (xhr.readyState === 4 && xhr.status !== 200) {
            throw Error("this line include an error");
        }
    };

    xhr.open("GET", "https://jsonplaceholder.typicode.com/posts");
    xhr.send();
}

getPosts();

add_card.onclick = () => {
    createNewCard.style.display = "inline-block";
    unCreateNewCard.style.display = "inline-block";
    add_card.style.display = "none";
};

unCreateNewCard.onclick = () => {
    title_do.value = "";
    post_do.value = "";
};

// creat new card when the user click on the create button
createNewCard.onclick = () => {
    createNewToDo();
};

// function to create new card on the fake api by fetch (post method)
function createNewToDo() {
    const myNewCard = {
        title: title_do.value,
        body: post_do.value,
    };

    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(myNewCard),
    })
        .then((res) => res.json())
        .catch((error) => {
            console.log("this line includes error", error);
        });

    let newCard = `<div class="todo_card">
                        <div class="card_title">${myNewCard.title}</div>
                        <div class="card_post">${myNewCard.body}</div>
                    </div>`;

    //add card to Daily List 
    card.innerHTML += newCard;

};
