const card = document.querySelectorAll('.card')
const icones = document.querySelectorAll('.card i')
const modal = document.querySelector('.modal');
const titleModal = document.querySelector('.modal h3');
const textModal = document.querySelector('.modal span');
const buttonModal = document.querySelector('.modal button');
const mensagem = document.querySelector('.msg');
const formContato = document.querySelector('.form-contato');
const nome = document.querySelector('#nome');
const telefone = document.querySelector('#whatsapp');
const msgForm = document.querySelector('#mensagem');
const countLetter = document.querySelector('.count-letter')



for (let cards of card) {
    cards.addEventListener('mouseenter', () => {
        cards.style.backgroundColor = 'var(--cor-hover)';
        cards.style.cursor = 'pointer';
    })
}


for (let cards of card) {
    cards.addEventListener('mouseleave', () => {
        cards.style.backgroundColor = 'var(--cor-principal)';
    });
};


const modalContainer = [{ title: "Urgência 24H", conteudo: "Atendemos todos os dias, 24 horas por dia. Em casos de urgência e emergência, garantimos assistência em tempo integral para o seu animal de estimação.​" },

{ title: "Atendimento Clínico", conteudo: "Sentiu ou identificou algo fora do comum? Traga seu animal para consultas clínicas." },

{ title: "Vacinação", conteudo: "Consulte regularmente a carteirinha de vacinação do seu pet. Nossa equipe esta preparada para lhe orientar no melhor protocolo para proteger a saúde do seu animal contras as principais doenças infecto contagiosas." },

{ title: "Cirurgias", conteudo: "Contamos com um centro cirúrgico totalmente equipado para atendimento de animais que necessitam de intervenção cirúrgica. Prezamos pela qualidade técnica e pela segurança dos procedimentos." }
]

// MODAL CARD 1
card[0].addEventListener('click', () => {
    modal.style.display = 'flex'
    titleModal.textContent = modalContainer[0].title;
    textModal.textContent = modalContainer[0].conteudo
})


// MODAL CARD 2
card[1].addEventListener('click', () => {
    modal.style.display = 'flex'
    titleModal.textContent = modalContainer[1].title;
    textModal.textContent = modalContainer[1].conteudo
});

// MODAL CARD 3
card[2].addEventListener('click', () => {
    modal.style.display = 'flex'
    titleModal.textContent = modalContainer[2].title;
    textModal.textContent = modalContainer[2].conteudo
});

// MODAL CARD 4
card[3].addEventListener('click', () => {
    modal.style.display = 'flex'
    titleModal.textContent = modalContainer[3].title;
    textModal.textContent = modalContainer[3].conteudo
});

// FECHA MODAL
buttonModal.addEventListener('click', () => {
    modal.style.display = 'none'
    titleModal.textContent = '';
    textModal.textContent = '';
});

modal.addEventListener('click', () => {
    modal.style.display = 'none'
    titleModal.textContent = '';
    textModal.textContent = '';
})

// MANIPULANDO FORM

msgForm.addEventListener('keyup', () => {

    countLetter.textContent = msgForm.value.length

    if(msgForm.value.length == 0){
        countLetter.textContent = '0'
    }

})



// MENSAGENS FORM

function fechaMensagemErr() {
    mensagem.style.display = 'none'
    formContato.style.display = 'flex';
    
}


function fechaMensagemSuccess() {
    mensagem.style.display = 'none'
    formContato.style.display = 'flex';
    nome.value = '';
    telefone.value = '';
    msgForm.value = '';
    countLetter.textContent = 0
}


// ENVIAR PARA O BD


function enviarBD() {

    let dados = {
        nome: nome.value,
        telefone: telefone.value,
        mensagem: msgForm.value
    }

    if (nome.value == null || typeof nome.value == undefined || nome.value == '') {
        mensagem.style.display = 'block';
        return mensagem.innerHTML = 'Nome não pode ser vazio! <button onclick="fechaMensagemErr()">x</button>';
    }

    if (telefone.value.length > 11 || telefone.value.length < 10 || telefone.value == null || typeof telefone.value == undefined || telefone.value == '') {
        mensagem.style.display = 'block'
        return mensagem.innerHTML = 'Telefone inválido! <button onclick="fechaMensagemErr()">x</button>';
    }

    if (msgForm.value == null || typeof msgForm.value == undefined || msgForm.value == '') {
        mensagem.style.display = 'block'
        return mensagem.innerHTML = 'A mensagem não pode ser vazia <button onclick="fechaMensagemErr()">x</button>';
    }

    if (msgForm.value.length < 20) {
        mensagem.style.display = 'block'
        return mensagem.innerHTML = 'A mensagem é muito curta!  <button onclick="fechaMensagemErr()">x</button>';
    }

    fetch('http://cardeal-pet-shop.herokuapp.com/contato', {
        method: 'POST',
        body: JSON.stringify(dados),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    }).then(success => {

        if (success.status == 200) {
            formContato.style.display = 'none'
            mensagem.style.display = 'block'
            return mensagem.innerHTML = `Mensagem enviada com sucesso! <br/> Em breve entraremos em contato com você. <button onclick="fechaMensagemSuccess()">x</button>`
        } 

        mensagem.style.display = 'block'
        mensagem.innerHTML = `Houve um erro ao validar as informações do formulário.<button onclick="fechaMensagemErr()">x</button>`



    }).catch(err => {
        console.log('Houve um erro: ' + err)
    })
}



