const refs = {
    openModalBtn: document.querySelector('[data-open-modal]'),
    closeModalBtn: document.querySelector('[data-close-modal]'),
    backdrop: document.querySelector('[data-backdrop]')
}

refs.openModalBtn.addEventListener("click", toggleModal);
refs.closeModalBtn.addEventListener('click', toggleModal);
refs.backdrop.addEventListener('click', logBackdropClick);


function toggleModal (){
    refs.backdrop.classList.toggle('is-hidden'); 
    document.body.classList.toggle('no-scroll');
}

function logBackdropClick(event) {
    if (event.target !== event.currentTarget) return;

    console.log('click in backdrop');
    toggleModal();
}

