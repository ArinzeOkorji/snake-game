let deferredEvent;

const saveBeforeInstallPromptEvent = (event) => {
    console.log(event)
    event.preventDefault();
    deferredEvent = event;
}

window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);


let installBtn = document.querySelector("#installBtn");

installBtn.addEventListener('click', () => {

    deferredEvent.prompt();
    installBtn.style.display = 'none';
    deferredEvent.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
        } else {
            installBtn.style.display = 'unset';
            console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
    })
})


const logAppInstalled = (event) => {
    console.log(event);
    console.log('Snake App was installed.', event);
}

window.addEventListener('appinstalled', logAppInstalled);