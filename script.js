function entrarNaSala(){
    const promessa = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", {name: nome});
    promessa.catch( error );
};

function error(){
    nome = prompt ('Este nome já está em uso. Por favor, digite outro.');
    entrarNaSala();
}

function mantemOn(){
    const promessa = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", {name: nome});
}

function pegaMensagens(){
    const promessa = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promessa.then( renderizaMensagens );
}

function renderizaMensagens(mensagens){
    mensagens = mensagens.data;
    const ul = document.querySelector(".caixaMsg");

    ul.innerHTML = "";

    for(let i = 0; i < mensagens.length; i++){

       if(mensagens[i].type === "status"){ 
        ul.innerHTML = ul.innerHTML + `
            <li>
                <div class="salaTodos">
                <span class="tempo">&nbsp(${mensagens[i].time})&nbsp</span>
                <span class="negrito">&nbsp${mensagens[i].from}&nbsp</span>
                ${mensagens[i].text}
                </div>
            </li>
        `
    } else if (mensagens[i].type === "message"){
        ul.innerHTML = ul.innerHTML + `
            <li>
                <div class="msgTodos">
                <span class="tempo">&nbsp(${mensagens[i].time})&nbsp</span>
                <span class="negrito">&nbsp${mensagens[i].from}&nbsp</span>
                para
                <span class="negrito">&nbsp${mensagens[i].to}</span>:
                ${mensagens[i].text}
                </div>
            </li>
        `
    } else if (mensagens[i].type === "private_message" && (mensagens[i].to === nome.name || mensagens[i].from === nome.name)){
        ul.innerHTML = ul.innerHTML + `
            <div>
            <li>
                <div class="msgPvt">
                <span class="tempo">&nbsp(${mensagens[i].time})&nbsp</span>
                <span class="negrito">&nbsp${mensagens[i].from}&nbsp</span>
                para
                <span class="negrito">&nbsp${mensagens[i].to}</span>:
                ${mensagens[i].text}
                </div>
            </li>
            </div>`
        }   
}
}

function enviaMsg(){
    const msg = document.querySelector(".msgs").value;
    const objetoMsg = {
        from: nome,
        to: "Todos",
        text: msg,
        type: "message"
    }

    const promessa = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", objetoMsg);

    promessa.then(()=>{pegaMensagens()});
    promessa.catch(()=>{window.location.reload()});

    document.querySelector(".msgs").value = "";
}

let nome = prompt("Qual seu nome de usuário?");

entrarNaSala();

setInterval(mantemOn, 5000);
setInterval(pegaMensagens, 3000);
